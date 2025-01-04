# 🏠 Right Client - Real Estate Property Search

A modern real estate property search platform built with React, featuring advanced filtering, drag-and-drop favorites, and responsive design.

## 📋 Table of Contents
- [Features](#features)
- [Installation](#installation)
- [Usage](#usage)
- [File Structure](#file-structure)
- [Dependencies](#dependencies)
- [Configuration](#configuration)
- [Contributing](#contributing)
- [License](#license)

## ✨ Features
- **Advanced Property Search**
  - Filter by price, bedrooms, location
  - Real-time search results
  - Custom range sliders
- **Property Management**
  - Drag-and-drop favorites
  - Property details view
  - Save preferences locally
- **Responsive Design**
  - Mobile-friendly interface
  - Adaptive layout
  - Touch-friendly interactions

## 🚀 Installation

### Prerequisites
- Bun runtime (v1.0.0 or higher)
- Node.js (v14.0.0 or higher)
- npm (v6.0.0 or higher)

### Steps
```bash
# Clone the repository
git clone https://github.com/yourusername/right-client-website.git

# Navigate to project directory
cd right-client-website

# Install dependencies
npm install
bun install

# Start development server
npm run dev
bun dev
```

## 💡 Usage

1. **Search Properties**
   - Use the search bar for quick searches
   - Click "Advanced Search" for detailed filters
   - Apply multiple filters simultaneously

2. **Manage Favorites**
   - Drag properties to favorites section
   - Remove from favorites with one click
   - Clear all favorites at once

3. **View Property Details**
   - Click on any property card
   - View full property information
   - Access contact details

## 📁 File Structure
```
src/
├── components/
│   ├── SearchBar/          # Search functionality
│   ├── AdvancedSearch/     # Advanced filtering
│   ├── PropertyCard/       # Property display cards
│   ├── Favorites/          # Favorites management
│   ├── PropertyDetails/    # Detailed property view
│   └── Footer/            # Site footer
├── assets/
│   └── images/            # Image resources
├── data/
│   └── properties.json    # Property data
└── App.js                 # Main application
```

## 📚 Dependencies

### Core
```bash
# Create React App with Bun
bun create vite@latest right-client-website -- --template react

# Core dependencies
bun add react-router-dom    # For routing
bun add prop-types         # For type checking
```

### UI and Styling
```bash
# UI Components and Icons
bun add react-icons        # For social media and other icons
bun add rc-slider          # For price range slider
bun add @mui/material      # For material UI components
bun add @emotion/react     # Peer dependency for MUI
bun add @emotion/styled    # Peer dependency for MUI
bun add react-zoom-pan-pinch # For image zoom and pan functionality
bun add @react-google-maps/api # For Google Maps integration
bun add react-loading-skeleton # For content loading states
bun add react-toastify    # For toast notifications

# Styling
bun add sass              # For SCSS support
bun add styled-components # For component-level styling
```

### Animation and Interaction
```bash
# Animation Libraries
bun add framer-motion     # For smooth animations
bun add react-transition-group  # For component transitions
bun add react-spring      # For physics-based animations

# Drag and Drop
bun add react-beautiful-dnd    # For drag and drop functionality
bun add @dnd-kit/core     # Alternative DnD system
```

### Form Handling
```bash
# Form Management
bun add formik            # For form handling
bun add yup               # For form validation
```

### Development Tools
```bash
# Development Dependencies
bun add -d eslint         # For code linting
bun add -d prettier       # For code formatting
bun add -d vite           # Build tool
```

### Optional Features
```bash
# Additional Functionality
bun add react-query       # For data fetching
bun add axios            # For HTTP requests
bun add date-fns         # For date formatting
```

## 📦 Version Information
```json
{
  "dependencies": {
    "@emotion/react": "^11.11.1",
    "@emotion/styled": "^11.11.0",
    "@mui/material": "^5.14.13",
    "axios": "^1.5.1",
    "date-fns": "^2.30.0",
    "formik": "^2.4.5",
    "framer-motion": "^10.16.4",
    "prop-types": "^15.8.1",
    "rc-slider": "^10.3.0",
    "react": "^18.2.0",
    "react-beautiful-dnd": "^13.1.1",
    "react-dom": "^18.2.0",
    "react-icons": "^4.11.0",
    "react-query": "^3.39.3",
    "react-router-dom": "^6.16.0",
    "react-transition-group": "^4.4.5",
    "react-zoom-pan-pinch": "^3.1.0",
    "yup": "^1.3.2",
    "@react-google-maps/api": "^2.19.2",
    "react-loading-skeleton": "^3.3.1",
    "react-spring": "^9.7.3",
    "react-toastify": "^9.1.3",
    "styled-components": "^6.0.8",
    "@dnd-kit/core": "^6.0.8"
  },
  "devDependencies": {
    "eslint": "^8.51.0",
    "prettier": "^3.0.3",
    "vite": "^4.4.11"
  }
}
```

## ⚙️ Configuration

### Environment Variables
Create a `.env` file in the root directory:
```env
VITE_APP_TITLE=Right Client
VITE_API_URL=your_api_url_here
```

### Performance Benefits with Bun
- Faster installation times
- Improved development server performance
- Better dependency management
- Native TypeScript support
- Built-in testing capabilities

### Local Storage
The application uses local storage for:
- User preferences
- Favorite properties
- Search filters

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
```bash
git checkout -b feature/NewFeature
```
3. Commit changes
```bash
git commit -m 'Add NewFeature'
```
4. Push to branch
```bash
git push origin feature/NewFeature
```
5. Test locally
```bash
bun test        # Run tests
bun dev         # Start development server
```

## 📄 License

This project is licensed under the MIT License -  for personal use only for the project owner - lakshan.

## 🙏 Acknowledgments

- React Icons for the icon library
- Material-UI for UI components
- All contributors who participated in this project

---
Developed with ❤️ by Lakshan
