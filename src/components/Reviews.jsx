import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";

function Reviews() {
  const reviews = [
    { name: "Rahim Ahmed", rating: 5, text: "Excellent service and very fast delivery.", role: "Business Owner" },
    { name: "Nusrat Jahan", rating: 4, text: "Amazing UI/UX design quality.", role: "Entrepreneur" },
    { name: "Tanvir Hasan", rating: 5, text: "Very professional team and clean work.", role: "Startup Founder" },
    { name: "Sadia Islam", rating: 5, text: "Support is super fast and helpful.", role: "Client" },
    { name: "Arif Hossain", rating: 4, text: "Best development experience ever.", role: "CEO" },
    { name: "Mehedi Hasan", rating: 5, text: "Highly recommended company in Bangladesh.", role: "Freelancer" }
  ];

  const [index, setIndex] = useState(0);
  const visibleCount = 3;

  useEffect(() => {
    const interval = setInterval(() => {
      next();
    }, 4000);

    return () => clearInterval(interval);
  }, [index]);

  const next = () => {
    setIndex((prev) => (prev + 1) % reviews.length);
  };

  const prev = () => {
    setIndex((prev) => (prev - 1 + reviews.length) % reviews.length);
  };

  const visible = [];
  for (let i = 0; i < visibleCount; i++) {
    visible.push(reviews[(index + i) % reviews.length]);
  }

  return (
    <section className="reviews-section">
      <h2>What Clients Say</h2>

      <div className="carousel">

        <button onClick={prev} className="nav-btn">‹</button>

<div className="cards-wrapper">
  {visible.map((r, i) => (
    <div className="review-card" key={i}>

      <div className="user">
<FontAwesomeIcon icon={faUser} style={{ color: "#d2d2d2", fontSize: "62px" }} />
      </div>

      <h3>{r.name}</h3>
      <small>{r.role}</small>

      {/* ⭐ STARS */}
      <div className="stars">
        {"★".repeat(r.rating)}
        {"☆".repeat(5 - r.rating)}
      </div>

      <p>"{r.text}"</p>
    </div>
  ))}
</div>

        <button onClick={next} className="nav-btn">›</button>

      </div>
    </section>
  );
}

export default Reviews;