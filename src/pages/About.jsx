import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Loader from "../components/Loader";
import "../css/about.css";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faLaptopCode,
  faGlobe,
  faPalette,
  faChartLine,
  faBullseye,
  faEye
} from "@fortawesome/free-solid-svg-icons";

function About() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 800);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="about-page">

      {loading && <Loader />}

      {!loading && (
        <>
          <Navbar />

          {/* HERO */}
          <section className="about-hero">
            <h1>About Masstech</h1>
            <p>
              We are a modern digital solutions company building software,
              websites, SEO systems, and creative designs for businesses worldwide.
            </p>
          </section>

          {/* WHO WE ARE */}
          <section className="about-section">
            <div className="about-card">
              <h2>Who We Are</h2>
              <p>
                Masstech is a software development agency focused on building
                scalable, secure, and high-performance digital products.
              </p>
            </div>
          </section>

          {/* WHAT WE DO */}
          <section className="about-grid">

            <div className="about-box">
              <FontAwesomeIcon icon={faLaptopCode} className="about-icon" />
              <h3>Software Development</h3>
              <p>ERP, CRM, billing systems, and custom business applications.</p>
            </div>

            <div className="about-box">
              <FontAwesomeIcon icon={faGlobe} className="about-icon" />
              <h3>Web Development</h3>
              <p>Modern websites, dashboards, SaaS platforms, and web apps.</p>
            </div>

            <div className="about-box">
              <FontAwesomeIcon icon={faPalette} className="about-icon" />
              <h3>Graphic Design</h3>
              <p>Logos, branding, UI/UX design, and marketing creatives.</p>
            </div>

            <div className="about-box">
              <FontAwesomeIcon icon={faChartLine} className="about-icon" />
              <h3>SEO Optimization</h3>
              <p>Improve ranking, traffic, and visibility on search engines.</p>
            </div>

          </section>

          {/* MISSION / VISION */}
          <section className="about-mission">

            <div className="mission-box">
              <FontAwesomeIcon icon={faBullseye} className="about-icon" />
              <h2>Our Mission</h2>
              <p>
                To simplify digital transformation for businesses by delivering
                powerful, scalable, and user-friendly solutions.
              </p>
            </div>

            <div className="vision-box">
              <FontAwesomeIcon icon={faEye} className="about-icon" />
              <h2>Our Vision</h2>
              <p>
                To become a global leader in software and digital innovation.
              </p>
            </div>

          </section>

          {/* WHY CHOOSE US */}
          <section className="about-why">
            <h2>Why Choose Masstech?</h2>

            <ul>
              <li>✔ High-quality scalable systems</li>
              <li>✔ Modern UI/UX design</li>
              <li>✔ Fast development process</li>
              <li>✔ Secure backend architecture</li>
              <li>✔ Affordable pricing</li>
              <li>✔ Long-term support</li>
            </ul>
          </section>

          {/* CTA */}
          <section className="about-cta">
            <h2>Let’s Build Something Amazing</h2>
            <p>Contact us today and start your digital journey with Masstech.</p>

            <a href="/contact" className="cta-btn">
              Contact Us
            </a>
          </section>

          <Footer />
        </>
      )}
    </div>
  );
}

export default About;