import React from 'react';
import './portal.css';

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

  export default class Portal extends React.Component { 
  render() {
    return (
    <Container>
        <center>
            <h2> OUR SERVICES </h2>
            <h5> Here for you </h5>
            <div class="bt-space"></div>

            <div class="row">
              
              <div class="column">
                <div class="row">
                  <img class="demo" src={require('./images/services/train.jpg')} alt="Image" height="300" width="400"/>
                </div>
                <div class="row">
                  <Button onClick={this.onSubmit}> Go </Button>
                </div>
              </div>

              <div class="bt-space"></div>

              <div class="column">
                <div class="row">
                  <img class="demo" src={require('./images/services/search.jpg')} alt="Image" height="300" width="400"/>
                </div>
                <div class="row">
                  <Button onClick={this.onSubmit}> Go </Button>
                </div>
              </div>

          </div>
        </center>
    </Container>  
    );
  }
}