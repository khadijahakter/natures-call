import React from "react";

const StarRating = ({ rating }) => {
  const filledStars = Math.min(Math.round(rating), 5);

  const renderStars = () => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <span key={i} className={`star ${i <= filledStars ? 'yellow' : 'gray'}`}>
          ★
        </span>
      );
    }
    return stars;
  };

  return <>{renderStars()}</>;
};

export default StarRating;
