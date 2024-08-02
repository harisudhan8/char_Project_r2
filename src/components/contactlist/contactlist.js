import React from 'react';
import './contactlist.css';

const ContactList = ({ contacts, onSelectContact, onAddContactClick, onPinContact, onDeleteContact }) => {
  return (
    <div className="contact-list-container">
      <button onClick={onAddContactClick}>Add Contact</button>
      <ul>
        {contacts.map(contact => (
          <li key={contact.id}>
            <img src={contact.img} alt={contact.name} />
            <span onClick={() => onSelectContact(contact)}>{contact.name}</span>
            <button className="pin-btn" onClick={() => onPinContact(contact.id)}>Pin</button>
            <button onClick={() => onDeleteContact(contact.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ContactList;
