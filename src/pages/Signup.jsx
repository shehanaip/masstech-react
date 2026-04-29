import React, { useState } from "react";
import { Link } from "react-router-dom";
import "../css/auth.css";

function Signup() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: ""
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.name || !form.email || !form.password) {
      alert("All fields required");
      return;
    }

    if (form.password !== form.confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    try {
      const res = await fetch("https://masstech-react.onrender.com/api/auth/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          name: form.name,
          email: form.email,
          password: form.password
        })
      });

      const data = await res.json();

      alert(data.message);

      if (res.ok) {
        setForm({
          name: "",
          email: "",
          password: "",
          confirmPassword: ""
        });
      }

    } catch (err) {
      alert("Server error");
      console.log(err);
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-card">

        <div className="logo">Masstech</div>

        <h2>Create your account</h2>
        <p>Sign up to get started</p>

        <form onSubmit={handleSubmit}>

          <input
            type="text"
            name="name"
            placeholder="Full Name"
            value={form.name}
            onChange={handleChange}
          />

          <input
            type="email"
            name="email"
            placeholder="Email"
            value={form.email}
            onChange={handleChange}
          />

          <input
            type="password"
            name="password"
            placeholder="Password"
            value={form.password}
            onChange={handleChange}
          />

          <input
            type="password"
            name="confirmPassword"
            placeholder="Confirm Password"
            value={form.confirmPassword}
            onChange={handleChange}
          />

          <button type="submit" className="auth-btn">
            Sign Up
          </button>

        </form>

        <div className="auth-link">
          Already have an account? <Link to="/login">Login</Link>
        </div>

      </div>
    </div>
  );
}

export default Signup;