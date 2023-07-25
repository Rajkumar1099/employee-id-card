import React, { useState ,useRef} from 'react';
import { Container, Navbar, Nav, Image, Dropdown, Overlay } from 'react-bootstrap';
import { useParams, NavLink, useNavigate } from 'react-router-dom';
import logo from '../../Common/Images/lookatmeprintLogo.png';
import ViewCards from '../ViewCards';
import profile from '../../assets/dummyuser.jpg'
const AdminDashboard = () => {
    const {id} = useParams();
    const navigate=useNavigate();
    const [show, setShow]=useState(false);
    const target = useRef(null);
    let userData=sessionStorage.getItem('userData');
    userData = JSON.parse(userData);
    const userRole = userData !== null ? userData.userRole : null;

    const handleLogout=()=>{
        sessionStorage.setItem('userData', null);
        navigate('/')
    }
    return (
        <div>
            <Navbar expand="lg" sticky="top" bg='light'>
                <Navbar.Brand href="/">
                    <Image src={logo} width={60} height={60} /> &nbsp;&nbsp;
                    <span className='brand'>64sec.com</span>
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Nav>
                    <NavLink to='/admin/vcard'>
                        {/* Vcard */}
                    </NavLink>
                </Nav>
                <Nav>
                    <NavLink to='/user'>
                        {/* Vcard */}
                    </NavLink>
                </Nav>
                <Navbar.Collapse id="basic-navbar-nav" className="justify-content-end">
                    <Nav style={{ flexDirection: "row", justifyContent: "space-between", marginRight:'50px', padding:'2px' }} >
                        {/* <NavLink > */}
                            <Image src={profile} width={26} height={26} roundedCircle ref={target} onClick={() => setShow(!show)} />
                            {show && 
                            <div 
                            style={{
                                        position: 'absolute',
                                        marginLeft: '20px', // Adjust this value as needed to position the logout div properly
                                        // top: 0,
                                        backgroundColor: '#808183',
                                        padding: '5px',
                                        borderRadius: '5px',
                                        }}
                                        onClick={handleLogout}
                                        >
                                            Logout
                            </div>}
                        {/* </NavLink> */}
                    </Nav>
                </Navbar.Collapse>
            </Navbar>            
        </div>
    )
}
export default AdminDashboard;