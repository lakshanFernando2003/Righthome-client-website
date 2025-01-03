import React, { useEffect, useState  } from "react";
import PropTypes from "prop-types";
import "./Favorites.css";

const Favorites = ({ favorites, onRemoveFavorite, onClearFavorites, onDrop }) => {
  const [initialRender, setInitialRender] = useState(true); // Track initial render

  useEffect(() => {
    if (!initialRender) {
      console.group("Favorites Updated");
      console.log("Updated favorites list:", favorites.map((fav) => fav.name));
      console.groupEnd();
    } else {
      setInitialRender(false); // Skip logging for initial render
    }
  }, [favorites ,initialRender]);

  useEffect(() => {
    return () => {
      if (!initialRender) {
      console.group("Favorites Unmounted");
      console.log("Favorites list before unmount:", favorites.map((fav) => fav.name));
      console.groupEnd();
      };
    };
  }, [favorites,initialRender]);

  const handleDragStart = (event, propertyId) => {
    event.dataTransfer.setData("text", propertyId);
  };

  return (
    <div
      className="favorites-container"
      onDragOver={(event) => event.preventDefault()}
      onDrop={onDrop}
    >
      <div className="favorites-header">
        <h3 className="favorites-title">Favorites</h3>
        <button className="btn btn-clear" onClick={onClearFavorites}>
          Clear All
        </button>
      </div>
      {favorites.length === 0 ? (
        <p className="no-favorites">No favorite properties added yet.</p>
      ) : (
        <div className="favorites-list">
          {favorites.map((property) => (
            <div
              key={property.id}
              className="favorite-item"
              draggable
              onDragStart={(event) => handleDragStart(event, property.id)}
            >
              <img
                src={property.picture}
                alt={property.name}
                className="favorite-image"
              />
              <div className="favorite-details">
                <h4>{property.name}</h4>
                <p className="favorite-type">{property.type}</p>
                <p className="favorite-price">€ {property.price.toLocaleString()}</p>
                <p className="favorite-location">{property.location}</p>
              </div>
              <button
                className="btn btn-remove"
                onClick={() => onRemoveFavorite(property.id)}
              >
                Remove
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

Favorites.propTypes = {
  favorites: PropTypes.array.isRequired,
  onRemoveFavorite: PropTypes.func.isRequired,
  onClearFavorites: PropTypes.func.isRequired,
  onDrop: PropTypes.func.isRequired,
};

export default Favorites;
