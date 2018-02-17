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
    constructor(props) {
      super(props);
      this.state = {
        isOpen: false
      };
    }
  onTrain(ev) {
  
  }
  onSearch(ev) {

  }
  render() {
    return (
    <Container>
        <center>
            <h2> OUR SERVICES </h2>
            <h5> Here for you </h5>
            <div class="header-space"></div>

            <div class="row">

              <div class="column">
                <div class="row">
                  <div class="imgContainer">
                    <div>
                      <img src={require('./images/services/train.jpg')} alt="Image" height="350" width="450"/>
                    </div>
                    <div class="imgButton">
                      <Button onTrain={this.onTrain}> Train Your Logo </Button>
                    </div>
                    </div>
                  </div>
              </div>
              
              <div class="bt-space"></div>

              <div class="column">
                <div class="row">
                  <div class="imgContainer">
                    <div>
                      <img src={require('./images/services/search.jpg')} alt="Image" height="350" width="450"/>
                    </div>
                    <div class="imgButton">
                      <Button onSearch={this.onSearch}> Search Social Media </Button>
                    </div>
                  </div>
                </div>
              </div>

          </div>
        </center>
    </Container>  
    );
  }
}