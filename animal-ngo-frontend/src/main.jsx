import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './index.css';
import { AuthProvider } from './context/AuthContext.jsx'; // ⬅️ NEW IMPORT
import { BrowserRouter as Router } from'react-router-dom'; // ⬅️ NEW IMPORT
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Router> {/* ✅ Router first */}
      <AuthProvider> {/* ✅ Now AuthProvider can use useNavigate() */}
        <App />
      </AuthProvider>
    </Router>
  </React.StrictMode>
);