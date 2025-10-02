import React from "react";
import { FaFacebookF, FaTwitter, FaInstagram, FaGithub, FaLinkedin, FaLinkedinIn } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <p className="mb-2">
          &copy; {new Date().getFullYear()} My Blog. All Rights Reserved.
        </p>
        <div className="social-links">
          <a href="https://facebook.com" target="_blank" rel="noreferrer" className="social-btn">
            <FaFacebookF />
          </a>
          <a href="https://twitter.com" target="_blank" rel="noreferrer" className="social-btn">
            <FaTwitter />
          </a>
          <a href="https://instagram.com" target="_blank" rel="noreferrer" className="social-btn">
            <FaInstagram />
          </a>
          <a href="https://github.com" target="_blank" rel="noreferrer" className="social-btn">
            <FaLinkedinIn />
          </a>
        </div>
      </div>
    </footer>
  );
}
