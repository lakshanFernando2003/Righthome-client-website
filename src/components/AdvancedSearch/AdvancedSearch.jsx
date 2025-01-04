import React, { useState, useEffect } from "react";
import "./AdvancedSearch.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Slider from "rc-slider";
import "rc-slider/assets/index.css";
import { IoClose } from "react-icons/io5";

const AdvancedSearch = ({ filters, onApplyFilters, onClearFilters, toggleFilterVisibility }) => { // functions are set to the parameters

  // filter default values
  const [localFilters, setLocalFilters] = useState({
    ...filters,
    minPrice: filters.minPrice || 800,
    maxPrice: filters.maxPrice || 2500000,
    minBedrooms: filters.minBedrooms || 1,
    maxBedrooms: filters.maxBedrooms || 10,
    postalCode: filters.postalCode || "",
    dateStart: filters.dateStart || "",
    dateEnd: filters.dateEnd || "",
  });

  useEffect(() => {
    setLocalFilters({
      ...filters,
      minPrice: filters.minPrice || 800,
      maxPrice: filters.maxPrice || 2500000,
      minBedrooms: filters.minBedrooms || 1,
      maxBedrooms: filters.maxBedrooms || 10,
      postalCode: filters.postalCode || "",
      dateStart: filters.dateStart || "",
      dateEnd: filters.dateEnd || "",
    });
  }, [filters]);

  // handle all inputs and set each filters respectively
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setLocalFilters({ ...localFilters, [name]: value });
  };

  const handlePriceChange = ([min, max]) => {
    setLocalFilters({ ...localFilters, minPrice: min, maxPrice: max });
  };

  const handleBedroomsChange = (field, value) => {
    setLocalFilters({ ...localFilters, [field]: parseInt(value, 10) || "" });
  };

  // update filters when user clicks apply
  const handleApply = () => {
    if (typeof onApplyFilters === "function") {
      onApplyFilters(localFilters);
      console.group("Filters Updated");
      console.log("Filters Applied:", filters);
      console.groupEnd();
    } else {
      console.error("onApplyFilters is not a function");
    }
    alert("Filters successfully applied!");
  };

  // update filters when user clicks reset
  const handleClear = () => {
    const clearedFilters = {
      type: "",
      tenure: "",
      minPrice: 800,
      maxPrice: 2500000,
      minBedrooms: 1,
      maxBedrooms: 10,
      postalCode: "",
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

  // advance search menu structure
  return (
    <div className="advanced-search-container ">
      <div className="filter-header d-flex justify-content-between align-items-center">
        <h3>Advanced Filters</h3>
        <IoClose className="close-icon" onClick={toggleFilterVisibility} /> {/* Toggle function close button */}
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
              min={0}
              max={2500000}
              step={200}
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
          <label htmlFor="minBedrooms">Bedrooms (Range)</label>
          <div className="bedrooms-range d-flex gap-2">
            <input
              type="number"
              id="minBedrooms"
              name="minBedrooms"
              placeholder="Min"
              value={localFilters.minBedrooms}
              onChange={(e) => handleBedroomsChange("minBedrooms", e.target.value)}
              className="form-control"
            />
            <input
              type="number"
              id="maxBedrooms"
              name="maxBedrooms"
              placeholder="Max"
              value={localFilters.maxBedrooms}
              onChange={(e) => handleBedroomsChange("maxBedrooms", e.target.value)}
              className="form-control"
            />
          </div>
        </div>

        <div className="form-group">
          <label htmlFor="postalCode">Postal Code / Location</label>
          <input
            type="text"
            id="postalCode"
            name="postalCode"
            placeholder="Enter postal code or location"
            value={localFilters.postalCode}
            onChange={handleInputChange}
            className="form-control"
          />
        </div>

        <div className="form-group">
          <label htmlFor="dateStart">Date Listed</label>
          <input
            type="date"
            id="dateStart"
            name="dateStart"
            value={localFilters.dateStart}
            onChange={handleInputChange}
            className="form-control mb-2"
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
      </div>
      <div className="filter-action">
        <button className="filter-apply-btn" onClick={handleApply}>
          Apply Filters
        </button>
        <button className="filter-clear-btn" onClick={handleClear}>
          Clear Filters
        </button>
      </div>
    </div>
  );
};

export default AdvancedSearch;
