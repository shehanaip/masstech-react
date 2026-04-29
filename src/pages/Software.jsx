import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import { Link } from "react-router-dom";
import Footer from "../components/Footer";
import Loader from "../components/Loader";
import "../css/software.css";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faLaptopCode,
  faCubes,
  faMobileScreen,
  faPlug,
  faBullseye,
  faEye
} from "@fortawesome/free-solid-svg-icons";

function Software() {
  const [loading, setLoading] = useState(true);

  const user = JSON.parse(localStorage.getItem("user"));

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

    if (!form.service || !form.details || !form.whatsapp) {
      alert("Please fill all required fields");
      return;
    }

    try {
      const res = await fetch("https://masstech-react.onrender.com/api/service-request", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(form)
      });

      const data = await res.json();

      alert(data.message);

      // reset only editable fields
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
    <div className="software-page">

      {loading && <Loader />}

      {!loading && (
        <>
          <Navbar />

          {/* HERO */}
          <section className="software-hero">
            <h1>Software Development</h1>
            <p>
              We design scalable, secure and high-performance software systems
              for modern businesses.
            </p>

            <div className="hero-buttons">
              <Link to="/login" className="btn-primary">Get Started</Link>
              <Link to="/signup" className="btn-outline">Create Account</Link>
            </div>
          </section>

          {/* ABOUT */}
          <section className="section fancy-section about-box animate__animated animate__fadeInUp">
            <h2>About Our Service</h2>
            <p>
              We build enterprise-grade systems including ERP, CRM, billing
              platforms and custom business solutions.
            </p>
          </section>

          {/* WHAT WE PROVIDE */}
          <section className="grid-section fancy-grid">
            <h2>What We Provide</h2>

            <div className="grid">

              <div className="card fancy-card">
                <FontAwesomeIcon icon={faLaptopCode} className="icon" />
                <h3>Custom Software</h3>
              </div>

              <div className="card fancy-card">
                <FontAwesomeIcon icon={faCubes} className="icon" />
                <h3>Business Systems</h3>
              </div>

              <div className="card fancy-card">
                <FontAwesomeIcon icon={faMobileScreen} className="icon" />
                <h3>Mobile Apps</h3>
              </div>

              <div className="card fancy-card">
                <FontAwesomeIcon icon={faPlug} className="icon" />
                <h3>API Integration</h3>
              </div>

            </div>
          </section>

          {/* MISSION */}
          <section className="mission-vision fancy-mv">

            <div className="mv-box mission">
              <FontAwesomeIcon icon={faBullseye} className="mv-icon" />
              <h3>Our Mission</h3>
              <p>To simplify business operations with powerful software.</p>
            </div>

            <div className="mv-box vision">
              <FontAwesomeIcon icon={faEye} className="mv-icon" />
              <h3>Our Vision</h3>
              <p>To become a global leader in digital transformation.</p>
            </div>

          </section>

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

          {/* SERVICE REQUEST FORM */}
          <section className="cta">

            {!user ? (
              <>
                <h2>Ready to build your system?</h2>
                <p>Login or signup to request a project.</p>

                <div className="hero-buttons">
                  <Link to="/login" className="btn-1">Login</Link>
                  <Link to="/signup" className="btn-2">Signup</Link>
                </div>
              </>
            ) : (
              <div className="service-request-container">

                <h2>Request Software Service</h2>
                <p>Fill the form below</p>

                <form className="service-form" onSubmit={handleSubmit}>

                  <input
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    placeholder="Full Name"
                    disabled
                  />

                  <input
                    name="email"
                    value={form.email}
                    onChange={handleChange}
                    placeholder="Email"
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
                    <option>Custom Software</option>
                    <option>ERP System</option>
                    <option>CRM</option>
                    <option>Billing System</option>
                    <option>Mobile App</option>
                  </select>

                  <textarea
                    name="details"
                    value={form.details}
                    onChange={handleChange}
                    rows="5"
                    placeholder="Project Details"
                  />

                  <button type="submit" className="submit-service-btn">
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

export default Software;