// ProtectedRoute.js
import React from 'react';
import { Redirect, Route } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
    const userRole= sessionStorage.getItem('userRole') || 'admin';

    if(userRole==='admin')
    {
        return  <>{children}</>
    }
    if(userRole ==='user')
    {
        return  <>{children}</>
    }

};

export default ProtectedRoute;
