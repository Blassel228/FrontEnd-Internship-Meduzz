import React, { ReactNode } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import {getItem} from "../Utils/localStorage";

const checkAuth = (): boolean => {
  return Boolean(getItem('authToken'));
};

interface PrivateRouteProps {
  children: ReactNode;
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({ children }) => {
  const location = useLocation();
  const isAuthenticated = checkAuth();

  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} />;
  }

  return <>{children}</>;
};

export default PrivateRoute;
