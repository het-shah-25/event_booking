import React from "react";
import { Routes, Route, Navigate, BrowserRouter } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import LoginPage from "./pages/login";
const App = () => {
  return (
    <>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/" element={<Navigate to="/login" replace />} />
      </Routes>
      <Sidebar path="/dashboard" />
    </>
  );
};

export default App;
