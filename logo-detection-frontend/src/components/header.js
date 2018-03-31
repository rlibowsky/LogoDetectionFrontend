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
    var domVariables = {
      loginText: "Login/Sign Up",
      login: "Login/Sign Up",
      dataSetText: "",
      searchText: "",
      profileText: ""
    };
    if (tokenExists) {
      domVariables = {
        loginText: "Logout",
        login: "",
        dataSetText: "Datasets",
        searchText: "Search",
        profileText: "Profile"
      };
    }
    

    return (
      <div>
        <Navbar color="faded" light expand="md">
          <NavbarBrand href="/"> <img src={require('./images/landingpage/detective.png')} width="30" height="30" alt="detective"/> LOGODETECT</NavbarBrand>
          <NavbarToggler onClick={this.toggle} />
          <Collapse isOpen={this.state.isOpen} navbar>
            <Nav className="ml-auto" navbar>
              <NavItem>
                <NavLink  onClick={this.logout} href="/login"> { domVariables.login } </NavLink>
              </NavItem>
              <NavItem>
                <Dropdown isOpen={this.state.dropdownOpen} toggle={this.toggle}>
                  <DropdownToggle caret>
                  Options 
                  </DropdownToggle>
                  <DropdownMenu>
                    <DropdownItem header> Options </DropdownItem>
                    <DropdownItem disabled={!tokenExists} onClick={this.datasets}> {domVariables.dataSetText} </DropdownItem>
                    <DropdownItem disabled={!tokenExists} onClick={this.search}> {domVariables.searchText} </DropdownItem>
                    <DropdownItem disabled={!tokenExists} onClick={this.profile}> {domVariables.profileText} </DropdownItem>
                    <DropdownItem divider />
                    <DropdownItem onClick={this.logout} href="/login" > {domVariables.loginText} </DropdownItem>
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