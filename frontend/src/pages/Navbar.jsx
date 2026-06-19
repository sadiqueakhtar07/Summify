import React, { useContext, useState } from 'react';
import './Navbar.css';
import { MyContext } from '../contextAPI/contextAPI';
import { Link } from 'react-router-dom';

const Navbar = () => {
  const { setShowSignup } = useContext(MyContext);
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="navbar">
      <div className="logo">
        <span>Summify</span>
      </div>


      <div className="hamburger" onClick={() => setIsOpen(!isOpen)}>
        <div className={isOpen ? "bar active" : "bar"}></div>
        <div className={isOpen ? "bar active" : "bar"}></div>
        <div className={isOpen ? "bar active" : "bar"}></div>
        <div className={isOpen ? "bar active" : "bar"}></div>
      </div>


      <div className={isOpen ? "nav-menu open" : "nav-menu"}>
        <ul>
          <li><Link to="/" className="nav-link">Home</Link></li>
          <li><Link to="/features" className="nav-link">Features</Link></li>
          <li><Link to="/about" className="nav-link">About Us</Link></li>
          <li><Link to="/contact" className="nav-link">Contact Us</Link></li>
        </ul>

        <button onClick={() => setShowSignup(true)}>
          Log in <i className="fa-solid fa-arrow-right-to-bracket"></i>
        </button>
      </div>
    </div>
  );
};

export default Navbar;