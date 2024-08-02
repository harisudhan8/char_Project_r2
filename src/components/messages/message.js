import React from 'react';
import './message.css'; // Adjust the path if needed

const Message = ({ message }) => {
  const formattedDate = new Date(message.timestamp).toLocaleTimeString();

  return (
    <div className={`message ${message.sender === 'me' ? 'sent' : 'received'}`}>
      <div className="message-content">
        {message.content}
      </div>
      <div className="message-time">
        {formattedDate}
      </div>
    </div>
  );
};

export default Message;
