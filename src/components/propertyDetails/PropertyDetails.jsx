import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import PropTypes from "prop-types";
import Maps from "../Map/Maps.jsx";
import { IoLocation } from "react-icons/io5";
import { GoHeart, GoHeartFill } from "react-icons/go";
import { LuShare2, LuFullscreen } from "react-icons/lu";
import { IoMdStar, IoMdStarHalf, IoMdStarOutline } from "react-icons/io";
import { IoIosArrowForward, IoIosArrowBack } from "react-icons/io";
import { LuUtensilsCrossed } from "react-icons/lu";
import { IoIosBed } from "react-icons/io";
import { GiBathtub } from "react-icons/gi";
import "./PropertyDetails.css";

const PropertyDetails = ({ properties }) => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [property, setProperty] = useState(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isLiked, setIsLiked] = useState(false);
  const [isMapOpen, setIsMapOpen] = useState(false);
  const [isFullScreen, setIsFullScreen] = useState(false);

  useEffect(() => {
    const selectedProperty = properties.find((prop) => prop.id === id);
    if (selectedProperty) {
      setProperty(selectedProperty);
    } else {
      console.error("Property not found");
      navigate("/"); // Redirect to home if property is not found
    }
  }, [id, properties, navigate]);

  useEffect(() => {
    if (property?.pictures?.length) {
      const timer = setInterval(() => {
        setCurrentImageIndex((prevIndex) => (prevIndex + 1) % property.pictures.length);
      }, 5000);
      return () => clearInterval(timer);
    }
  }, [property]);

  if (!property) {
    return <p>Loading property details...</p>;
  }

  const {
    name,
    location,
    price,
    bedrooms,
    bathrooms,
    kitchens,
    rating,
    pictures,
    fullDescription,
    latitude,
    views,
    longitude,
    type,
    added,
    tenure,
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

  const handleNextImage = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex + 1) % pictures.length);
  };

  const handlePreviousImage = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === 0 ? pictures.length - 1 : prevIndex - 1
    );
  };

  const formatDate = (dateObject) => {
    return `${dateObject.day}/${dateObject.month}/${dateObject.year}`;
  };

  const renderGallerySection = () => {
    return (
      <div className="gallery-section">
        <div className="gallery-slider">
          <div className="main-image">
            <img
              src={pictures[currentImageIndex]}
              alt={`Gallery ${currentImageIndex + 1}`}
            />
            <button className="fullscreen-icon" onClick={() => setIsFullScreen(true)}>
              <LuFullscreen />
            </button>
            <button className="arrow arrow-left" onClick={handlePreviousImage}>
              <IoIosArrowBack />
            </button>
            <button className="arrow arrow-right" onClick={handleNextImage}>
              <IoIosArrowForward />
            </button>
          </div>
        </div>
        <div className="gallery-thumbnails">
          {pictures.map((pic, index) => (
            <div
              key={index}
              className={`thumbnail-wrapper ${currentImageIndex === index ? 'active' : ''}`}
              onClick={() => setCurrentImageIndex(index)}
            >
              <img
                src={pic}
                alt={`Thumbnail ${index + 1}`}
                className="thumbnail-image"
              />
              <div className="thumbnail-overlay"></div>
            </div>
          ))}
        </div>
      </div>
    );
  };

  const renderOverviewSection = () => {
    return (
      <div className="property-overview">
        <h3>Quick Overview</h3>
        <div className="overview-stats">
          <div className="stat-item">
            <div className="stat-label">Price</div>
            <div className="stat-value">€{price.toLocaleString()}</div>
          </div>
          <div className="stat-item">
            <div className="stat-label">Rating</div>
            <div className="stat-value rating-display">
              {renderStars(rating)} ({rating})
            </div>
          </div>
          <div className="stat-item">
            <div className="stat-label">Views</div>
            <div className="stat-value">{views}</div>
          </div>
          <div className="stat-item">
            <div className="stat-label">Postal Code</div>
            <div className="stat-value">{property.postalcode}</div>
          </div>
        </div>
        </div>
    );
  };

  return (
    <div className="property-details-container">
      <div className="details-header">
        <div className="header-left">
          <div className="rating">{renderStars(rating)}</div>
          <h1>{name}</h1>
          <div className="location">
            <IoLocation className="icon-location" /> {location}
            <span
              className="show-map"
              onClick={() => setIsMapOpen(true)}
            >
              Show map
            </span>
          </div>
        </div>
        <div className="header-right">
          <button className="btn btn-reserve">Reserve</button>
          <button
            className="btn btn-favorite"
            onClick={() => setIsLiked(!isLiked)}
          >
            {isLiked ? <GoHeartFill /> : <GoHeart />}
          </button>
          <button className="btn btn-share">
            <LuShare2 />
          </button>
        </div>
      </div>

      <div className="middle-content">
        {renderGallerySection()}
        <div className="info-section">
          <div>
          {renderOverviewSection()}
          </div>

          <div className="map-container">
            <Maps
              latitude={latitude}
              longitude={longitude}
              zoom={15}
              markerTitle={location}
              height="100%"
            />
          </div>
        </div>
      </div>

      <div className="details-content">
        < div className="details-left">
          <div className="property-features">
            <div className="feature-item">
              <IoIosBed className="feature-icon" /> Bedrooms: {bedrooms}
            </div>
            <div className="feature-item">
              <GiBathtub className="feature-icon" /> Bathrooms: {bathrooms}
            </div>
            <div className="feature-item">
              <LuUtensilsCrossed className="feature-icon" /> Kitchens: {kitchens}
            </div>
            <div className="feature-item">
              <span className="feature-icon">Type:</span> {type}
            </div>
            <div className="feature-item">
              <span className="feature-icon">Tenure:</span> {tenure}
            </div>
          </div>
          <div className="property-added">
            Listed on: {formatDate(added)}
          </div>
            <h3>Property Description</h3>
          <p>{fullDescription}</p>

        </div>
      </div>

      {/* Map Modal */}
      {isMapOpen && (
        <div className="map-modal">
          <div className="modal-content">
            <button className="btn btn-close" style={{ position:"fixed",top: "10px", right: "10px" }} onClick={() => setIsMapOpen(false)}>
              X
            </button>
            <Maps
              latitude={latitude}
              longitude={longitude}
              zoom={15}
              markerTitle={location}
              width="100%"
              height="800px"
            />
          </div>
        </div>
      )}

      {isFullScreen && (
        <div className="fullscreen-modal">
          <div className="fullscreen-content">
            <button className="arrow arrow-left" onClick={handlePreviousImage}>
              <IoIosArrowBack />
            </button>
            <img
              src={pictures[currentImageIndex]}
              alt="Fullscreen Property View"
            />
            <button className="arrow arrow-right" onClick={handleNextImage}>
              <IoIosArrowForward />
            </button>
            <button
            style={{ position: "fixed", top: "10px", right: "10px" }}
              className="btn btn-close"
              onClick={() => setIsFullScreen(false)}
            >X
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

PropertyDetails.propTypes = {
  properties: PropTypes.array.isRequired,
};

export default PropertyDetails;
