import React from 'react'
import { Navbar, Image, Container, Nav } from 'react-bootstrap'
import  logo  from '../Common/Images/lookatmeprintLogo.png'
import { NavLink } from 'react-router-dom';
const TopNavbar = () => {
    
  return (
    <Navbar expand="lg" bg="dark" sticky="top" data-bs-theme="dark" >
    <Container>
        <Navbar.Brand href="/">
            <Image src={logo} width={50} height={50} />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />

        <Navbar.Collapse id="basic-navbar-nav">
            <Nav style={{display:"flex", flexDirection:"row", justifyContent:"space-between" }} className='col-6'>
                <NavLink to="/" className={({ isActive}) =>  isActive ? "text-decoration-none bg-danger text-white rounded-1  px-2 " : "text-decoration-none" }>
                    Home
                </NavLink>
                <NavLink to="/details" className={({ isActive}) =>  isActive ? "text-decoration-none bg-danger text-white rounded-1 px-2" : "text-decoration-none" }>
                   Card Details
                </NavLink>
                <NavLink to='/login' className={({ isActive}) =>  isActive ? "text-decoration-none bg-danger text-white rounded-1 px-2" : "text-decoration-none text-white" }>
                    Login
                </NavLink>
                <NavLink to='scanner' className={({ isActive}) =>  isActive ? "text-decoration-none bg-danger text-white rounded-1 px-2" : "text-decoration-none text-white" }>
                    Scanner
                </NavLink>
            </Nav>
        </Navbar.Collapse>
    </Container>
</Navbar>
  )
}

export default TopNavbar;