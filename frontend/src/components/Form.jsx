import { useState } from 'react';

export const Form = ({ setMessages, messages }) => {
  const [{ stream, message }, setState] = useState({
    stream: true,
    message: '',
  });

  const handleChange = (e) => {
    const name = e.target.name;
    const value =
      e.target.type === 'checkbox' ? e.target.checked : e.target.value;
    setState((prev) => {
      return { ...prev, [name]: value };
    });
  };

  const onSubmit = async (e) => {
    e.preventDefault();

    const newMessage = {
      id: crypto.randomUUID(),
      role: 'user',
      content: message,
    };

    setMessages((prev) => [...prev, newMessage]);

    const response = await fetch(
      'http://localhost:5050/api/v1/chat/completions',
      {
        method: 'POST',
        headers: {
          provider: 'open-ai',
          mode: 'production',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          model: 'gpt-4o',
          messages: [...messages, newMessage],
          stream,
        }),
      }
    );

    setState({
      stream,
      message: '',
    });

    if (stream) {
      const reader = response.body.getReader();
      const decoder = new TextDecoder('utf-8');

      let result;
      const messageId = crypto.randomUUID();
      while (!(result = await reader.read()).done) {
        const chunk = decoder.decode(result.value, { stream: true });
        const lines = chunk.split('\n'); // Fixed the split delimiter to correct newline character

        lines.forEach((line) => {
          if (line.startsWith('data:')) {
            const jsonStr = line.replace('data:', '').trim();
            try {
              const data = JSON.parse(jsonStr);
              const content = data.choices[0]?.delta?.content;
              if (content) {
                setMessages((prev) => {
                  const found = prev.find((m) => m.id === messageId);

                  if (found) {
                    return prev.map((m) =>
                      m.id === messageId
                        ? { ...m, content: `${m.content}${content}` }
                        : m
                    );
                  }

                  return [
                    ...prev,
                    { role: 'assistant', content, id: messageId },
                  ];
                });
              }
            } catch (error) {
              console.error('Failed to parse JSON:', error);
            }
          }
        });
      }
    } else {
      // no stream
      const { message: newMessage } = await response.json(); // Destructured 'message' to 'newMessage'

      setMessages((prev) => [
        ...prev,
        { ...newMessage, id: crypto.randomUUID() },
      ]);
    }
  };

  return (
    <form
      className="flex flex-col w-full p-4 bg-red-300 rounded-lg shadow-md"
      onSubmit={onSubmit}
    >
      <label className="block mb-4">
        <span className="text-red-700">Stream</span>
        <input
          type="checkbox"
          name="stream"
          onChange={handleChange}
          checked={stream}
          className="ml-2"
        />
      </label>
      <textarea
        name="message"
        placeholder="Type your message here"
        onChange={handleChange}
        value={message}
        className="block w-full p-2 mb-4 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
      ></textarea>
      <button
        type="submit"
        className="w-full px-4 py-2 bg-blue-600 text-white rounded-md shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        Send
      </button>
    </form>
  );
};
