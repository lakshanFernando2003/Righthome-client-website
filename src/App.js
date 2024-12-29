import React, { useState } from "react";
import SearchBar from "./components/SearchBar/SearchBar";
import AdvancedSearch from "./components/AdvancedSearch/AdvancedSearch";
import PropertyContainer from "./components/PropertyContainer/PropertyContainer";
import Favorites from "./components/Favorites/Favorites";
import propertiesData from "./data/properties.json";
import "./App.css";

const App = () => {
  const [isFilterVisible, setIsFilterVisible] = useState(false);
  const [filters, setFilters] = useState({
    type: "",
    tenure: "",
    minPrice: 800,
    maxPrice: 5000000,
    bedrooms: "",
    availability: "",
    location: "",
    dateStart: "",
    dateEnd: "",
  });
  const [properties, setProperties] = useState(propertiesData.properties);
  const [favorites, setFavorites] = useState([]);

  const toggleFilterVisibility = () => {
    setIsFilterVisible((prev) => !prev);
  };

  const handleSearch = (searchParams) => {
    const combinedParams = { ...filters, ...searchParams };
    const filteredProperties = propertiesData.properties.filter((property) => {
      return (
        (!combinedParams.query ||
          property.location.toLowerCase().includes(combinedParams.query.toLowerCase()) ||
          property.description.toLowerCase().includes(combinedParams.query.toLowerCase())) &&
        (!combinedParams.cardType || property.cardType.toLowerCase() === combinedParams.cardType.toLowerCase()) &&
        (!combinedParams.type || combinedParams.type === "" || property.type.toLowerCase() === combinedParams.type.toLowerCase()) &&
        (!combinedParams.tenure || combinedParams.tenure === "" || property.tenure.toLowerCase() === combinedParams.tenure.toLowerCase()) &&
        (!combinedParams.minPrice || property.price >= combinedParams.minPrice) &&
        (!combinedParams.maxPrice || property.price <= combinedParams.maxPrice) &&
        (!combinedParams.bedrooms || property.bedrooms === parseInt(combinedParams.bedrooms)) &&
        (!combinedParams.availability || combinedParams.availability === "" || property.availability.toLowerCase() === combinedParams.availability.toLowerCase()) &&
        (!combinedParams.location || property.location.toLowerCase().includes(combinedParams.location.toLowerCase())) &&
        (!combinedParams.dateStart ||
          new Date(property.added.year, property.added.month - 1, property.added.day) >= new Date(combinedParams.dateStart)) &&
        (!combinedParams.dateEnd ||
          new Date(property.added.year, property.added.month - 1, property.added.day) <= new Date(combinedParams.dateEnd))
      );
    });
    setProperties(filteredProperties);
  };

  const handleApplyFilters = (appliedFilters) => {
    setFilters(appliedFilters);
    handleSearch(appliedFilters);
    setIsFilterVisible(false);
  };

  const handleClearFilters = () => {
    setFilters({
      type: "",
      tenure: "",
      minPrice: 800,
      maxPrice: 5000000,
      bedrooms: "",
      availability: "",
      location: "",
      dateStart: "",
      dateEnd: "",
    });
    setProperties(propertiesData.properties);
    alert("Filters cleared successfully!");
  };

  const handleCardTypeFilter = (cardType) => {
    const filteredProperties = propertiesData.properties.filter((property) => {
      return (
        property.cardType.toLowerCase() === cardType.toLowerCase() &&
        (!filters.type || filters.type === "" || property.type.toLowerCase() === filters.type.toLowerCase()) &&
        (!filters.minPrice || property.price >= filters.minPrice) &&
        (!filters.maxPrice || property.price <= filters.maxPrice) &&
        (!filters.bedrooms || property.bedrooms === parseInt(filters.bedrooms)) &&
        (!filters.location || property.location.toLowerCase().includes(filters.location.toLowerCase())) &&
        (!filters.dateStart ||
          new Date(property.added.year, property.added.month - 1, property.added.day) >= new Date(filters.dateStart)) &&
        (!filters.dateEnd ||
          new Date(property.added.year, property.added.month - 1, property.added.day) <= new Date(filters.dateEnd))
      );
    });
    setProperties(filteredProperties);
  };

  const handlePropertyTypeFilter = (type) => {
    const filteredProperties = propertiesData.properties.filter((property) => {
      return (
        property.type.toLowerCase() === type.toLowerCase() &&
        (!filters.cardType || filters.cardType === "" || property.cardType.toLowerCase() === filters.cardType.toLowerCase()) &&
        (!filters.minPrice || property.price >= filters.minPrice) &&
        (!filters.maxPrice || property.price <= filters.maxPrice) &&
        (!filters.bedrooms || property.bedrooms === parseInt(filters.bedrooms)) &&
        (!filters.location || property.location.toLowerCase().includes(filters.location.toLowerCase())) &&
        (!filters.dateStart ||
          new Date(property.added.year, property.added.month - 1, property.added.day) >= new Date(filters.dateStart)) &&
        (!filters.dateEnd ||
          new Date(property.added.year, property.added.month - 1, property.added.day) <= new Date(filters.dateEnd))
      );
    });
    setProperties(filteredProperties);
  };

  const handleAddToFavorites = (propertyId) => {
    const selectedProperty = properties.find((property) => property.id === propertyId);
    if (selectedProperty) {
      setFavorites([...favorites, selectedProperty]);
      setProperties(properties.filter((property) => property.id !== propertyId));
    }
  };

  const handleRemoveFavorite = (propertyId) => {
    const removedProperty = favorites.find((property) => property.id === propertyId);
    if (removedProperty) {
      setProperties([...properties, removedProperty]);
      setFavorites(favorites.filter((property) => property.id !== propertyId));
    }
  };

  const handleClearFavorites = () => {
    setProperties([...properties, ...favorites]);
    setFavorites([]);
  };

  const handleDropToFavorites = (event) => {
    const propertyId = event.dataTransfer.getData("text");
    if (propertyId) {
      handleAddToFavorites(propertyId);
    }
  };

  const handleDropToProperties = (event) => {
    const propertyId = event.dataTransfer.getData("text");
    if (propertyId) {
      handleRemoveFavorite(propertyId);
    }
  };

  return (
    <div style={{ position: "relative" }} className="app-container">
      <SearchBar
        onSearch={handleSearch}
        toggleFilterVisibility={toggleFilterVisibility}
        onClearFilters={handleClearFilters}
        filters={filters}
        onCardTypeFilter={handleCardTypeFilter}
        onPropertyTypeFilter={handlePropertyTypeFilter}
      />
      {isFilterVisible && (
        <AdvancedSearch
          filters={filters}
          onApplyFilters={handleApplyFilters}
          onClearFilters={handleClearFilters}
          toggleFilterVisibility={toggleFilterVisibility}
        />
      )}
      <div className="main-content">
        <PropertyContainer
          properties={properties}
          onAddToFavorites={handleAddToFavorites}
          onDragStart={(event, propertyId) => event.dataTransfer.setData("text", propertyId)}
          onDrop={handleDropToProperties}
        />
        <Favorites
          favorites={favorites}
          onRemoveFavorite={handleRemoveFavorite}
          onClearFavorites={handleClearFavorites}
          onDragOver={(event) => event.preventDefault()}
          onDrop={handleDropToFavorites}
        />
      </div>
    </div>
  );
};

export default App;
