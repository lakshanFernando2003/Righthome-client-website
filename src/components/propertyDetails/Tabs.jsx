import React, { useState } from 'react';
import { FaHome, FaMap, FaImage, FaSearchPlus, FaSearchMinus, FaRedo } from 'react-icons/fa';
import Maps from '../Map/Maps';
import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";
import './Tabs.css';

const Tabs = ({ property, onClose }) => {
  const [activeTab, setActiveTab] = useState('description');

  const renderPropertyDetails = (property) => {
    return (
      <div className="property-details-grid">
        <div className="detail-section">
          <h4>Basic Information</h4>
          <div className="detail-item">
            <span>Type:</span>
            <span>{property.type}</span>
          </div>
          <div className="detail-item">
            <span>Price:</span>
            <span>€{property.price.toLocaleString()}</span>
          </div>
          <div className="detail-item">
            <span>Tenure:</span>
            <span>{property.tenure}</span>
          </div>
        </div>

        <div className="detail-section">
          <h4>Property Features</h4>
          <div className="detail-item">
            <span>Bedrooms:</span>
            <span>{property.bedrooms}</span>
          </div>
          <div className="detail-item">
            <span>Bathrooms:</span>
            <span>{property.bathrooms}</span>
          </div>
          <div className="detail-item">
            <span>Kitchens:</span>
            <span>{property.kitchens}</span>
          </div>
        </div>

        <div className="detail-section full-width">
          <h4>Description</h4>
          <p className="long-description">{property.longDescription}</p>
          <p className="full-description">{property.fullDescription}</p>
        </div>

        <div className="detail-section">
          <h4>Location Details</h4>
          <div className="detail-item">
            <span>Address:</span>
            <span>{property.location}</span>
          </div>
          <div className="detail-item">
            <span>Postal Code:</span>
            <span>{property.postalcode}</span>
          </div>
        </div>
      </div>
    );
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case 'description':
        return (
          <div className="tab-content description">
            <h3>Property Details</h3>
            {renderPropertyDetails(property)}
          </div>
        );
      case 'floorplan':
        return (
          <div className="tab-content floorplan">
            <h3>Floor Plan</h3>
            <div className="floorplan-container">
              <TransformWrapper
                initialScale={0.8}
                minScale={0.3}
                maxScale={4}
                centerOnInit={true}
                limitToBounds={false}
                wheel={{ wheelEnabled: true }}
                pinch={{ pinchEnabled: true }}
                doubleClick={{ doubleClick: true }}
              >
                {({ zoomIn, zoomOut, resetTransform }) => (
                  <>
                    <TransformComponent
                      wrapperClass="transform-wrapper"
                      contentClass="floorplan-image-container"
                    >
                      <img
                        src={property.floorplan}
                        alt="Floor Plan"
                        style={{ minWidth: '800px', minHeight: '600px' }}
                      />
                    </TransformComponent>
                    <div className="zoom-controls">
                      <button className="zoom-button" onClick={() => zoomIn()}>
                        <FaSearchPlus size={20} />
                      </button>
                      <button className="zoom-button" onClick={() => zoomOut()}>
                        <FaSearchMinus size={20} />
                      </button>
                      <button className="zoom-button" onClick={() => resetTransform()}>
                        <FaRedo size={20} />
                      </button>
                    </div>
                  </>
                )}
              </TransformWrapper>
            </div>
          </div>
        );
      case 'location':
        return (
          <div className="tab-content location">
            <div className="map-container-full">
              <Maps
                latitude={property.latitude}
                longitude={property.longitude}
                markerTitle={property.name}
                zoom={15}
                width="100%"
                height="calc(100vh - 120px)"
              />
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="tabs-container">
      <div className="tabs-header">
        <div className="tab-buttons">
          <button
            className={`tab-button ${activeTab === 'description' ? 'active' : ''}`}
            onClick={() => setActiveTab('description')}
          >
            <FaHome /> Description
          </button>
          <button
            className={`tab-button ${activeTab === 'floorplan' ? 'active' : ''}`}
            onClick={() => setActiveTab('floorplan')}
          >
            <FaImage /> Floor Plan
          </button>
          <button
            className={`tab-button ${activeTab === 'location' ? 'active' : ''}`}
            onClick={() => setActiveTab('location')}
          >
            <FaMap /> Location
          </button>
        </div>
        <button className="close-button" onClick={onClose}>×</button>
      </div>
      <div className="tabs-content">
        {renderTabContent()}
      </div>
    </div>
  );
};

export default Tabs;
