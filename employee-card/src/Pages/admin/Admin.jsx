import React from 'react';
import AdminDashboard from './AdminDashboard';
import AdminLogin from './AdminLogin';
import { NavLink, Navigate } from 'react-router-dom';
import UserDashboard from '../Users/UserDashboard';

function Admin() {
    
    let userData = sessionStorage.getItem('userData');
    userData = JSON.parse(userData);
    const userRole = userData !== null ? userData.userRole : null;
    if( userRole === undefined || userRole === null ) {
        return (
           <div>
             <NavLink to='/user' replace={true}></NavLink>
             <NavLink to='/admin' replace={true}></NavLink>
           </div>
        )
    } else {
        return (
            userRole ==='admin' ? <Navigate to='/admin/vcard' />: <Navigate to={`/user/details/${userData.userId}`} />
        )
    }
}
export default Admin;