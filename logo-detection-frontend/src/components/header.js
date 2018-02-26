import React from 'react';
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink} from 'reactstrap';

export default class Header extends React.Component {
  constructor(props) {
    super(props);
    var loggedIn = (props.location.params !== undefined);
    var userText = "Login/Sign Up";
    var userEmail = "";
    if (props.location.params !== undefined) {
      userText = "Logout";
      userEmail = props.location.params["email"];
    }
    this.state = {
      loggedIn: userText,
      email: userEmail,
      isOpen: false
    }
    this.toggle = this.toggle.bind(this);
    this.homeButtonClicked = this.homeButtonClicked.bind(this);
  }
  toggle() {
    this.setState({
      isOpen: !this.state.isOpen
    });
  }

  homeButtonClicked() {
    console.log("home button was clicked");
    this.props.history.push({
      pathname: '/',
      params: {
        email: this.state.email
      }
    });
  }

  render() {
    return (
      <div>
        <Navbar color="faded" light expand="md">
          <NavbarBrand onClick={this.homeButtonClicked}> <img src={require('./images/landingpage/detective.png')} width="30" height="30" alt="detective"/> LOGODETECT</NavbarBrand>
          <NavbarToggler onClick={this.toggle} />
          <Collapse isOpen={this.state.isOpen} navbar>
            <Nav className="ml-auto" navbar>
              <NavItem>
                <NavLink href="/login"> { this.state.loggedIn } </NavLink>
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