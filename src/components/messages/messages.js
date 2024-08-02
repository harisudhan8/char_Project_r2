import React, { useState } from 'react';
import './messages.css';
import Camera from '../camera/camera';
import cameraIcon from './zoom.png'; // Adjust the path to your PNG image
import background1 from './background1.jpg'; // Adjust the path as needed
import background2 from './background2.jpg'; // Adjust the path as needed
import background3 from './background3.jpg'; // Adjust the path as needed
import background4 from './background4.jpg'; // Adjust the path as needed

const backgroundImages = [
  background1,
  background2,
  background3,
  background4
];

const Messages = ({ contact, messages, onSendMessage }) => {
  const [message, setMessage] = useState('');
  const [showCamera, setShowCamera] = useState(false);
  const [currentBackground, setCurrentBackground] = useState(background1);

  const handleSend = () => {
    if (message.trim()) {
      const newMessage = {
        text: message,
        timestamp: new Date().toLocaleTimeString(),
        sender: 'me', // Assume 'me' for the current user; adjust as needed
      };
      onSendMessage(newMessage);
      setMessage('');
    }
  };

  const handleCapture = (image) => {
    setShowCamera(false);
    const newMessage = {
      text: 'Image sent',
      image: image,
      timestamp: new Date().toLocaleTimeString(),
      sender: 'me',
    };
    onSendMessage(newMessage);
  };

  const changeBackground = () => {
    const nextIndex = (backgroundImages.indexOf(currentBackground) + 1) % backgroundImages.length;
    setCurrentBackground(backgroundImages[nextIndex]);
  };

  return (
    <div className="messages" style={{ backgroundImage: `url(${currentBackground})` }}>
      <div className="messages-header">
        <img src={contact.img} alt={contact.name} className="contact-img" />
        <div className="contact-name">{contact.name}</div>
        <img
          src={cameraIcon}
          alt="Camera Icon"
          className="camera-icon"
          onClick={() => setShowCamera(true)}
        />
        <button className="background-toggle" onClick={changeBackground}>
          Change Background
        </button>
      </div>
      <div className="message-list">
        {messages.map((msg, index) => (
          <div key={index} className={`message ${msg.sender}`}>
            {msg.sender === 'me' && (
              <div className="message-bubble me">
                {msg.image ? (
                  <img src={msg.image} alt="Captured" className="message-img" />
                ) : (
                  msg.text
                )}
                <span className="timestamp">{msg.timestamp}</span>
              </div>
            )}
            {msg.sender !== 'me' && (
              <div className="message-bubble other">
                <img src={contact.img} alt={contact.name} className="message-img" />
                {msg.text}
                <span className="timestamp">{msg.timestamp}</span>
              </div>
            )}
          </div>
        ))}
      </div>
      <div className="message-input">
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Type a message"
        />
        <button onClick={handleSend}>Send</button>
      </div>
      {showCamera && (
        <Camera
          onClose={() => setShowCamera(false)}
          onCapture={handleCapture}
        />
      )}
    </div>
  );
};

export default Messages;
