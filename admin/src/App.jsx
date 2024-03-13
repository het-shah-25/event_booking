import React from "react";
import { Routes, Route, Navigate, BrowserRouter } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import LoginPage from "./pages/login";
import Signup from "./pages/signup";
import Login from "./components/userlogin";
const App = () => {
  return (
    <>
      <Routes>
        <Route path="admin/login" element={<LoginPage />} />
        {/* <Route path="admin/signup" element={<Signup />} /> */}
        <Route path="/login" element={<Login></Login>}></Route>
      </Routes>
      <Sidebar />
    </>
  );
};

export default App;
