import { FaStar, FaStarHalfAlt, FaRegStar } from "react-icons/fa";

const StarRating = ({ rating = 4.2 }) => {
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating % 1 >= 0.5;
  const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);

  return (
    <div className="flex flex-col sm:flex-row items-center gap-1">
      <div className="stars flex text-yellow-400 text-sm">
        {[...Array(fullStars)].map((_, i) => (
          <FaStar key={`full-${i}`} />
        ))}
        {hasHalfStar && <FaStarHalfAlt />}
        {[...Array(emptyStars)].map((_, i) => (
          <FaRegStar key={`empty-${i}`} />
        ))}
      </div>
      <span className="ml-2 bg-yellow-100 text-yellow-800 text-xs px-2 py-0.5 rounded font-semibold">
        {rating==5 ? 5 : rating.toFixed(1)} / 5
      </span>
    </div>
  );
};

export default StarRating;
