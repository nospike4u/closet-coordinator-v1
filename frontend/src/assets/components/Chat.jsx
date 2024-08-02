import { Message } from './Message';

export const Chat = ({ messages }) => {
  return (
    <div className="flex flex-col space-y-4 p-4 bg-gray-100 rounded-lg shadow-md">
      {messages
        ?.filter((message) => message.role !== 'system')
        .map((message) => {
          return <Message key={message.id} message={message} />;
        })}
    </div>
  );
};

// import { Message } from './Message';

// export const Chat = ({ messages }) => {
//   return (
//     <div>
//       {messages
//         ?.filter((message) => message.role !== 'system')
//         .map((message) => {
//           return <Message key={message.id} message={message} />;
//         })}
//     </div>
//   );
// };
