import React from "react";
import {
  NavLink,
  Nav,
  NavItem,
  NavbarBrand,
  Navbar,
  Button,
} from "reactstrap";
import { FaDog } from 'react-icons/fa';

const AppBa = () => {
    return(
        <Navbar color="light" light expand="md">
        <NavbarBrand href="">
          <FaDog style={{ marginRight: '10px' }} />
          Veterinaria "El Cristo"
        </NavbarBrand>
        <Nav className="ml-auto" navbar>
          <NavItem>
            <NavLink href="/register">
              <Button color="primary">Registro</Button>
            </NavLink>
          </NavItem>
        </Nav>
      </Navbar>
    );
};
export default AppBa;
