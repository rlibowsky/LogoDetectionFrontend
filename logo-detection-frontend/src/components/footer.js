import React from 'react';

import { Container, Button } from 'reactstrap';

export default class Footer extends React.Component {
    constructor(props) {
      super(props);
  
    }
    render() {
      return (
        <Container className="footer-align">
        <center>
            <div class="row">

              <div class="column">
                <div class="row">
                    Row 1
                </div>
              </div>

              <div class="bt-space"></div>

              <div class="column">
                <div class="row">
                    Row 2
                </div>
              </div>

              <div class="bt-space"></div>

              <div class="column">
                <div class="row">
                    Row 3
                </div>
              </div>
              

          </div>
        </center>
    </Container>
      );
    }
}