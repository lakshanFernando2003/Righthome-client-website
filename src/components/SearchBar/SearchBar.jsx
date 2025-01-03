import React, { useState } from "react";
import "./SearchBar.css";
import { RiFilter2Fill } from "react-icons/ri";
import { MdFilterAltOff } from "react-icons/md";

const SearchBar = ({ onSearch, toggleFilterVisibility, onClearFilters, filters, onCardTypeFilter }) => {
  const [query, setQuery] = useState("");

  const handleSearch = () => {
    onSearch({ query });
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  const handleTypeSearch = (cardType) => {
    onCardTypeFilter(cardType);
  };

  return (
    <div className="sb-container">
      {/* Logo Section */}
      <div className="logo">
        <h1 className="logo-part1">Lux</h1>
        <p className="logo-mid">i</p>
        <h1 className="logo-part2">Home</h1>
      </div>

      {/* Title Section */}
      <div className="title">
        <h1>Find Your Dream Home</h1>
        <p>Explore houses and Apartments for renting or buying across your country.</p>
      </div>

      {/* Search and Filter Section */}
      <div className="search-section">
        <div className="input-group">
          <input
            type="text"
            placeholder="Search for Properties or Location"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={handleKeyDown}
            className="input"
            id="search-bar"
          />
          <MdFilterAltOff
            className="clear-icon"
            onClick={onClearFilters}
            title="Clear Filters"
          />
        </div>

        <div className="btn-group">
          <button className="search-btn" onClick={handleSearch}>Search</button>
          <button className="sale-btn" onClick={() => handleTypeSearch("Sale")}>For Sale</button>
          <button className="rent-btn" onClick={() => handleTypeSearch("Rent")}>To Rent</button>
          <button className="filter-btn" onClick={toggleFilterVisibility}>
            <RiFilter2Fill className="filter-icon" /> Filter
          </button>
        </div>
      </div>
    </div>
  );
};

export default SearchBar;
