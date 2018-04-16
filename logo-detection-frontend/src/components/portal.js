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
        datasets: cookie.load('datasets'),
        count: 0
      };
      if (this.state.token === undefined) {
        this.props.history.push('/login');
        return;
      }
      this.onTrain = this.onTrain.bind(this);
      this.getCover = this.getCover.bind(this);
      this.onSearch = this.onSearch.bind(this);
      this.learnMore = this.learnMore.bind(this);
      this.sleep = this.sleep.bind(this);
    }

    sleep(milliseconds) {
      var start = new Date().getTime();
      for (var i = 0; i < 1e7; i++) {
        if ((new Date().getTime() - start) > milliseconds){
          break;
        }
      }
    }

    getCover(brand_name) {
      let https = require('https');
      let subscriptionKey = 'ebf811d0d7bb493089f573dae59b08ab';
      let host = 'api.cognitive.microsoft.com';
      let path = '/bing/v7.0/images/search';
      let term = brand_name;
      var url;
      let response_handler = function (response) {
          let body = '';
          response.on('data', function (d) {
              body += d;
          });
          response.on('end', function () {
              let json = JSON.parse(body);
              body = JSON.stringify(JSON.parse(body), null, '  ');
              console.log('\nJSON Response:\n');
              var images = json['value']
              for (var key in images) {
                  var val = images[key];
                  var contentURL = val['contentUrl'];
                  var extension = contentURL.slice( -3 );
                  if (extension == "jpg") {
                    url = contentURL;
                    console.log(url);
                    return url;
                  }
              }
          });
          response.on('error', function (e) {
              console.log('Error: ' + e.message);
          });
      };
      let bing_web_search = function (search) {
        console.log('Searching the Web for: ' + term);
        let request_params = {
              method : 'GET',
              hostname : host,
              path : path + '?q=' + encodeURIComponent(search),
              headers : {
                  'Ocp-Apim-Subscription-Key' : subscriptionKey,
              }
          };
          let req = https.request(request_params, response_handler);
          req.end();
      }  
      if (subscriptionKey.length === 32) {
          bing_web_search(term);
      } else {
          console.log('Invalid Bing Search API subscription key!');
          console.log('Please paste yours into the source code.');
      }
    }


    onTrain(ev) {
      const next = () => {
        this.props.history.push({
          pathname: '/train',
          params: {
            email: this.state.email
          }
        })
      } 
      console.log("in train yo");
      console.log(this.state.token);
      // call here to get data sets
      fetch('http://localhost:2000/datasets/', {
        headers: {
          'Authorization': 'Bearer ' + this.state.token,
          'Content-Type': 'application/json',
        }
      }).then(response => 
        response.json())
      .then(json => {
        //this.state.datasets[i].cover,this.state.datasets[i].name, this.state.datasets[i]._id))
        var data = json.datasets;
        var array = [];
        for(var i in data)
        {
          var name = data[i].name;
          var id = data[i]._id;
          var src = data[i].src;
          var data_set = [src, name, id];
          array.push(data_set);
        }
        var str = array.toString();
        cookie.save('datasets', str, { path: '/' , 'maxAge': 100000});
        setTimeout(function(){
          next();
        }, 2000);
      });
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

            <h5> Click to train your datasets or to search online for more logos </h5>
            <div className="header-space"></div>

            <div className="row">

              <div className="column">
                <div className="row">
                  <div className="imgContainer">
                    <div>
                      <img src={require('./images/services/train.jpg')} alt="Image" height="350" width="450"/>
                    </div>
                    <div className="imgButton">
                      <Button onClick={this.onTrain}> Train </Button>
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
                      <Button onClick ={this.onSearch}> Search </Button>
                    </div>
                  </div>
                </div>
              </div>

          </div>
          <div className="bt-space"></div>
          <h5> Interested in how our services can help you? Give us a call! </h5>
          <Button className="learnMoreButton" onClick={this.learnMore}> Learn More </Button>
        </center>
        <Footer/>
    </Container>  
    );
  }
}