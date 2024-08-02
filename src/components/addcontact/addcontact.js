import React, { useState } from 'react';
import './addcontact.css';

const AddContact = ({ onAddContact }) => {
  const [name, setName] = useState('');
  const [img, setImg] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (name && img) {
      onAddContact({ id: Date.now(), name, img }); // Example of generating a unique ID
      setName('');
      setImg('');
    }
  };

  return (
    <div className="add-contact-form">
      <h3>Add Contact</h3>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Image URL"
          value={img}
          onChange={(e) => setImg(e.target.value)}
          required
        />
        <button type="submit">Add</button>
      </form>
    </div>
  );
};

export default AddContact;
