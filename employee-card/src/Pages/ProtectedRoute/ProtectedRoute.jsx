// ProtectedRoute.js
import React from 'react';
const ProtectedRoute = ({children}) => {
    let userData = sessionStorage.getItem('userData');
    userData = JSON.parse(userData);
    const userRole = userData !== null ? userData.userRole : null;
    if ( userRole === 'admin'){
        return  <>{children}</>
    }
};
export default ProtectedRoute;
