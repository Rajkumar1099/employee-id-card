import React from 'react'
import { Navbar, Image, Container, Nav } from 'react-bootstrap'
import  logo  from '../Common/Images/lookatmeprintLogo.png'
import { NavLink, useLocation, useParams } from 'react-router-dom';
import Notification from './Notification/Notification.jsx';

const TopNavbar = () => {
    const {id} =useParams();
    const location =useLocation();
    console.log('id',id, location)
    const Navigation = ({ id, location }) => {
        const RenderNavLink = location.pathname === '/' ? (
          <NavLink to='/' >
            
          </NavLink>
        ) : (
          <Navbar expand="lg" sticky="top" bg='dark' data-bs-theme="dark">
            <Container>
              <Navbar.Brand href="/">
                <Image src={logo} width={50} height={50} />
              </Navbar.Brand>
              <Navbar.Toggle aria-controls="basic-navbar-nav" />
              <Navbar.Collapse id="basic-navbar-nav">
                <Nav style={{ display: "flex", flexDirection: "row", justifyContent: "space-between" }} className='col-6'>
                  <NavLink to={`login/view/${id}`} className={({ isActive }) => isActive ? "text-decoration-none bg-danger text-white rounded-1 px-2" : "text-decoration-none"}>
                   
                  </NavLink>
                  <NavLink to='/vcard' className={({ isActive }) => isActive ? "text-decoration-none bg-danger text-white rounded-1 px-2" : "text-decoration-none"}>
                   Views Card
                   </NavLink>
                </Nav>
              </Navbar.Collapse>
              <Navbar.Toggle />
              <Navbar.Collapse id="basic-navbar-nav" className="justify-content-end">
                <Nav style={{ display: "flex", flexDirection: "row", justifyContent: "space-between" }} className='col-6'>
                  <NavLink  className={({ isActive }) => isActive ? "text-decoration-none bg-danger text-white rounded-1 px-2" : "text-decoration-none"}>
                        Logout
                  </NavLink>
                </Nav>
              </Navbar.Collapse>
            </Container>
          </Navbar>
        );
      
        return RenderNavLink;
      };

      const RenderNav=Navigation({id, location})
  return (
  <div>
{
    RenderNav
}
  </div>
  )
}

export default TopNavbar;