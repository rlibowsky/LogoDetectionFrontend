import React from 'react';
import './meettheteam.css';

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

export default class MeetTheTeam extends React.Component {
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

        <div class="image" >
          <img src={require('./images/meettheteam/anubhav.jpg')} width="400" height="400" hspace = "50" vspace = "10"/>
          <h2><span>Anubhav Sarkar:<span class='spacer'></span><br /><span class='spacer'></span>Full Stack Developer</span></h2>
        </div>

        <div class="image">
          <img src={require('./images/meettheteam/ruth.jpg')} width="400" height="400" hspace = "50" vspace = "10" />
          <h2><span>Ruth Libowsky:<span class='spacer'></span><br /><span class='spacer'></span>Front-End Developer</span></h2>
        </div>

        <div class="image">
          <img src={require('./images/meettheteam/kevin.jpg')} width="400" height="400" hspace = "50" vspace = "10" />
          <h2><span>Kevin Wang:<span class='spacer'></span><br /><span class='spacer'></span>Back-End Developer</span></h2>
        </div>

        <div class="image">
          <img src={require('./images/meettheteam/shabina.jpg')} width="400" height="400"  hspace = "50" vspace = "10" />
          <h2><span>Shabina Rayan:<span class='spacer'></span><br /><span class='spacer'></span>Front-End Developer</span></h2>
        </div>
      </div>
    );
  }
}