import React from "react";
import { createRoot } from "react-dom/client";

import { BrowserRouter as Router } from "react-router-dom";
import ThemeProvider from "./utils/ThemeContext";
import App from "./App";
import "./i18";
import { HelmetProvider } from "react-helmet-async";
import "./index.css";
const root = document.getElementById("root");
createRoot(root).render(
  <HelmetProvider>
    <Router>
      <ThemeProvider>
        <App />
      </ThemeProvider>
    </Router>
  </HelmetProvider>
);
