import React, { useEffect } from 'react';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import Dashboard from './views/Dashboard';


function AuthenticatedApp() {
  return (
    <BrowserRouter>
      <AxiosInterceptor />
      <Routes>
       
        <Route path="/" element={<Dashboard />} />
        

        {/* Add routes above */}
        <Route path="/*" element={<Navigate to="/" />} />
      </Routes>
    </BrowserRouter>
  );
}

export { AuthenticatedApp };
