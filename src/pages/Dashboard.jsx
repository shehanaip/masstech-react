import React, { useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { useNavigate } from "react-router-dom";
import "../css/dashboard.css";

function Dashboard() {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));

  const [passwords, setPasswords] = useState({
    newPassword: "",
    confirmPassword: ""
  });

  const logout = () => {
    localStorage.removeItem("user");
    navigate("/login");
  };

  const handleChange = (e) => {
    setPasswords({
      ...passwords,
      [e.target.name]: e.target.value
    });
  };

  const updatePassword = (e) => {
    e.preventDefault();

    if (!passwords.newPassword || !passwords.confirmPassword) {
      alert("All fields required");
      return;
    }

    if (passwords.newPassword !== passwords.confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    alert("Password updated successfully");

    setPasswords({
      newPassword: "",
      confirmPassword: ""
    });
  };

  return (
    <>
      <Navbar />

      <div className="dashboard-page">

        <div className="dashboard-card">

          <h1>Welcome, {user?.name}</h1>
          <p className="email">{user?.email}</p>

          {/* USER INFO */}
          <div className="dashboard-section">
            <h2>Account Information</h2>

            <div className="info-box">
              <p><strong>Name:</strong> {user?.name}</p>
              <p><strong>Email:</strong> {user?.email}</p>
            </div>
          </div>

          {/* CHANGE PASSWORD */}
          <div className="dashboard-section">
            <h2>Update Password</h2>

            <form onSubmit={updatePassword}>

              <input
                type="password"
                name="newPassword"
                placeholder="New Password"
                value={passwords.newPassword}
                onChange={handleChange}
              />

              <input
                type="password"
                name="confirmPassword"
                placeholder="Confirm Password"
                value={passwords.confirmPassword}
                onChange={handleChange}
              />

              <button type="submit" className="update-btn">
                Update Password
              </button>

            </form>
          </div>

          {/* LOGOUT */}
          <button className="logout-btn" onClick={logout}>
            Logout
          </button>

        </div>

      </div>

      <Footer />
    </>
  );
}

export default Dashboard;