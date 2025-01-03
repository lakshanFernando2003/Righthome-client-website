export const securityConfig = {
  // CSP Nonce - should be generated server-side
  nonce: process.env.REACT_APP_CSP_NONCE || '',

  // API Keys
  googleMapsKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY || 'AIzaSyAGW-7hz-HCQlgiYUFZ9YQDqcsAhKSIx9c',

  // Content Security Directives
  cspDirectives: {
    defaultSrc: ["'self'", "https://*.google.com", "https://*.googleapis.com"],
    imgSrc: ["'self'", "data:", "https:", "blob:"],
    scriptSrc: ["'self'", "https://*.googleapis.com", "'unsafe-inline'"],
    styleSrc: ["'self'", "https:", "'unsafe-inline'", "https://fonts.googleapis.com"],
    fontSrc: ["'self'", "https://fonts.gstatic.com"],
    connectSrc: ["'self'", "https://*.googleapis.com"],
    frameSrc: ["'self'", "https://*.google.com"],
  }
};
