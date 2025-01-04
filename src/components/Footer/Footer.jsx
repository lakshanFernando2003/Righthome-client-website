import React from 'react';
import { SlSocialTwitter, SlSocialInstagram, SlSocialLinkedin, SlSocialFacebook } from "react-icons/sl";
import { FcLike } from "react-icons/fc";
import { BsGithub } from "react-icons/bs";
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-sections-container">
          <div className="footer-section">
            <h4>Quick Links</h4>
            <div className="footer-links">
              <a href="/about">About Us</a>
              <a href="/privacy">Privacy Policy</a>
              <a href="/contact">Contact Us</a>
              <a href="/terms">Terms & Conditions</a>
            </div>
          </div>

          <div className="footer-section">
            <h4>Contact Info</h4>
            <div className="contact-info">
              <p><i className="fas fa-envelope"></i> lakshanchanaka34@gmail.com</p>
              <p><i className="fas fa-phone"></i> +94 - 774 338 966</p>
              <p><i className="fas fa-location-dot"></i> Colombo, Sri Lanka</p>
            </div>
          </div>

          <div className="footer-section">
            <h4>Connect With Us</h4>
            <div className="social-links">
              <a href="https://www.facebook.com/profile.php?id=100083272787172&mibextid=ZbWKwL" target="_blank" rel="noopener noreferrer" aria-label="Facebook">
                <SlSocialFacebook className="social-icon" />
              </a>
              <a href="https://twitter.com/Mrpro93809286" target="_blank" rel="noopener noreferrer" aria-label="Twitter">
                <SlSocialTwitter className="social-icon" />
              </a>
              <a href="https://www.instagram.com/_laksh__an_?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw==" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
                <SlSocialInstagram className="social-icon" />
              </a>
              <a href="https://lk.linkedin.com/in/lakshan-fernando-770037294 " target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
                <SlSocialLinkedin className="social-icon" />
              </a>
              <a href="https://github.com/lakshanFernando2003/Righthome-client-website.git " target="_blank" rel="noopener noreferrer" aria-label="GitHub">
                <BsGithub className="social-icon" />
              </a>
            </div>
          </div>
        </div>

        <div className="footer-bottom">
          <div className="developer-info">
            <span>Developed with</span>
            <FcLike className="heart-icon" />
            <span>by Lakshan</span>
          </div>
          <div className="footer-copyright">
            <p>&copy; {new Date().getFullYear()} Right Client. All rights reserved.</p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
