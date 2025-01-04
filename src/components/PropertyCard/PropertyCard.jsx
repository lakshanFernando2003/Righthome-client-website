import React from "react";
import PropTypes from "prop-types";
import "./PropertyCard.css";
import { FaBed } from "react-icons/fa";
import { IoMdStar, IoMdStarHalf, IoMdStarOutline } from "react-icons/io";
import { GoHeartFill } from "react-icons/go";
import { BsArrowRight } from "react-icons/bs";
import { MdAddToPhotos } from "react-icons/md";

const PropertyCard = ({ property, onAddToFavorites, onDragStart, onViewDetails, onImageClick }) => {
  // setting details of properties in to variables
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
    added,
  } = property;

  // render ranting stars
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

   // formate date
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
        <img
          src={picture}
          alt={`${name}`}
          className="property-image"
          onClick={() => onImageClick(property)}
        />
        <span className={`tag ${cardType.toLowerCase()}`}>{cardType}</span>
        <span
          className="favorite-icon"
          onClick={() => onAddToFavorites(property.id)}
        >
          <GoHeartFill className="favorite-filled" />
        </span>
      </div>
      <div className="property-details">
        <h4 className="property-name">{name}</h4>
        <div className="property-info">
          <span className="property-type">{type}</span>
          <span className="property-bedrooms">
            <FaBed className="icon-bed" /> {bedrooms} Beds
          </span>
          <span className="property-rating">{renderStars(rating)}</span>
          <span className="property-views">{views} Views</span>
        </div>
        <p className="property-added-date">Added: {formatDate(added)}</p>
        <p className="property-price">€ {price.toLocaleString()}</p>
        <p className="property-location">{location}</p>
        <p className="property-description">{description.slice(0, 100)}...</p>
        <div className="property-actions">
          <button
            className="btn-view-details"
            onClick={() => onViewDetails(property)}
          >
            Details <BsArrowRight className="view-details-icon" />
          </button>
          <button
            className="btn-add-to-favorites"
            onClick={() => onAddToFavorites(property.id)}
          >
            Add to Favorites <MdAddToPhotos className="view-details-icon" />
          </button>
        </div>
      </div>
    </div>
  );
};

PropertyCard.propTypes = {
  property: PropTypes.object.isRequired,
  onAddToFavorites: PropTypes.func.isRequired,
  onDragStart: PropTypes.func.isRequired,
  onViewDetails: PropTypes.func.isRequired,
  onImageClick: PropTypes.func.isRequired,
};

export default PropertyCard;
