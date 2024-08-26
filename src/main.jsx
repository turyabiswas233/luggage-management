import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter as Router } from "react-router-dom";
import ThemeProvider from "./utils/ThemeContext";
import("./App").then((mod) => {
  const App = mod.default;
  ReactDOM.createRoot(document.getElementById("root")).render(
    <Router>
      <ThemeProvider>
        <App />
      </ThemeProvider>
    </Router>
  );
});
