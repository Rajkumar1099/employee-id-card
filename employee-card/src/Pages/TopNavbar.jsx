import React, { useState } from 'react'
import { Navbar, Image, Container, Nav ,Dropdown} from 'react-bootstrap'
import  logo  from '../Common/Images/lookatmeprintLogo.png'
import { NavLink, useLocation, useParams } from 'react-router-dom';
import Notification from './Notification/Notification.jsx';
import { Logout } from './admin/Logout';
import { FiChevronLeft } from 'react-icons/fi'


const TopNavbar = () => {
    const {id} =useParams();
    const location =useLocation();
    const [active, setActive] = useState(false);
    const handleShowActive=(e)=>{
        e.preventDefault();
        setActive(t=>!t)
    }
    const userId= sessionStorage.getItem('userId')
    console.log('userId', active , userId, id)
    const Navigation = ({ id, location }) => {
        const RenderNavLink = location.pathname === '/' ? (
          <NavLink to='/' replace={true}>
          </NavLink>
        ) : (
          <Navbar expand="lg" sticky="top" bg='dark' data-bs-theme="dark">
            <Container>
              <Navbar.Brand href="/" >
                <Image src={logo} width={50} height={50} />
              </Navbar.Brand>
              <Navbar.Toggle aria-controls="basic-navbar-nav" />
              <Navbar.Collapse id="basic-navbar-nav">
                <Nav>
                  <NavLink to={`login/view/${id}`} replace={true} className={({ isActive }) => isActive ? "text-decoration-none bg-danger text-white rounded-1 px-2 " : "text-decoration-none"}>
                  </NavLink>
                  <NavLink to='/vcard'  replace={true} className={({ isActive }) => isActive ? "text-decoration-none bg-danger text-white rounded-1 px-2" : "text-decoration-none"}>
                   Views Card
                   </NavLink>
                </Nav>
              </Navbar.Collapse  >
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