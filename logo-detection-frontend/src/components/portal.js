import React from 'react';
import './portal.css';

import Footer from './footer.js';
import cookie from "react-cookies";

import { Container, Button } from 'reactstrap';

  export default class Portal extends React.Component { 
    constructor(props) {
      super(props);
      this.state = {
        isOpen: false,
        token: cookie.load('token'),
        datasets: [],
        count: 0
      };
      if (this.state.token === undefined) {
        this.props.history.push('/login');
        return;
      }
      this.onTrain = this.onTrain.bind(this);
      this.onSearch = this.onSearch.bind(this);
      this.learnMore = this.learnMore.bind(this);
    }

    onTrain(ev) {
      console.log("in train yo");
      // call here to get data sets
      fetch('http://localhost:2000/datasets/', {
        method: 'GET',
        headers: {
          'Authorization': 'Bearer ' + this.state.token,
          'Content-Type': 'application/json',
        }
      }).then(response => response.json())
      .then(json => {
        this.state.datasets = json;
        console.log(this.state.datasets);
        cookie.save('datasets', this.state.datasets, { path: '/' , 'maxAge': 100000});

      })
      .then(
        this.props.history.push({
        pathname: '/train',
        params: {
          email: this.state.email
        }
      }));
    }
    onSearch(ev) {
      this.props.history.push({
        pathname: '/search',
        params: {
          email: this.state.email
        }
      });
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
            <div className="header-space"></div>

            <div className="row">

              <div className="column">
                <div className="row">
                  <div className="imgContainer">
                    <div>
                      <img src={require('./images/services/train.jpg')} alt="Image" height="350" width="450"/>
                    </div>
                    <div className="imgButton">
                      <Button onClick={this.onTrain}> Train Your Logo</Button>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="bt-space"></div>

              <div className="column">
                <div className="row">
                  <div className="imgContainer">
                    <div>
                      <img src={require('./images/services/search.jpg')} alt="Image" height="350" width="450"/>
                    </div>
                    <div className="imgButton">
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