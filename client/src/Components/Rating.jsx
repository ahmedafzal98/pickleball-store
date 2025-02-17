import React, { useState } from "react";

const RatingComponent = () => {
  const [rating, setRating] = useState(0);

  return (
    <div className="flex flex-col items-center space-y-4">
      <h2 className="text-xl font-bold">Rate our product</h2>
      <div className="rating">
        <input
          type="radio"
          name="rating-10"
          className="mask mask-star-2 bg-yellow-400"
          onClick={() => setRating(1)}
        />
        <input
          type="radio"
          name="rating-10"
          className="mask mask-star-2 bg-yellow-400"
          onClick={() => setRating(2)}
        />
        <input
          type="radio"
          name="rating-10"
          className="mask mask-star-2 bg-yellow-400"
          onClick={() => setRating(3)}
        />
        <input
          type="radio"
          name="rating-10"
          className="mask mask-star-2 bg-yellow-400"
          onClick={() => setRating(4)}
        />
        <input
          type="radio"
          name="rating-10"
          className="mask mask-star-2 bg-yellow-400"
          onClick={() => setRating(5)}
        />
      </div>

      {/* Display the rating value */}
      <p className="text-lg font-semibold">Your Rating: {rating} stars</p>
    </div>
  );
};

export default RatingComponent;
