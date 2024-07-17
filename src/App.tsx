import React from "react";
import { Route, Routes } from "react-router-dom";
import "./App.css";
import ForgotPassword from "./components/auth/ForgotPassword";
import Login from "./components/auth/Login";
import Signup from "./components/auth/Signup";
import { AuthProvider } from "./context/AuthProvider";
import Dashboard from "./pages/dashboard/Dashboard";

const App: React.FC = () => {
  return (
    <AuthProvider>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/" element={<Dashboard />} />
      </Routes>
    </AuthProvider>
  );
};

export default App;
