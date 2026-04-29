import React from "react";
import { Link } from "react-router-dom";

function Footer() {
  return (
    <footer className="footer">

      <div className="footer-container">

        {/* COMPANY */}
        <div className="footer-box">
          <h3>Masstech</h3>
          <p>
            We build modern software, web applications, SEO systems, and
            graphic design solutions to grow your business digitally.
          </p>
        </div>

        {/* QUICK LINKS */}
        <div className="footer-box">
          <h4>Quick Links</h4>
          <Link to="/">Home</Link>
          <Link to="/contact">Contact</Link>
          <Link to="/About">About</Link>
          <Link to="/Store">Store</Link>
          <Link to="/login">Login</Link>
          <Link to="/signup">Signup</Link>
        </div>

        {/* SERVICES */}
        <div className="footer-box">
          <h4>Services</h4>
          <Link to="/services/software">Software Development</Link>
          <Link to="/services/webdev">Web Development</Link>
          <Link to="/services/GraphicDesign">Graphic Design</Link>
          <Link to="/services/seo">SEO Optimization</Link>
        </div>

        {/* COMPANY INFO */}
        <div className="footer-box">
          <h4>Company</h4>
          <Link to="/About">About Us</Link>
          <Link to="/portfolio">Portfolio</Link>
          <Link to="/terms">Terms & Conditions</Link>
          <Link to="/privacy">Privacy Policy</Link>
        </div>

      </div>

      {/* BOTTOM */}
      <div className="footer-bottom">
        © {new Date().getFullYear()} Masstech All Right Reserved
      </div>

    </footer>
  );
}

export default Footer;