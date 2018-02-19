import React from 'react';

import { Container } from 'reactstrap';

  export default class Search extends React.Component { 
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
            <h2> Search Your Logo </h2>
            <div class="header-space"></div>
            <div>
          </div>
        </center>
    </Container>  
    );
  }
}