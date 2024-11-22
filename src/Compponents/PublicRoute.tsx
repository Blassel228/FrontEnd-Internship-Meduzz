import React, { ReactNode, useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth0 } from '@auth0/auth0-react';

interface PublicRouteProps {
  children: ReactNode;
}

const PublicRoute: React.FC<PublicRouteProps> = ({ children }) => {
  const isAuthenticated = Boolean(localStorage.getItem('authToken'));

  return !isAuthenticated ? (
    <>{children}</>
  ) : (
    <Navigate to="/" />
  );
};

export default PublicRoute;
