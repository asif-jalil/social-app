import React, { useContext } from "react";
import { Nav, Navbar } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import { mainContext } from "../../App";

const Header = () => {
   const { currentUser } = useContext(mainContext);

   return (
      <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
         <Navbar.Brand>Social Share</Navbar.Brand>
         <Navbar.Toggle aria-controls="responsive-navbar-nav" />
         <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="ml-auto">
               <NavLink className="nav-link" exact to="/">News Feed</NavLink>
               <NavLink className="nav-link" to={`/${currentUser.username}`}>Profile</NavLink>
               <NavLink className="nav-link" to="/friends">Friends</NavLink>
            </Nav>
         </Navbar.Collapse>
      </Navbar>
   );
};

export default Header;
