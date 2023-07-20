import React from 'react';
import AdminDashboard from './AdminDashboard';
import AdminLogin from './AdminLogin';

function Admin() {
    let userData = sessionStorage.getItem('userData');
    userData = JSON.parse(userData);
    const userRole = userData !== null ? userData.userRole : null;
    if( userRole === undefined || userRole === null ) {
        return (
            <AdminLogin />
        )
    } else {
        return (
            <AdminDashboard />
        )
    }
    
}

export default Admin;