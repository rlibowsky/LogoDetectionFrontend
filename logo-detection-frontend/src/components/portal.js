import React from 'react';
import './portal.css';

import Footer from './footer.js';

import { Container, Button } from 'reactstrap';

  export default class Portal extends React.Component { 
    constructor(props) {
      super(props);
      this.state = {
        isOpen: false
      };
      this.onTrain = this.onTrain.bind(this);
      this.onSearch = this.onSearch.bind(this);
      this.learnMore = this.learnMore.bind(this);
    }

    onTrain(ev) {
      this.props.history.push('/train');
    }
    onSearch(ev) {
      this.props.history.push('/search');
    }

    learnMore(ev) {
      this.props.history.push('/');
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
                      <Button onClick={this.onTrain}> Train Your Logo</Button>
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
                      <Button onClick ={this.onSearch}> Search Social Media </Button>
                    </div>
                  </div>
                </div>
              </div>

          </div>
          <h5> Interested in how our services can help you? Give us a call! </h5>
          <Button className="learnMoreButton" onClick={this.learnMore}> Learn More </Button>
        </center>
        <Footer/>
    </Container>  
    );
  }
}