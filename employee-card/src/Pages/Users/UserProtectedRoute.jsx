import React from 'react'

const UserProtectedRoute = ({children}) => {
    let userData = sessionStorage.getItem('userData');
    userData = JSON.parse(userData);
    const userRole = userData !== null ? userData.userRole : null;
    if ( userRole == 'customer' ){
        return  <>{children}</>
    }
}

export default UserProtectedRoute