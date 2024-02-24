import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import LoginPage from "./pages/login";
const App = () => {
  return (
    <div>
      <Routes>
        {/* Define all your routes inside this single Routes component */}
        <Route path="/login" element={<LoginPage />} />
        <Route path="/dashboard" element={<Sidebar />} />
        {/* Redirect from root path to either login or dashboard based on a condition (e.g., authentication status) */}
        {/* This example always redirects to /login for simplicity */}
        <Route path="/" element={<Navigate to="/login" replace />} />
      </Routes>
    </div>
  );
};

export default App;
