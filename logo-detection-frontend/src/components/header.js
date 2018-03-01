import React from 'react';
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink} from 'reactstrap';
import cookie from "react-cookies";

export default class Header extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpen: false
    }
    this.toggle = this.toggle.bind(this);
    this.logout = this.logout.bind(this);
  }

  toggle() {
    this.setState({
      isOpen: !this.state.isOpen
    });
  }

  logout() {
    cookie.remove('token', { path: '/' });
  }

  render() {
    const tokenExists = cookie.load('token') !== undefined;
    var loginText = "Login/Sign Up";
    if (tokenExists) {
      loginText = "Logout";
    }
    console.log("rerendered and token is " + this.state.token);
    return (
      <div>
        <Navbar color="faded" light expand="md">
          <NavbarBrand href="/"> <img src={require('./images/landingpage/detective.png')} width="30" height="30" alt="detective"/> LOGODETECT</NavbarBrand>
          <NavbarToggler onClick={this.toggle} />
          <Collapse isOpen={this.state.isOpen} navbar>
            <Nav className="ml-auto" navbar>
              <NavItem>
                <NavLink  onClick={this.logout} href="/login"> { loginText } </NavLink>
              </NavItem>
              <NavItem>
                <NavLink>help@logodetect.com</NavLink>
              </NavItem>
              <NavItem>
                <NavLink>4254427300</NavLink>
              </NavItem>
              <NavItem>
                <a href="https://www.facebook.com/">
                  <img src={require('./images/socialmedia/facebook.png')} width="30" height="30" alt="facebook"/>
                </a>
              </NavItem>
              <NavItem>
                <a href="https://www.twitter.com/">
                <img src={require('./images/socialmedia/twitter.png')} width="30" height="30" alt="twitter"/>
                </a>
              </NavItem>
              <NavItem>
                <a href="https://www.instagram.com/">
                <img src={require('./images/socialmedia/instagram.png')} width="30" height="30" alt="instagram"/>
                </a>
              </NavItem>
            </Nav>
          </Collapse>
        </Navbar>
      </div>
    );
  }
}