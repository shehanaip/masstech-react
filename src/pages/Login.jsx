import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../css/auth.css";

function Login() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    email: "",
    password: ""
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.email || !form.password) {
      alert("All fields required");
      return;
    }

    try {
      const res = await fetch("https://masstech-react.onrender.com/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(form)
      });

      const data = await res.json();

      alert(data.message);

      if (res.ok) {
        localStorage.setItem("user", JSON.stringify(data.user));

        navigate("/");
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

        <h2>Login to your account</h2>
        <p>Enter your email and password</p>

        <form onSubmit={handleSubmit}>

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

          <button type="submit" className="auth-btn">
            Login
          </button>

        </form>

        <div className="auth-link">
          Don't have an account? <Link to="/signup">Sign Up</Link>
        </div>

      </div>
    </div>
  );
}

export default Login;