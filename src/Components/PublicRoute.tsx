import React, { ReactNode} from 'react';
import { Navigate } from 'react-router-dom';

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
