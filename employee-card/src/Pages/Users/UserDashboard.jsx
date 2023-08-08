import React, { useState ,useRef} from 'react';
import { Container, Navbar, Nav, Image, Dropdown, Overlay } from 'react-bootstrap';
import { useParams, NavLink, useNavigate } from 'react-router-dom';
// import logo from '../../Common/Images/logo_bg_light.png';
import ViewCards from '../ViewCards';
import profile from '../../assets/dummyuser.jpg'
import logo from '../../assets/brand.png'
const UserDashboard = () => {
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
            <Navbar expand="lg" sticky="top"  style={{backgroundColor: 'rgb(242 242 242)', borderBottomWidth: "thin", borderBottomColor: "gray", padding: '0' }}>
                <Navbar.Brand >
                    <Image src={logo} width={80} height={80} />
                </Navbar.Brand>
                {/* <Navbar.Toggle aria-controls="basic-navbar-nav" /> */}
               
                <Nav>
                    <NavLink to='/user' replace={true}>
                        {/*user  Vcard */}
                    </NavLink>
                </Nav>
                <Nav>
                    <NavLink to={`/user/details/${id}`} replace={true}>
                        {/*user  Vcard */}
                    </NavLink>
                </Nav>
                <Nav>
                    <NavLink to='/' replace={true}>
                        {/*user  Vcard */}
                    </NavLink>
                </Nav>
                <Navbar.Collapse id="basic-navbar-nav" className="justify-content-end">
                    <Nav style={{ flexDirection: "row", justifyContent: "space-between", marginRight:'50px', padding:'2px' }} >
                        {/* <NavLink > */}
                        <div style={{display:'flex', flexDirection:'row', justifyContent:'space-between'}}>
                        {show && 
                            <div
                            style={{
                                        // position: 'absolute',
                                        marginRight: '20px', // Adjust this value as needed to position the logout div properly
                                        backgroundColor: '#808183',
                                        padding: '5px',
                                        borderRadius: '5px',
                                        color:'white'
                                        }}
                                        onClick={handleLogout}
                                        >
                                            Logout
                            </div>
                            }
                             <Image src={profile} width={26} height={26} roundedCircle ref={target} onClick={() => setShow(!show)} />
                        </div>
                           
                        {/* </NavLink> */}
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
    )
}
export default UserDashboard;