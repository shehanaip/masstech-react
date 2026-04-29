import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import { Link } from "react-router-dom";
import Footer from "../components/Footer";
import Loader from "../components/Loader";
import "../css/webdev.css";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCode,
  faServer,
  faMobileScreen,
  faRocket,
  faBullseye,
  faEye
} from "@fortawesome/free-solid-svg-icons";

function WebDev() {
  const [loading, setLoading] = useState(true);

  const user = JSON.parse(localStorage.getItem("user"));

  // =========================
  // FORM STATE
  // =========================
  const [form, setForm] = useState({
    name: user?.name || "",
    email: user?.email || "",
    whatsapp: "",
    service: "",
    details: ""
  });

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 800);
    return () => clearTimeout(timer);
  }, []);

  // =========================
  // HANDLE INPUT CHANGE
  // =========================
  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  // =========================
  // SUBMIT FORM
  // =========================
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.whatsapp || !form.service || !form.details) {
      alert("Please fill all required fields");
      return;
    }

    try {
      const res = await fetch("https://masstech-react.vercel.app/api/service-request", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(form)
      });

      const data = await res.json();

      alert(data.message);

      // reset form (keep user data)
      setForm({
        name: user?.name || "",
        email: user?.email || "",
        whatsapp: "",
        service: "",
        details: ""
      });

    } catch (err) {
      console.log(err);
      alert("Server error");
    }
  };

  return (
    <div className="webdev-page">

      {loading && <Loader />}

      {!loading && (
        <>
          <Navbar />

          {/* HERO */}
          <section className="webdev-hero">
            <h1>Web Development</h1>
            <p>
              We build fast, modern, and scalable web applications for businesses.
            </p>

            <div className="hero-buttons">
              <Link to="/login" className="btn-primary">Get Started</Link>
              <Link to="/signup" className="btn-outline">Create Account</Link>
            </div>
          </section>



          {/* ABOUT */}
          <section className="about-fancy">
            <div className="about-box animate__animated animate__fadeInUp">
              <h2>About Web Development</h2>
              <p>
                We design and build modern web applications that are fast, scalable,
                and user-focused. From startups to enterprise systems, we deliver
                high-quality digital experiences using cutting-edge technologies.
              </p>
            </div>
          </section>

          {/* WHAT WE BUILD */}
          <section className="grid-section fancy-grid">
            <h2 className="animate__animated animate__fadeInDown">
              What We Build
            </h2>

            <div className="grid">
              <div className="card hover-card animate__animated animate__fadeInUp">
                <FontAwesomeIcon icon={faCode} className="icon" />
                <h3>Business Websites</h3>
                <p>Professional, responsive company websites.</p>
              </div>

              <div className="card hover-card animate__animated animate__fadeInUp">
                <FontAwesomeIcon icon={faServer} className="icon" />
                <h3>Web Applications</h3>
                <p>Dashboards, CRM, ERP & SaaS platforms.</p>
              </div>

              <div className="card hover-card animate__animated animate__fadeInUp">
                <FontAwesomeIcon icon={faMobileScreen} className="icon" />
                <h3>Mobile Friendly UI</h3>
                <p>Fully responsive modern UI/UX systems.</p>
              </div>

              <div className="card hover-card animate__animated animate__fadeInUp">
                <FontAwesomeIcon icon={faRocket} className="icon" />
                <h3>High Performance</h3>
                <p>Optimized for speed, SEO & scalability.</p>
              </div>
            </div>
          </section>

          {/* TECHNOLOGIES */}
          <section className="tech animate__animated animate__fadeIn">
            <h2>Technologies We Use</h2>
            <div className="tech-grid">
              <div>React.js</div>
              <div>Node.js</div>
              <div>Express.js</div>
              <div>MongoDB</div>
              <div>MySQL</div>
              <div>Bootstrap</div>
              <div>Tailwind CSS</div>
              <div>REST APIs</div>
            </div>
          </section>

          {/* MISSION / VISION */}
          <section className="mission-vision fancy-mv">
            <div className="mv-box animate__animated animate__fadeInLeft">
              <FontAwesomeIcon icon={faBullseye} className="mv-icon" />
              <h3>Our Mission</h3>
              <p>
                To build powerful web systems that simplify business operations and
                help companies grow digitally.
              </p>
            </div>

            <div className="mv-box animate__animated animate__fadeInRight">
              <FontAwesomeIcon icon={faEye} className="mv-icon" />
              <h3>Our Vision</h3>
              <p>
                To become a global leader in web development by delivering modern,
                scalable, and intelligent digital products.
              </p>
            </div>
          </section>

          {/* PRICING */}
{/* PRICING */}
<section className="pricing">

  <h2>Pricing Plans</h2>

  <div className="pricing-grid">

    {/* BASIC */}
    <div className="price-card">
      <h3>Basic</h3>
      <p className="price">$120</p>

      <ul>
        <li>✔ Static Website</li>
        <li>✔ Responsive Design</li>
        <li>✔ 3 Pages</li>
        <li>✔ Basic SEO</li>
      </ul>

      <Link to="/signup" className="price-btn">
        Get Started
      </Link>
    </div>

    {/* STANDARD */}
    <div className="price-card">
      <h3>Standard</h3>
      <p className="price">$350</p>

      <ul>
        <li>✔ Dynamic Website</li>
        <li>✔ Backend Integration</li>
        <li>✔ Admin Dashboard</li>
        <li>✔ API Support</li>
      </ul>

      <Link to="/signup" className="price-btn primary">
        Get Started
      </Link>
    </div>

    {/* PREMIUM */}
    <div className="price-card">
      <h3>Premium</h3>
      <p className="price">$800</p>

      <ul>
        <li>✔ Full Web Application</li>
        <li>✔ Authentication System</li>
        <li>✔ Database Integration</li>
        <li>✔ 24/7 Support</li>
      </ul>

      <Link to="/signup" className="price-btn">
        Get Started
      </Link>
    </div>

  </div>

</section>

          {/* SERVICE REQUEST */}
          <section className="cta">

            {!user ? (
              <>
                <h2>Ready to build your system?</h2>

                <div className="hero-buttons">
                  <Link to="/login" className="btn-1">Login</Link>
                  <Link to="/signup" className="btn-2">Signup</Link>
                </div>
              </>
            ) : (
              <div className="service-request-container">

                <h2>Request Web Development Service</h2>

                <form className="service-form" onSubmit={handleSubmit}>

                  <input
                    name="name"
                    value={form.name}
                    disabled
                  />

                  <input
                    name="email"
                    value={form.email}
                    disabled
                  />

                  <input
                    name="whatsapp"
                    value={form.whatsapp}
                    onChange={handleChange}
                    placeholder="WhatsApp Number"
                  />

                  <select
                    name="service"
                    value={form.service}
                    onChange={handleChange}
                  >
                    <option value="">Select Service</option>
                    <option>Custom Website</option>
                    <option>Ecommerce Website</option>
                    <option>Wordpress</option>
                    <option>Web App</option>
                    <option>API Integration</option>
                  </select>

                  <textarea
                    name="details"
                    value={form.details}
                    onChange={handleChange}
                    rows="5"
                    placeholder="Project Details"
                  />

                  <button type="submit">
                    Submit Request
                  </button>

                </form>

              </div>
            )}

          </section>

          <Footer />
        </>
      )}

    </div>
  );
}

export default WebDev;