import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Rating from "../components/Rating";
import Reviews from "../components/Reviews";
import Footer from "../components/Footer";
import Loader from "../components/Loader";
import "../css/style.css";
import "animate.css";

function Home() {
  const [apiData, setApiData] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // fake loading + API call together
    fetch("https://masstech-react.vercel.app")
      .then(res => res.text())
      .then(data => setApiData(data))
      .catch(err => console.log(err));

    const timer = setTimeout(() => {
      setLoading(false);
    }, 900);

    return () => clearTimeout(timer);
  }, []);

  const start = () => {
    alert("Welcome to Masstech!");
  };

  const contact = () => {
    window.location = "#";
  };

  return (
    <>
      {/* LOADER */}
      {loading && <Loader />}

      {/* MAIN CONTENT */}
      {!loading && (
        <>
          {/* NAVBAR */}
          <Navbar />

          {/* HERO */}
          <section className="hero">
            <div className="hero-text animate__animated animate__bounceInLeft">
              <h1>Smart Business Solutions</h1>

              <p>
                Powerful tools to manage your business, billing, and operations easily.
                Built for speed, security, and scalability.
              </p>

              <div className="btn-p">
                <a className="hero-btn" href="/contact">
                  Get Started
                </a>
              </div>

              <p style={{ marginTop: "10px", color: "green" }}>
                {apiData}
              </p>
            </div>

            <img
              className="animate__animated animate__bounceInRight"
              src="/img/h_1.png"
              alt="Hero"
            />
          </section>

          {/* SERVICES */}
          <section className="services">
            <h2>Our Services</h2>

            <div className="service-container">
              <div className="service">
                <img src="/icon/1.png" alt="Software Development" />
                <h3>Software Development</h3>
                <p>Custom business software solutions.</p>
              </div>

              <div className="service">
                <img src="/icon/2.png" alt="Billing Systems" />
                <h3>Billing Systems</h3>
                <p>Automated billing and payment systems.</p>
              </div>

              <div className="service">
                <img src="/icon/3.png" alt="IT Infrastructure" />
                <h3>IT Infrastructure</h3>
                <p>Network and system management services.</p>
              </div>
            </div>
          </section>

          {/* FEATURE */}
          <section className="feature">
            <div className="feature-text">
              <h2>Designed for Modern Businesses</h2>
              <p>
                Our systems are fast, reliable, and easy to manage.
                Perfect for ISPs, companies, and service providers.
              </p>
            </div>

            <img className="img-fluid" src="/img/s.png" alt="Feature" />
          </section>

          {/* RATING (optional) */}
          {/* <Rating /> */}

          {/* REVIEWS */}
          <Reviews />

          {/* MAP */}
<section className="map-section">
  <h2>Find Us Here</h2>

  <div className="map-container">
    <iframe
      title="masstech-location"
      src="https://maps.google.com/maps?q=Chittagong&t=&z=13&ie=UTF8&iwloc=&output=embed"
      width="100%"
      height="400"
      style={{ border: 0 }}
      loading="lazy"
      allowFullScreen
    />
  </div>
</section>

          {/* CTA */}
          <section className="cta">
            <h2>Start growing your business today</h2>
            <button onClick={contact}>Contact Us</button>
          </section>

          {/* FOOTER */}
          <Footer />
        </>
      )}
    </>
  );
}

export default Home;