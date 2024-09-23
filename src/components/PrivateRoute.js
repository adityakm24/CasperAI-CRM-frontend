import React from 'react';
import { Navigate } from 'react-router-dom';

const PrivateRoute = ({ children, isAuthenticated  }) => { //remove the true when going to prod
  return isAuthenticated ? children : <Navigate to="/login" replace />;
};

export default PrivateRoute;