import React from "react";

export const Message = ({ message }) => {
  return (
    <div className={message.role === "user" ? "right" : "left"}>
      <p>{message.content}</p>
    </div>
  );
};
