import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Login from './Login';
import SignUp from './SignUp';

const AdminElement = () => {
    const [toggle, setToggle] =useState(false)
return(
<div className='container'>
{
    toggle ? <Login toggle={toggle} setToggle={setToggle}/> :<SignUp toggle={toggle} setToggle={setToggle}/>
}
</div>
)
}

export default AdminElement;

/*    if( CURRENT_USER_ROLE == "admin" ) {
        return <>{children}</>;
    } else {
        return <Navigate to="/"/>;
    }
    */