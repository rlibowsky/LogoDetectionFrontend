import React from 'react';
import './datasetlanding.css';
import Footer from './footer.js';
import cookie from "react-cookies";

import { Container, Button } from 'reactstrap';

  export default class DataSetLanding extends React.Component { 
    constructor(props) {
      super(props);
      this.state = {
        isOpen: false,
        token: cookie.load('token')
      };
      if (this.state.token === undefined) {
        this.props.history.push('/login');
        return;
      }
      this.onAddImages = this.onAddImages.bind(this);
      this.onScrape = this.onScrape.bind(this);
      this.learnMore = this.learnMore.bind(this);

    }

    learnMore(ev) {
        this.props.history.push('/');
      }

    onAddImages(ev) {
      this.props.history.push({
        pathname: '/train',
        params: {
          email: this.state.email
        }
      });
    }
    onScrape(ev) {
      this.props.history.push({
        pathname: '/search',
        params: {
          email: this.state.email
        }
      });
    }

  render() {
    return (
    <Container>
        <center>
            <h2> Your Dataset </h2>
            <div className="header-space"></div>
            <div className="row">
              <div className="column">
                <div className="row">
                  <div className="imgContainer">
                    <div>
                      <img src={require('./images/services/addImage.jpg')} alt="Image" height="350" width="450"/>
                    </div>
                    <div className="imgButton">
                      <Button onClick={this.onAddImages}> Add Image to Training Set</Button>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="bt-space"></div>
              <div className="column">
                <div className="row">
                  <div className="imgContainer">
                    <div>
                      <img src={require('./images/services/instagram.jpg')} alt="Image" height="350" width="450"/>
                    </div>
                    <div className="imgButton">
                      <Button onClick ={this.onScrape}> Scrape Instagram </Button>
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