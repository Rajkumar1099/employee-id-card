import React from 'react'
import AdminLogin from '../admin/AdminLogin';
import AdminDashboard from '../admin/AdminDashboard';
const User = () => {
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

export default User