import React from 'react';
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem } from 'reactstrap';

export default class Header extends React.Component {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.state = {
      isOpen: false
    };
  }
  toggle() {
    this.setState({
      isOpen: !this.state.isOpen
    });
  }
  render() {
    return (
      <div>
        <Navbar color="faded" light expand="md">
          <NavbarBrand href="/">LOGODETECT</NavbarBrand>
          <NavbarToggler onClick={this.toggle} />
          <Collapse isOpen={this.state.isOpen} navbar>
            <Nav className="ml-auto" navbar>
              <NavItem>
                <NavLink href="/login">Login/Sign Up</NavLink>
              </NavItem>
              <NavItem>
                <NavLink href="/">help@logodetect.com</NavLink>
              </NavItem>
              <NavItem>
                <NavLink href="/">4254427300</NavLink>
              </NavItem>
              <NavItem>
                <NavLink href="https://www.facebook.com/">Facebook
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink href="https://www.twitter.com/">Instagram
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink href="https://www.instagram.com/">Twitter
                </NavLink>
              </NavItem>
            </Nav>
          </Collapse>
        </Navbar>
      </div>
    );
  }
}