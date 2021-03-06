import React from 'react';
import './portal.css';

import Footer from './footer.js';
import cookie from "react-cookies";
import { searchImages } from 'pixabay-api';
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
      this.onSearch = this.onSearch.bind(this);
      this.learnMore = this.learnMore.bind(this);
      
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
        for(var i in data)
        {
          var name = data[i].name;
          var url = "";
          let term = name.toString().toLowerCase();
          const AUTH_KEY = "8703238-5ba1c3ae204d8beb21f648965";
          searchImages(AUTH_KEY, term, {per_page: 5})
          .then((r) => {
            var imgArray = [];
            imgArray = r['hits'];
            if (imgArray.length == 0) {
              url = "https://www.iconsdb.com/icons/preview/caribbean-blue/database-5-xxl.png";
              var datasetName = "datasetURL: " + term;
              cookie.save(datasetName, url, { path: '/' , 'maxAge': 100000});
            }
            else {
              var imgSrc = imgArray[0]['largeImageURL'];
              var datasetName = "datasetURL: " + term;
              cookie.save(datasetName, imgSrc, { path: '/' , 'maxAge': 100000});
            }
          }
        );
        }
        });
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
          var name = (data[i].name).toLowerCase();
          console.log(name);
          var key = "datasetURL: " + name;
          var id = data[i]._id;
          var src = cookie.load(key);
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