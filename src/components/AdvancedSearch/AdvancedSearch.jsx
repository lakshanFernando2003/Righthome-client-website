import React, { useState, useEffect } from "react";
import "./AdvancedSearch.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Slider from "rc-slider";
import "rc-slider/assets/index.css";
import { IoClose } from "react-icons/io5";

const AdvancedSearch = ({ filters, onApplyFilters, onClearFilters, toggleFilterVisibility }) => {
  const [localFilters, setLocalFilters] = useState({
    ...filters,
    minPrice: filters.minPrice || 800,
    maxPrice: filters.maxPrice || 5000000,
  });

  useEffect(() => {
    setLocalFilters({
      ...filters,
      minPrice: filters.minPrice || 800,
      maxPrice: filters.maxPrice || 5000000,
    });
  }, [filters]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setLocalFilters({ ...localFilters, [name]: value });
  };

  const handlePriceChange = ([min, max]) => {
    setLocalFilters({ ...localFilters, minPrice: min, maxPrice: max });
  };

  const handleApply = () => {
    if (typeof onApplyFilters === "function") {
      onApplyFilters(localFilters);
    } else {
      console.error("onApplyFilters is not a function");
    }
    alert("Filters successfully applied!");
  };

  const handleClear = () => {
    const clearedFilters = {
      type: "",
      tenure: "",
      minPrice: 800,
      maxPrice: 5000000,
      bedrooms: "",
      availability: "",
      location: "",
      dateStart: "",
      dateEnd: "",
    };
    setLocalFilters(clearedFilters);
    if (typeof onClearFilters === "function") {
      onClearFilters();
    } else {
      console.error("onClearFilters is not a function");
    }
  };

  return (
    <div className="advanced-search-container">
      <div className="advanced-search-header">
        <h3>Advanced Filters</h3>
        <IoClose
          className="close-icon"
          onClick={toggleFilterVisibility}
          style={{ cursor: "pointer" }}
        />
      </div>
      <div className="form-grid">
        <div className="form-group">
          <label htmlFor="type">Property Type</label>
          <select
            id="type"
            name="type"
            value={localFilters.type}
            onChange={handleInputChange}
            className="form-control"
          >
            <option value="">All</option>
            <option value="House">House</option>
            <option value="Apartment">Apartment</option>
            <option value="Villa">Villa</option>
            <option value="Cottage">Cottage</option>
            <option value="Penthouse">Penthouse</option>
            <option value="Studio">Studio</option>
            <option value="Bungalow">Bungalow</option>
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="tenure">Tenure</label>
          <select
            id="tenure"
            name="tenure"
            value={localFilters.tenure}
            onChange={handleInputChange}
            className="form-control"
          >
            <option value="">All</option>
            <option value="Freehold">Freehold</option>
            <option value="Leasehold">Leasehold</option>
          </select>
        </div>

        <div className="form-group">
          <label>Price Range</label>
          <div className="price-range">
            <Slider
              range
              min={800}
              max={5000000}
              step={1000}
              value={[localFilters.minPrice, localFilters.maxPrice]}
              onChange={handlePriceChange}
              className="dual-slider"
            />
            <p className="price-display">
              {localFilters.minPrice} € - {localFilters.maxPrice} €
            </p>
          </div>
        </div>

        <div className="form-group">
          <label htmlFor="dateStart">Date Listed</label>
          <input
            type="date"
            id="dateStart"
            name="dateStart"
            value={localFilters.dateStart}
            onChange={handleInputChange}
            className="form-control"
          />
          <input
            type="date"
            id="dateEnd"
            name="dateEnd"
            value={localFilters.dateEnd}
            onChange={handleInputChange}
            className="form-control"
          />
        </div>

        <div className="form-group">
          <label htmlFor="bedrooms">Bedrooms</label>
          <input
            type="number"
            id="bedrooms"
            name="bedrooms"
            value={localFilters.bedrooms}
            onChange={handleInputChange}
            className="form-control"
          />
        </div>

        <div className="form-group">
          <label htmlFor="availability">Availability</label>
          <select
            id="availability"
            name="availability"
            value={localFilters.availability}
            onChange={handleInputChange}
            className="form-control"
          >
            <option value="">All</option>
            <option value="Available">Available</option>
            <option value="Sold">Sold</option>
            <option value="Rented">Rented</option>
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="location">Location</label>
          <input
            type="text"
            id="location"
            name="location"
            placeholder="Enter a location"
            value={localFilters.location}
            onChange={handleInputChange}
            className="form-control"
          />
        </div>
      </div>

      <div className="button-group">
        <button className="btn btn-primary" onClick={handleApply}>
          Apply Filters
        </button>
        <button className="btn btn-secondary" onClick={handleClear}>
          Clear Filters
        </button>
      </div>
    </div>
  );
};

export default AdvancedSearch;
