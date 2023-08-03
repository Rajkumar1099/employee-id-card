import React from 'react';
import AdminDashboard from './AdminDashboard';
import AdminLogin from './AdminLogin';
import { NavLink } from 'react-router-dom';

function Admin() {
    let userData = sessionStorage.getItem('userData');
    userData = JSON.parse(userData);
    const userRole = userData !== null ? userData.userRole : null;
    if( userRole === undefined || userRole === null ) {
        return (
           <div>
             <NavLink to='/' replace={true}></NavLink>
             <NavLink to='/user' replace={true}></NavLink>
             <NavLink to='/admin' replace={true}></NavLink>
           </div>
        )
    } else {
        return (
            <AdminDashboard />
        )
    }
}

export default Admin;