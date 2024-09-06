import React, { StrictMode } from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter as Router } from "react-router-dom";
import ThemeProvider from "./utils/ThemeContext";
import "./i18";
// import App from "./App";
import("./App").then((mod) => {
  const App = mod.default;
  ReactDOM.createRoot(document.getElementById("root")).render(
    <StrictMode>
      <Router>
        <ThemeProvider>
          <App />
        </ThemeProvider>
      </Router>
    </StrictMode>
  );
});
