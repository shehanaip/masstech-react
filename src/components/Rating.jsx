import React, { useState } from "react";

function Rating() {
  const [rating, setRating] = useState(3);

  return (
    <section className="rating-section">
      <h2>Rate Our Service</h2>

      <div className="rating-box">
        <input
          type="range"
          min="1"
          max="5"
          step="1"
          value={rating}
          onChange={(e) => setRating(e.target.value)}
          className="rating-slider"
        />

        <div className="rating-value">
          {rating} / 5
        </div>
      </div>
    </section>
  );
}

export default Rating;