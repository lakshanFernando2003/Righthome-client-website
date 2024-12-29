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
    <div className="search-bar-container">
      {/* Logo Section */}
      <div className="company-logo">
        <h1 className="logo-part1">Lux</h1>
        <p className="logo-letter">i</p>
        <h1 className="logo-part2">Home</h1>
      </div>

      {/* Title Section */}
      <div className="title-group text-center">
        <h1>Find Your Dream Home</h1>
        <p>Explore houses and Apartments for renting or buying across your country.</p>
      </div>

      {/* Search and Filter Section */}
      <div className="search-bar">
        <div className="search-bar-input-group">
          <input
            type="text"
            placeholder="Search for Properties or Location"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={handleKeyDown}
            className="search-input"
          />
          <MdFilterAltOff className="clear-icon" onClick={onClearFilters} title="Clear Filters" style={{ cursor: "pointer", marginLeft: "10px" }} />
        </div>
        <div className="filter-buttons">
          <button className="btn btn-search" onClick={handleSearch}>Search</button>
          <button className="btn btn-sale" onClick={() => handleTypeSearch("Sale")}>For Sale</button>
          <button className="btn btn-rent" onClick={() => handleTypeSearch("Rent")}>To Rent</button>
          <button className="btn btn-filter" onClick={toggleFilterVisibility}><RiFilter2Fill className="filter-icon" /> Filter</button>
        </div>
      </div>
    </div>
  );
};

export default SearchBar;
