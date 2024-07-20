import React from "react";
import { Route, Routes } from "react-router-dom";
import "./App.css";
import Dashboard from "./pages/dashboard/Dashboard";
import Login from "./components/auth/login";
import Signup from "./components/auth/signup";
import ForgotPassword from "./components/auth/forgotPassword";
import { AuthProvider } from "./context/authProvider";
import Details from "./pages/detail/Details";

const App: React.FC = () => {
  return (
    <AuthProvider>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/" element={<Dashboard />} />
        <Route path="/detail" element={<Details />} />
      </Routes>
    </AuthProvider>
  );
};

export default App;
