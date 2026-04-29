import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Loader from "../components/Loader";
import { Link } from "react-router-dom";
import "../css/software.css";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faSearch,
  faChartLine,
  faGlobe,
  faLink
} from "@fortawesome/free-solid-svg-icons";

function SEO() {
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
      const res = await fetch("https://masstech-react.vercel.app/api/service-request", {
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
            <h1>SEO Optimization</h1>
            <p>Boost your website ranking and grow your business online.</p>

            <div className="hero-buttons">
              <Link to="/login" className="btn-primary">Get Started</Link>
              <Link to="/signup" className="btn-outline">Create Account</Link>
            </div>
          </section>

          {/* SERVICES */}
          <section className="grid-section fancy-grid">

            <h2>What We Do</h2>

            <div className="grid">

              <div className="card">
                <FontAwesomeIcon icon={faSearch} />
                <h3>Keyword Research</h3>
              </div>

              <div className="card">
                <FontAwesomeIcon icon={faChartLine} />
                <h3>Ranking Growth</h3>
              </div>

              <div className="card">
                <FontAwesomeIcon icon={faGlobe} />
                <h3>Website SEO</h3>
              </div>

              <div className="card">
                <FontAwesomeIcon icon={faLink} />
                <h3>Backlink Building</h3>
              </div>

            </div>
          </section>

          {/* FORM */}
          <section className="cta">

            {!user ? (
              <>
                <h2>Improve your ranking</h2>
                <p>Login or signup to request SEO service.</p>
              </>
            ) : (
              <div className="service-request-container">

                <h2>SEO Service Request</h2>

                <form onSubmit={handleSubmit} className="service-form">

                  <input name="name" value={form.name} disabled />
                  <input name="email" value={form.email} disabled />

                  <input
                    name="whatsapp"
                    value={form.whatsapp}
                    onChange={handleChange}
                    placeholder="WhatsApp Number"
                  />

                  <select name="service" onChange={handleChange} value={form.service}>
                    <option value="">Select SEO Type</option>
                    <option>On Page SEO</option>
                    <option>Off Page SEO</option>
                    <option>Full SEO Package</option>
                  </select>

                  <textarea
                    name="details"
                    value={form.details}
                    onChange={handleChange}
                    placeholder="Describe your website"
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

export default SEO;