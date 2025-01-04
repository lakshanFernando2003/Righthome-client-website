import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";
import PropertyCard from "../PropertyCard/PropertyCard";
import Tabs from '../propertyDetails/Tabs';
import "./PropertyContainer.css";

const PropertyContainer = ({ properties, onAddToFavorites, onDragStart, onDrop }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const propertiesPerPage = 6; // cards per page
  const [initialRender, setInitialRender] = useState(true);
  const [selectedProperty, setSelectedProperty] = useState(null);
  const navigate = useNavigate();

  const totalPages = Math.ceil(properties.length / propertiesPerPage); // calculate total pages

  // handle pagination
  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  // Life cycle console logs
  useEffect(() => {
    if (initialRender) {
      console.group("PropertyContainer Mounted");
      console.log("Initial Properties:", properties.map((p) => p.name));
      console.groupEnd();
      setInitialRender(false);
    }

    return () => {
      if (!initialRender) {
        console.group("PropertyContainer Unmounted");
        console.log("Unmounted with properties:", properties.map((prop) => prop.name));
        console.groupEnd();
      }
    };
  }, [properties, initialRender]);

  useEffect(() => {
    if (!initialRender) {
      console.group("PropertyContainer Updated");
      console.log("Updated Properties list:", properties.map((p) => p.name));
      console.groupEnd();
    }
  }, [properties, initialRender]);

  // handle property view button
  const handleViewDetails = (property) => {
    navigate(`/details/${property}`);
  };

  // handle to open the tab when clicked on the image
  const handleImageClick = (property) => {
    setSelectedProperty(property);
  };

  // handle to close the tab when clicked on the close icon
  const handleCloseTabs = () => {
    setSelectedProperty(null);
  };

  // render cards according to cards per page
  const startIndex = (currentPage - 1) * propertiesPerPage;
  const displayedProperties = properties.slice(startIndex, startIndex + propertiesPerPage);

  return (
    <div className="property-container" onDrop={onDrop} onDragOver={(e) => e.preventDefault()}>
      <h2 className="property-container-title">Available Properties</h2>
      {properties.length === 0 ? (
        <p className="no-properties">No properties available based on your filters.</p>
      ) : (
        <div className="property-grid">
          {displayedProperties.map((property) => (
            <PropertyCard
              key={property.id}
              property={property}
              onAddToFavorites={() => onAddToFavorites(property.id)}
              onDragStart={(e) => onDragStart(e, property.id)}
              onViewDetails={() => handleViewDetails(property.id)}
              onImageClick={() => handleImageClick(property)}
            />
          ))}
        </div>
      )}

      {selectedProperty && (
        <Tabs
          property={selectedProperty}
          onClose={handleCloseTabs}
        />
      )}

      {totalPages > 1 && (
        <div className="pagination-controls">
          <button
            className="pagination-btn"
            onClick={() => handlePageChange(1)}
            disabled={currentPage === 1}
          >
            &laquo;
          </button>
          <button
            className="pagination-btn"
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
          >
            &lsaquo;
          </button>
          {Array.from({ length: totalPages }, (_, index) => (
            <button
              key={index + 1}
              className={`pagination-btn ${currentPage === index + 1 ? "active" : ""}`}
              onClick={() => handlePageChange(index + 1)}
            >
              {index + 1}
            </button>
          ))}
          <button
            className="pagination-btn"
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
          >
            &rsaquo;
          </button>
          <button
            className="pagination-btn"
            onClick={() => handlePageChange(totalPages)}
            disabled={currentPage === totalPages}
          >
            &raquo;
          </button>
        </div>
      )}
    </div>
  );
};

PropertyContainer.propTypes = {
  properties: PropTypes.array.isRequired,
  onAddToFavorites: PropTypes.func.isRequired,
  onDragStart: PropTypes.func.isRequired,
  onDrop: PropTypes.func.isRequired,
};

export default PropertyContainer;
