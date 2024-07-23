import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import "./App.css";
import ForgotPassword from "./components/auth/forgotPassword";
import Login from "./components/auth/login";
import ProtectedRoute from "./components/auth/ProtectedRoute";
import PublicRoute from "./components/auth/PublicRoute";
import Signup from "./components/auth/signup";
import { AuthProvider } from "./context/authProvider";
import Dashboard from "./pages/dashboard/Dashboard";
import Details from "./pages/detail/Details";

const App: React.FC = () => {
  return (
    <AuthProvider>
      <Routes>
        <Route
          path="/login"
          element={
            <PublicRoute restricted={true}>
              <Login />
            </PublicRoute>
          }
        />
        <Route
          path="/signup"
          element={
            <PublicRoute restricted={true}>
              <Signup />
            </PublicRoute>
          }
        />
        <Route
          path="/forgot-password"
          element={
            <PublicRoute restricted={true}>
              <ForgotPassword />
            </PublicRoute>
          }
        />
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/detail"
          element={
            <PublicRoute>
              <Details />
            </PublicRoute>
          }
        />
        <Route path="/" element={<Navigate to="/login" />} />
      </Routes>
    </AuthProvider>
  );
};

export default App;
