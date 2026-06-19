import React from "react";
import "./Footer.css";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        
        <div className="footer-brand">
          <h2>Summify<span>.</span></h2>
          <p>
            AI-powered book summarization platform helping you learn smarter,
            faster, and more efficiently.
          </p>
        </div>

        
        <div className="footer-links">
          <h4>Quick Links</h4>
          <ul>
            <li>Home</li>
            <li>About</li>
            <li>Features</li>
            <li>Contact</li>
          </ul>
        </div>

        
        <div className="footer-links">
          <h4>Features</h4>
          <ul>
            <li>Summary</li>
            <li>Bullet Points</li>
            <li>Roadmap</li>
            <li>PDF Export</li>
          </ul>
        </div>

       
        <div className="footer-contact">
          <h4>Contact</h4>
          <p>Email: support@summify.ai</p>
          <p>Location: India</p>

          <div className="social-icons">
            <i className="fa-brands fa-facebook"></i>
            <i className="fa-brands fa-twitter"></i>
            <i className="fa-brands fa-linkedin"></i>
            <i className="fa-brands fa-github"></i>
          </div>
        </div>

      </div>

     
      <div className="footer-bottom">
        © {new Date().getFullYear()} Summify. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;