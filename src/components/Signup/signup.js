// signup.js
import React, { useState } from 'react';
import './signup.css';
import video1 from './video1.mp4';
import video2 from './video2.mp4';
import i1 from './welcom.png';
import i2 from './ani.png';
import i3 from './ani2.png';

const Signup = ({ onSignup }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [profilePic, setProfilePic] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    const profilePicUrl = profilePic ? URL.createObjectURL(profilePic) : null;
    onSignup({ name, email, password, profilePic: profilePicUrl });
  };

  return (
    <div className="signup-container">
      <video autoPlay loop muted className="background-video-1">
        <source src={video1} type="video/mp4" />
      </video>
      <video autoPlay loop muted className="background-video-2">
        <source src={video2} type="video/mp4" />
      </video>
      <div className="overlay"></div>
      <div className="signup-content">
        <div className="signup-left">
          <h2>Hi Welcome!</h2>
          <h1>Let's Get Started</h1>
          <p>Get started and make connections with your friends. No payments, just pure fun and engagement.</p>
          <img src={i1} alt="Welcome" />
        </div>
        <form onSubmit={handleSubmit} className="signup-form">
          <h2>Sign Up</h2>
          <label htmlFor="name" className="label">Your Name</label>
          <input type="text" id="name" value={name} onChange={(e) => setName(e.target.value)} required className="input-field" />

          <label htmlFor="email" className="label">Your Email</label>
          <input type="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)} required className="input-field" />

          <label htmlFor="password" className="label">Your Password</label>
          <input type="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)} required className="input-field" />

          <div className="file-input">
            <label htmlFor="profilePic" className="label">Profile Picture</label>
            <input type="file" id="profilePic" onChange={(e) => setProfilePic(e.target.files[0])} />
          </div>

          <button type="submit" className="submit-btn">Sign Up</button>
        </form>
      </div>
      <img src={i2} alt="Welcome" id="ani1" />
      <img src={i3} alt="Welcome" id="ani2" />
    </div>
  );
};

export default Signup;
