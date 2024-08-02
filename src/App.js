import React, { useState, useEffect } from 'react';
import Header from './components/header/header';
import ContactList from './components/contactlist/contactlist';
import Messages from './components/messages/messages';
import AddContact from './components/addcontact/addcontact';
import Signup from './components/Signup/signup';

import './App.css';

const App = () => {
  const [currentUser, setCurrentUser] = useState(null);
  const [contacts, setContacts] = useState([]);
  const [filteredContacts, setFilteredContacts] = useState([]);
  const [selectedContact, setSelectedContact] = useState(null);
  const [showAddContact, setShowAddContact] = useState(false);
  const [messages, setMessages] = useState({});

  useEffect(() => {
    if (currentUser) {
      fetch('https://jsonplaceholder.typicode.com/users')
        .then(response => response.json())
        .then(data => {
          const formattedContacts = data.map((contact, index) => ({
            id: index + 1,
            name: contact.name,
            img: 'https://via.placeholder.com/50',
            pinned: false,
          }));
          setContacts(formattedContacts);
          setFilteredContacts(formattedContacts);
        })
        .catch(error => console.error('Error fetching contacts:', error));
    }
  }, [currentUser]);

  const handleAddContact = (contact) => {
    setContacts([...contacts, contact]);
    setFilteredContacts([...contacts, contact]);
    setShowAddContact(false);
  };

  const toggleAddContact = () => {
    setShowAddContact(!showAddContact);
  };

  const handleSendMessage = (message) => {
    if (selectedContact) {
      const contactId = selectedContact.id;
      setMessages(prevMessages => ({
        ...prevMessages,
        [contactId]: [...(prevMessages[contactId] || []), message]
      }));
    }
  };

  const handlePinContact = (contactId) => {
    setContacts(prevContacts => prevContacts.map(contact => {
      if (contact.id === contactId) {
        return { ...contact, pinned: !contact.pinned };
      }
      return contact;
    }));
  };

  const handleDeleteContact = (contactId) => {
    setContacts(prevContacts => prevContacts.filter(contact => contact.id !== contactId));
    setFilteredContacts(prevContacts => prevContacts.filter(contact => contact.id !== contactId));
    if (selectedContact && selectedContact.id === contactId) {
      setSelectedContact(null);
    }
  };

  const handleSearch = (query) => {
    const lowercasedQuery = query.toLowerCase();
    setFilteredContacts(contacts.filter(contact => 
      contact.name.toLowerCase().includes(lowercasedQuery)
    ));
  };

  const handleSignup = (user) => {
    setCurrentUser(user);
  };

  return (
    <>
      {currentUser ? (
        <div>
          <Header currentUser={currentUser} onSearch={handleSearch} />
          <div className="app-container">
            <div className="contact-list-container">
              <ContactList 
                contacts={filteredContacts} 
                onSelectContact={setSelectedContact} 
                onAddContactClick={toggleAddContact} 
                onPinContact={handlePinContact}
                onDeleteContact={handleDeleteContact}
              />
              {showAddContact && <AddContact onAddContact={handleAddContact} />}
            </div>
            <div className="messages-container">
            {selectedContact ? (
                <Messages 
                  contact={selectedContact} 
                  messages={messages[selectedContact.id] || []} 
                  onSendMessage={handleSendMessage} 
                />
              ) : (
                <div className="no-chat">Select a contact to start chatting</div>
              )}
            </div>
          </div>
        </div>
      ) : (
        <Signup onSignup={handleSignup} />
      )}
    </>
  );
};

export default App;