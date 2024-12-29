import React from "react";
import "./PropertyCard.css";
import { FaBed } from "react-icons/fa";
import { IoMdStar, IoMdStarHalf, IoMdStarOutline } from "react-icons/io";
import { GrFormView } from "react-icons/gr";


const PropertyCard = ({ property, onAddToFavorites, onDragStart }) => {
  const {
    picture,
    type,
    name,
    bedrooms,
    price,
    location,
    description,
    rating,
    views,
    cardType,
    added
  } = property;

  const renderStars = (rating) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      if (rating >= i) {
        stars.push(<IoMdStar key={i} className="icon-star" />);
      } else if (rating >= i - 0.5) {
        stars.push(<IoMdStarHalf key={i} className="icon-star" />);
      } else {
        stars.push(<IoMdStarOutline key={i} className="icon-star" />);
      }
    }
    return stars;
  };

  const formatDate = (added) => {
    return `${added.day}/${added.month}/${added.year}`;
  };

  return (
    <div
      className="property-card"
      draggable
      onDragStart={(e) => onDragStart(e, property.id)}
    >
      <div className="card-image-container">
        <img src={picture} alt={`${name}`} className="property-image" />
        <span className={`tag ${cardType.toLowerCase()}`}>{cardType}</span>
      </div>
      <div className="property-details">
        <h4 className="property-name">{name}</h4>
        <div className="property-info">
          <span className="property-type">{type}</span>
          <span className="property-bedrooms">
            <FaBed className="icon-bed" /> {bedrooms} Bedrooms
          </span>
          <span className="property-rating">{renderStars(rating)}</span>
          <span className="property-views">
            <GrFormView className="icon-eye" /> {views} Views
          </span>
        </div>
        <p className="property-added-date">Added: {formatDate(added)}</p>
        <p className="property-price">€ {price.toLocaleString()}</p>
        <p className="property-location">{location}</p>
        <p className="property-description">{description.slice(0, 100)}...</p>

        <button
          className="btn btn-add-favorites"
          onClick={() => onAddToFavorites(property.id)}
        >
          Add to Favorites
        </button>
      </div>
    </div>
  );
};

export default PropertyCard;
