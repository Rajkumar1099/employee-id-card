import React from 'react';
import AdminDashboard from './AdminDashboard';
import AdminLogin from './AdminLogin';

function Admin() {
    const token = sessionStorage.getItem("authtoken");
    if( token == undefined || token == null ) {
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