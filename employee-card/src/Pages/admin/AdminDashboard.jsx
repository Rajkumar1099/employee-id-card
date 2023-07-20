import React from 'react';
import { Container, Navbar, Nav, Image, Dropdown } from 'react-bootstrap';
import { useParams, NavLink } from 'react-router-dom';
import logo from '../../Common/Images/lookatmeprintLogo.png';
import ViewCards from '../ViewCards';

const AdminDashboard = () => {
    const {id} = useParams();
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
                <Navbar.Collapse id="basic-navbar-nav" className="justify-content-end">
                    <Nav style={{ flexDirection: "row", justifyContent: "space-between" }} >
                        <NavLink >
                            <Dropdown className='dropdown-right'>
                                <Dropdown.Toggle variant="none" id="dropdown-basic">
                                    {/* <Logout  /> */}
                                </Dropdown.Toggle>
                                <Dropdown.Menu>
                                    <Dropdown.Item >Logout</Dropdown.Item>
                                </Dropdown.Menu>
                            </Dropdown>
                        </NavLink>
                    </Nav>
                </Navbar.Collapse>
            </Navbar>            
        </div>
    )
}
export default AdminDashboard;