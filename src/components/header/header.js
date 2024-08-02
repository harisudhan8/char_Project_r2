// header.js
import React from 'react';
import './header.css';

const Header = ({ currentUser, onSearch, onLogout }) => {
  const [searchQuery, setSearchQuery] = React.useState('');

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
    onSearch(event.target.value);
  };

  const handleLogout = () => {
    onLogout();
  };

  return (
    <header className="header">
      <div className="header-left">
        <button className="menu-button">
          <i className="fas fa-bars"></i>
        </button>
        <img src={currentUser.profilePic} alt={currentUser.name} className="profile-pic" />
        <span className="username">{currentUser.name}</span>
      </div>
      <div className="header-center">
        <input
          type="search"
          placeholder="Search"
          className="search-input"
          value={searchQuery}
          onChange={handleSearchChange}
        />
      </div>
      <div className="header-right">
        <button className="new-message-btn">New Message</button>
        <span className="notification-badge">3</span>
        
        <button className="logout-btn" onClick={handleLogout}>
          Logout
        </button>
      </div>
    </header>
  );
};

export default Header;
