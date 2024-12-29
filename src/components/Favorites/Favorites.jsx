import React from "react";
import "./Favorites.css";

const Favorites = ({ favorites, onRemoveFavorite, onClearFavorites, onDrop }) => {
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
        <button
          className="btn btn-clear"
          onClick={onClearFavorites}
        >
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

export default Favorites;
