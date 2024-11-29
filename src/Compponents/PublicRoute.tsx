import React, { ReactNode} from 'react';
import { Navigate } from 'react-router-dom';
import {getItem} from "../Utils/localStorage";

interface PublicRouteProps {
  children: ReactNode;
}

const PublicRoute: React.FC<PublicRouteProps> = ({ children }) => {
  const isAuthenticated = Boolean(getItem('authToken'));

  return !isAuthenticated ? (
    <>{children}</>
  ) : (
    <Navigate to="/" />
  );
};

export default PublicRoute;
