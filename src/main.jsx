import React, { StrictMode } from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter as Router } from "react-router-dom";
import ThemeProvider from "./utils/ThemeContext";
import App from "./App"; 
import { HelmetProvider } from "react-helmet-async";
import "./index.css";

import "./i18";
ReactDOM.createRoot(document.getElementById("root")).render(
  <StrictMode>
    <HelmetProvider>
    <Router>
      <ThemeProvider>
        <App />
      </ThemeProvider>
    </Router>
    </HelmetProvider>
  </StrictMode>
);
