import React from 'react'
import { NavLink, useLocation, useParams } from 'react-router-dom';
const UserDasboard = () => {
  return (
    <Navbar expand="lg" sticky="top" bg='dark' data-bs-theme="dark">
    <Container>
      <Navbar.Brand href="/">
        <Image src={logo} width={50} height={50} />
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav>
          <NavLink to={`login/view/${id}`} className={({ isActive }) => isActive ? "text-decoration-none bg-danger text-white rounded-1 px-2 " : "text-decoration-none"}>
          </NavLink>
           <NavLink to='/vcard' className={({ isActive }) => isActive ? "text-decoration-none bg-danger text-white rounded-1 px-2" : "text-decoration-none"}>
            Views Details
           </NavLink>
        </Nav>
      </Navbar.Collapse  >
    </Container>
      <Navbar.Collapse id="basic-navbar-nav" className="justify-content-end">
        <Nav style={{ display: "flex", flexDirection: "row", justifyContent: "space-between" }} >
          <NavLink >
            <Dropdown>
                <Dropdown.Toggle variant="none" id="dropdown-basic">
                    <Logout  />
                </Dropdown.Toggle>
                <Dropdown.Menu>
                    <Dropdown.Item><NavLink to="/">Login</NavLink></Dropdown.Item>
                    <Dropdown.Item href="#/action-2">Logout</Dropdown.Item>
                </Dropdown.Menu>
            </Dropdown>
          </NavLink>
        </Nav>
      </Navbar.Collapse>
  </Navbar>
  )
}

export default UserDasboard