import React from 'react';

import {
  Container,
  Col,
  Button,
  Form,
  FormGroup, 
  Label, 
  Input, 
  FormText,
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

  export default class Train extends React.Component { 
    constructor(props) {
      super(props);
      this.state = {
        isOpen: false
      };
    }

  render() {
    return (
    <Container>
        <center>
            <h2> Train Your Logo </h2>
            <div class="header-space"></div>
            <div>
          </div>
        </center>
    </Container>  
    );
  }
}