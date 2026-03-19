import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { BrowserRouter as Router } from "react-router-dom"; // ⬅️ NEW IMPORT
// import { AuthProvider } from "./context/AuthContext.jsx"; // ⬅️ NEW IMPORT
ReactDOM.createRoot(document.getElementById("root")).render(

  <Router>


    <App />

  </Router>

);
