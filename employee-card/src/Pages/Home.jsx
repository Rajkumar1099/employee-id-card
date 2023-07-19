import React from 'react';
import logo from '../Common/Images/lookatmeprintLogo.png';
import { NavLink } from 'react-router-dom';

// import UserDasboard from './Pages/Users/UserDasboard';

function Home() {
    return (
        <div className='container mt-4'>
            <img width={100} src={logo} alt="" />
            <h2 className='mt-4'>Welcome to LookatmePrint.com</h2>
            <div className='row mt-4'>
                <div className="col-6">
                    <div className="card">
                        <div className="card-body">
                            <NavLink to="/admin" style={{textDecoration:"none"}} > 
                                <div className="pt-2 h5" >Admin Login</div>
                            </NavLink>
                        </div>
                    </div>
                </div>
                <div className="col-6">
                    <div className="card">
                        <div className="card-body">
                            <NavLink to="/user" style={{textDecoration:"none"}} > 
                                <h5>User Login</h5>
                            </NavLink>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Home;