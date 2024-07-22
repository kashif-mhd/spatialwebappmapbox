// src/components/PublicRoute.tsx
import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';

interface PublicRouteProps {
  restricted?: boolean;
  children?: React.ReactNode;
}

const PublicRoute: React.FC<PublicRouteProps> = ({ restricted = false, children }) => {
  const { user } = useAuth();

  if (user && restricted) {
    return <Navigate to="/dashboard" />;
  }

  return children ? <>{children}</> : <Outlet />;
};

export default PublicRoute;
