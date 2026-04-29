import React, { useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Loader from "../components/Loader";
import "../css/contact.css";

function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: ""
  });

  const [responseMsg, setResponseMsg] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.name || !formData.email || !formData.message) {
      alert("All fields are required!");
      return;
    }

    try {
      setLoading(true);
      setResponseMsg("");

      const res = await fetch("https://masstech-react.onrender.com/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(formData)
      });

      const data = await res.json();

      setResponseMsg(data.message || "Message sent successfully!");
      setFormData({ name: "", email: "", message: "" });

    } catch (err) {
      console.log(err);
      setResponseMsg("Something went wrong ❌");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="contact-page">

      {/* LOADER OVERLAY */}
      {loading && <Loader />}

      {/* PAGE CONTENT */}
      {!loading && (
        <>
          <Navbar />

          <div className="contact-wrapper">
            <div className="contact-card">

              <h2 className="contact-title">Contact Us</h2>
              <p className="contact-sub">
                We'd love to hear from you. Send us a message and we’ll respond quickly.
              </p>

              <form onSubmit={handleSubmit}>

                <div className="form-group">
                  <input
                    type="text"
                    name="name"
                    placeholder="Your Name"
                    value={formData.name}
                    onChange={handleChange}
                  />
                </div>

                <div className="form-group">
                  <input
                    type="email"
                    name="email"
                    placeholder="Your Email"
                    value={formData.email}
                    onChange={handleChange}
                  />
                </div>

                <div className="form-group">
                  <textarea
                    name="message"
                    rows="5"
                    placeholder="Your Message..."
                    value={formData.message}
                    onChange={handleChange}
                  ></textarea>
                </div>

                <button className="submit-btn" disabled={loading}>
                  Send Message
                </button>

              </form>

              {responseMsg && (
                <p className="success-msg">{responseMsg}</p>
              )}

            </div>
          </div>

          <Footer />
        </>
      )}

    </div>
  );
}

export default Contact;