import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import SearchBar from "./components/SearchBar/SearchBar";
import AdvancedSearch from "./components/AdvancedSearch/AdvancedSearch";
import PropertyContainer from "./components/PropertyContainer/PropertyContainer";
import PropertyDetails from "./components/propertyDetails/PropertyDetails";
import Favorites from "./components/Favorites/Favorites";
import propertiesData from "./data/properties.json";
import Footer from "./components/Footer/Footer";
import "./App.css";

const App = () => {
  const [isFilterVisible, setIsFilterVisible] = useState(false);
  const [filters, setFilters] = useState(() => {
    const savedFilters = localStorage.getItem("filters");
    return savedFilters ? JSON.parse(savedFilters) : {
      type: "",
      tenure: "",
      minPrice: 800,
      maxPrice: 5000000,
      minBedrooms: 1,
      maxBedrooms: 10,
      postalCode: "",
      dateStart: "",
      dateEnd: "",
    };
  });

  const [properties, setProperties] = useState(() => {
    const savedFavorites = localStorage.getItem("favorites");
    return savedFavorites ? propertiesData.properties.filter(
      (prop) => !JSON.parse(savedFavorites).find((fav) => fav.id === prop.id)
    ) : propertiesData.properties;
  });

  const [favorites, setFavorites] = useState(() => {
    const savedFavorites = localStorage.getItem("favorites");
    return savedFavorites ? JSON.parse(savedFavorites) : [];
  });

  useEffect(() => {
    console.group("App Initialized");
    console.log("Properties loaded:", properties.map((p) => p.name));
    console.log("Favorites loaded:", favorites.map((f) => f.name));
    console.log("Filters loaded:", filters);
    console.groupEnd();
  }, [favorites, properties, filters]);

  useEffect(() => {
    localStorage.setItem("filters", JSON.stringify(filters));
    localStorage.setItem("properties", JSON.stringify(properties));
    localStorage.setItem("favorites", JSON.stringify(favorites));
  }, [filters, properties, favorites]);

  const toggleFilterVisibility = () => {
    setIsFilterVisible((prev) => !prev);
  };

  const handleSearch = (searchParams) => {
    const combinedParams = { ...filters, ...searchParams };
    const filteredProperties = propertiesData.properties.filter((property) => {
      const propertyDate = new Date(property.added.year, property.added.month - 1, property.added.day);
      return (
        (!combinedParams.query ||
          property.location.toLowerCase().includes(combinedParams.query.toLowerCase()) ||
          property.description.toLowerCase().includes(combinedParams.query.toLowerCase())) &&
        (!combinedParams.type || property.type?.toLowerCase() === combinedParams.type.toLowerCase()) &&
        (!combinedParams.tenure || property.tenure?.toLowerCase() === combinedParams.tenure.toLowerCase()) &&
        (!combinedParams.minPrice || property.price >= combinedParams.minPrice) &&
        (!combinedParams.maxPrice || property.price <= combinedParams.maxPrice) &&
        (!combinedParams.minBedrooms || property.bedrooms >= combinedParams.minBedrooms) &&
        (!combinedParams.maxBedrooms || property.bedrooms <= combinedParams.maxBedrooms) &&
        (!combinedParams.postalCode || property.postalCode?.toLowerCase().includes(combinedParams.postalCode.toLowerCase()) ||
          property.location?.toLowerCase().includes(combinedParams.postalCode.toLowerCase())) &&
        (!combinedParams.dateStart || propertyDate >= new Date(combinedParams.dateStart)) &&
        (!combinedParams.dateEnd || propertyDate <= new Date(combinedParams.dateEnd))
      );
    });
    setProperties(filteredProperties.filter((property) => !favorites.some((fav) => fav.id === property.id)));
  };

  const handleApplyFilters = (appliedFilters) => {
    setFilters(appliedFilters);
    handleSearch(appliedFilters);
    setIsFilterVisible(false);
    console.log("Filters Applied:", appliedFilters);
  };

  const handleClearFilters = () => {
    setFilters({
      type: "",
      tenure: "",
      minPrice: 800,
      maxPrice: 5000000,
      minBedrooms: 1,
      maxBedrooms: 10,
      postalCode: "",
      dateStart: "",
      dateEnd: "",
    });
    setProperties(propertiesData.properties);
    console.group("Filters Cleared");
    console.groupEnd();
    alert("Filters cleared successfully!");
  };

  const handleCardTypeFilter = (cardType) => {
    const filteredProperties = propertiesData.properties.filter((property) => {
      return (
        property.cardType?.toLowerCase() === cardType.toLowerCase() &&
        (!filters.type || filters.type === "" || property.type.toLowerCase() === filters.type.toLowerCase()) &&
        (!filters.minPrice || property.price >= filters.minPrice) &&
        (!filters.maxPrice || property.price <= filters.maxPrice) &&
        (!filters.minBedrooms || property.bedrooms >= filters.minBedrooms) &&
        (!filters.maxBedrooms || property.bedrooms <= filters.maxBedrooms) &&
        (!filters.postalCode || property.postalCode?.toLowerCase().includes(filters.postalCode.toLowerCase()) ||
          property.location?.toLowerCase().includes(filters.postalCode.toLowerCase())) &&
        (!filters.dateStart || new Date(property.added.year, property.added.month - 1, property.added.day) >= new Date(filters.dateStart)) &&
        (!filters.dateEnd || new Date(property.added.year, property.added.month - 1, property.added.day) <= new Date(filters.dateEnd))
      );
    });
    setProperties(filteredProperties.filter((property) => !favorites.some((fav) => fav.id === property.id)));
  };

  const handlePropertyTypeFilter = (type) => {
    const filteredProperties = propertiesData.properties.filter((property) => {
      return (
        property.type?.toLowerCase() === type.toLowerCase() &&
        (!filters.cardType || filters.cardType === "" || property.cardType?.toLowerCase() === filters.cardType.toLowerCase()) &&
        (!filters.minPrice || property.price >= filters.minPrice) &&
        (!filters.maxPrice || property.price <= filters.maxPrice) &&
        (!filters.minBedrooms || property.bedrooms >= filters.minBedrooms) &&
        (!filters.maxBedrooms || property.bedrooms <= filters.maxBedrooms) &&
        (!filters.postalCode || property.postalCode?.toLowerCase().includes(filters.postalCode.toLowerCase()) ||
          property.location?.toLowerCase().includes(filters.postalCode.toLowerCase())) &&
        (!filters.dateStart || new Date(property.added.year, property.added.month - 1, property.added.day) >= new Date(filters.dateStart)) &&
        (!filters.dateEnd || new Date(property.added.year, property.added.month - 1, property.added.day) <= new Date(filters.dateEnd))
      );
    });
    setProperties(filteredProperties.filter((property) => !favorites.some((fav) => fav.id === property.id)));
  };

  const handleAddToFavorites = (propertyId) => {
    const selectedProperty = properties.find((property) => property.id === propertyId);
    if (selectedProperty) {
      setFavorites((prevFavorites) => [...prevFavorites, selectedProperty]);
      setProperties((prevProperties) => prevProperties.filter((property) => property.id !== propertyId));
      console.group("On Adding to Favorites");
      console.log("Property Added to Favorites:", selectedProperty.name);
      console.log("property card unmounted :", selectedProperty.name);

      console.groupEnd();
    }
  };

  const handleRemoveFavorite = (propertyId) => {
    const removedProperty = favorites.find((property) => property.id === propertyId);
    if (removedProperty) {
      setFavorites((prevFavorites) => prevFavorites.filter((property) => property.id !== propertyId));
      setProperties((prevProperties) => [...prevProperties, removedProperty]);
      console.group("On Removing from Favorites");
      console.log("Property Removed from Favorites:", removedProperty.name);
      console.log("property card mounted :", removedProperty.name);

      console.groupEnd();
    }
  };

  const handleClearFavorites = () => {
    setProperties((prevProperties) => [...prevProperties, ...favorites]);
    setFavorites([]);
    console.group("On Clearing Favorites");
    console.log("Favorites Cleared All");
    console.groupEnd();
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
    <Router>
      <Routes>
          <Route
            path="/"
            element={
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

        <div className="main-content ">
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
        <Footer />
      </div>
    }
    />
    <Route
      path="/details/:id"
      element={<PropertyDetails properties={properties} />}
    />
  </Routes>
    </Router>
  );
};

export default App;
