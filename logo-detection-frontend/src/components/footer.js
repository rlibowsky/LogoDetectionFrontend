import React from 'react';

import { Container } from 'reactstrap';

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
                    Address
                </div>
                <div class="row">
                    610 Childs Way
                </div>
                <div class="row">
                    Los Angeles, Los Angeles County 90007
                </div>
                <div class="row">
                    USA
                </div>
              </div>

              <div class="bt-space"></div>

              <div class="column">
                <div class="row">
                    Contact
                </div>
                <div class="row">
                    help@logodetect.com
                </div>
                <div class="row">
                    4254427300
                </div>
              </div>

              <div class="bt-space"></div>

              <div class="column">
                <div class="row">
                    Follow
                </div>
                <div class="row">
                    <div class="column">
                        <a href="https://www.facebook.com/">
                            <img src={require('./images/socialmedia/facebook.png')} width="30" height="30" alt="facebook"/>
                        </a>
                    </div>
                    <div class="column">
                        <a href="https://www.twitter.com/">
                            <img src={require('./images/socialmedia/twitter.png')} width="30" height="30" alt="twitter"/>
                        </a>
                    </div>
                    <div class="column">
                        <a href="https://www.instagram.com/">
                            <img src={require('./images/socialmedia/instagram.png')} width="30" height="30" alt="instagram"/>
                        </a>
                    </div>
                </div>
              </div>
              

          </div>
        </center>
    </Container>
      );
    }
}