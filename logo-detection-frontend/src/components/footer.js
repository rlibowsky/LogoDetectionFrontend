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
            <div className="row">

              <div className="column">
                <div className="row">
                    Address
                </div>
                <div className="row">
                    610 Childs Way
                </div>
                <div className="row">
                    Los Angeles, Los Angeles County 90007
                </div>
                <div className="row">
                    USA
                </div>
              </div>

              <div className="bt-space"></div>

              <div className="column">
                <div className="row">
                    Contact
                </div>
                <div className="row">
                    help@logodetect.com
                </div>
                <div className="row">
                    4254427300
                </div>
              </div>

              <div className="bt-space"></div>

              <div className="column">
                <div className="row">
                    Follow
                </div>
                <div className="row">
                    <div className="column">
                        <a href="https://www.facebook.com/">
                            <img src={require('./images/socialmedia/facebook.png')} width="30" height="30" alt="facebook"/>
                        </a>
                    </div>
                    <div className="column">
                        <a href="https://www.twitter.com/">
                            <img src={require('./images/socialmedia/twitter.png')} width="30" height="30" alt="twitter"/>
                        </a>
                    </div>
                    <div className="column">
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