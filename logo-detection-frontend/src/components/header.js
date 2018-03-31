import React from 'react';
import { Collapse, Navbar, NavbarToggler, NavbarBrand, Nav, NavItem, NavLink, 
  Dropdown, DropdownToggle, DropdownMenu, DropdownItem} from 'reactstrap';
import cookie from "react-cookies";

export default class Header extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpen: false,
      dropdownOpen: false
    }
    this.toggle = this.toggle.bind(this);
    this.logout = this.logout.bind(this);
    this.datasets = this.datasets.bind(this);
    this.search = this.search.bind(this);
    this.profile = this.profile.bind(this);
  }

  toggle() {
    this.setState({
      dropdownOpen: !this.state.dropdownOpen
    });
  }

  logout() {
    cookie.remove('token', { path: '/' });
  }

  search() {
    this.props.history.push('/search');
  }

  profile() {
    this.props.history.push('/portal');
  }

  datasets() {
    this.props.history.push('/train');
  }

  render() {
    const tokenExists = cookie.load('token') !== undefined;
    var loginText = "Login/Sign Up";
    var portalText = "help@logodetect.com";
    var portalRef = "/";
    var login = loginText;
    if (tokenExists) {
      loginText = "Logout";
      portalText = "View Portal";
      portalRef = "/portal";
      login = "";
    }
    

    return (
      <div>
        <Navbar color="faded" light expand="md">
          <NavbarBrand href="/"> <img src={require('./images/landingpage/detective.png')} width="30" height="30" alt="detective"/> LOGODETECT</NavbarBrand>
          <NavbarToggler onClick={this.toggle} />
          <Collapse isOpen={this.state.isOpen} navbar>
            <Nav className="ml-auto" navbar>
              <NavItem>
                <NavLink  onClick={this.logout} href="/login"> { login } </NavLink>
              </NavItem>
              <NavItem>
                <Dropdown isOpen={this.state.dropdownOpen} toggle={this.toggle}>
                  <DropdownToggle caret>
                  Options 
                  </DropdownToggle>
                  <DropdownMenu>
                    <DropdownItem header> Options </DropdownItem>
                    <DropdownItem onClick={this.datasets}> Datasets </DropdownItem>
                    <DropdownItem onClick={this.search}> Search </DropdownItem>
                    <DropdownItem onClick={this.profile}> Profile </DropdownItem>
                    <DropdownItem divider />
                    <DropdownItem onClick={this.logout} href="/login" > {loginText} </DropdownItem>
                  </DropdownMenu>
                </Dropdown>
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