import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Loader from "../components/Loader";
import { Link } from "react-router-dom";
import "../css/software.css";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPalette,
  faPenNib,
  faImage,
  faBrush
} from "@fortawesome/free-solid-svg-icons";

function GraphicDesign() {
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

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch("https://masstech-react.onrender.com/api/service-request", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form)
      });

      const data = await res.json();
      alert(data.message);

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
            <h1>Graphic Design</h1>
            <p>We create modern, creative and eye-catching visual designs.</p>

            <div className="hero-buttons">
              <Link to="/login" className="btn-primary">Get Started</Link>
              <Link to="/signup" className="btn-outline">Create Account</Link>
            </div>
          </section>

          {/* SERVICES */}
          <section className="grid-section fancy-grid">
            <h2>What We Design</h2>

            <div className="grid">

              <div className="card">
                <FontAwesomeIcon icon={faPalette} />
                <h3>Logo Design</h3>
              </div>

              <div className="card">
                <FontAwesomeIcon icon={faPenNib} />
                <h3>Brand Identity</h3>
              </div>

              <div className="card">
                <FontAwesomeIcon icon={faImage} />
                <h3>Social Media Posts</h3>
              </div>

              <div className="card">
                <FontAwesomeIcon icon={faBrush} />
                <h3>UI/UX Design</h3>
              </div>

            </div>
          </section>

          {/* REQUEST FORM */}
          <section className="cta">

            {!user ? (
              <>
                <h2>Want a design?</h2>
                <p>Login or signup to request design service.</p>

                <div className="hero-buttons">
                  <Link to="/login" className="btn-1">Login</Link>
                  <Link to="/signup" className="btn-2">Signup</Link>
                </div>
              </>
            ) : (
              <div className="service-request-container">

                <h2>Graphic Design Request</h2>

                <form onSubmit={handleSubmit} className="service-form">

                  <input name="name" value={form.name} disabled />
                  <input name="email" value={form.email} disabled />

                  <input
                    name="whatsapp"
                    value={form.whatsapp}
                    onChange={handleChange}
                    placeholder="WhatsApp Number"
                  />

                  <select name="service" value={form.service} onChange={handleChange}>
                    <option value="">Select Design Type</option>
                    <option>Logo Design</option>
                    <option>Brand Identity</option>
                    <option>Social Media Design</option>
                    <option>UI/UX Design</option>
                  </select>

                  <textarea
                    name="details"
                    value={form.details}
                    onChange={handleChange}
                    placeholder="Describe your design idea"
                  />

                  <button className="submit-service-btn">Submit</button>

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

export default GraphicDesign;