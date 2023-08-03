import React from 'react';
import logo from '../assets/brand.png';
import { NavLink } from 'react-router-dom';

// import UserDasboard from './Pages/Users/UserDasboard';

function Home() {
    return (
        <div className='container text-center'  style={{height:'100vh'}}>
            <img style={{width: "100px"}} src={logo} alt="" />
            <h2 className='pt-2'>Welcome to 64sec.com</h2>
            <div className='row pt-4'>
                <div className="col-12 col-md-6 col-lg-6 col-sm-6">
                    <div className="card">
                        <div className="card-body">
                            <NavLink to="/admin" style={{textDecoration:"none"}} replace={true} > 
                                <div className="btn d-block" style={{background: "#796EB2", color: "#ffffff"}} >
                                    <div className="h2 p-4">Admin Login</div>
                                </div>
                            </NavLink>
                        </div>
                    </div>
                </div>
                <div className="col-12 col-md-6 col-lg-6 col-sm-6">
                    <div className="card">
                        <div className="card-body">
                            <NavLink to="/user" style={{textDecoration:"none"}} replace={true}> 
                            <div className="btn d-block" style={{background: "#796EB2", color: "#ffffff"}} >
                                <div className="h2 p-4">User Login</div>
                            </div>
                            </NavLink>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Home;