import React from 'react';
import './datasetlanding.css';
import Footer from './footer.js';
import cookie from "react-cookies";
import Loading from 'react-loading-bar';
import 'react-loading-bar/dist/index.css';
import FaIconPack from 'react-icons/lib/fa';
import ToolTip from 'react-portal-tooltip';
import './finishPage.css';

import { Container, Button } from 'reactstrap';

  export default class DataSetLanding extends React.Component { 
    constructor(props) {
      super(props);

      const imageClick = (is_plus) => {
        if (is_plus === "plus") {
          this.showTip();
        }
      }

      this.state = {
        isOpen: false,
        pictures: [],
        token: cookie.load('token'),
        currentDataSet: cookie.load('currentDataSet'),
        imageJSON: cookie.load('imageJSONS'),
        brandName: cookie.load('brandName'),
        loading: false,
        showToolTipActive: false,
        datasets: cookie.load('datasets')
      };
      if (this.state.token === undefined) {
        this.props.history.push('/login');
        return;
      }
      
      // Image factory
      var createImage = function(src, title) {
        var img   = new Image();
        img.src   = src;
        img.alt   = title;
        img.title = title;
        return img; 
      };

      // array of images
      var images = [];

      for (var i = 0; i < this.state.imageJSON.length; i++) {
        var str = (this.state.imageJSON[i]);
        images.push(createImage(str), str);
      }
      images.push(createImage(require("./images/services/plus.png"), "plus"));
           
      this.dataSetImages = images.map(function(image){
        if (image.src === undefined) {
          return;
        }
        var str = image;
        return <div className="dataSetBox" key = {image.src.toString()} id ={image.title.toString()}> 
        <img height="200" width="250" hspace="20" src={image.src.toString()} onClick={() => imageClick(image.title.toString())}/>
        </div>;
      });

      this.onAddImages = this.onAddImages.bind(this);
      this.onScrape = this.onScrape.bind(this);
      this.learnMore = this.learnMore.bind(this);
      this.nextPage = this.nextPage.bind(this);
      this.showTip = this.showTip.bind(this);
      this.trainClassifiers = this.trainClassifiers.bind(this);
    }

    trainClassifiers() {
      fetch('http://localhost:2000/datasets/' + this.state.currentDataSet + '/classifiers', {
        method: 'GET',
        headers: {
          'Authorization': 'Bearer ' + this.state.token,
          'Content-Type': 'application/json',
        }
      }).then(response => response.json())
      .then(json => {
        cookie.remove('currentClassifiers');
        cookie.save('currentClassifiers', json.classifier, { path: '/' , 'maxAge': 100000});
        this.props.history.push('/trainclassifiers/' + this.state.brandName.toLowerCase());
      });
    }

    learnMore(ev) {
        this.props.history.push('/');
      }

    onAddImages(ev) {
      this.props.history.push('/upload');
    }
    
    onScrape = (e) => {
      
    }


    nextPage() {
      cookie.save('searchTerms', this.state.brandName, { path: '/' , 'maxAge': 100000});
      cookie.save('searchResults', this.state.imageJSON, { path: '/' , 'maxAge': 100000});
    }

    showTip(ev) {
      this.setState({
        showToolTipActive: !this.state.showToolTipActive
      });
    }

  render() {
    return (
      <Container>
        <center>
            <h2> {this.state.brandName} </h2>
            <div className="header-space"></div>
            <div className="box" id="dsImages">
                  {this.dataSetImages}
            </div>
            <ToolTip active={this.state.showToolTipActive} parent="#plus" position="right" arrow="center" >
              <div className="imgButton">
                <Button onClick={this.onAddImages}> Upload Images </Button>
              </div>
              <div className="imgButton">
                <Button onClick ={this.onScrape}> Scrape </Button>
                <Loading show={this.state.loading} color="red" />
              </div>
            </ToolTip>
          <Button onClick={this.trainClassifiers}> Train Classifiers </Button>
          <div className="bt-space"></div>
          <h5> Interested in how our services can help you? Give us a call! </h5>
          <Button className="learnMoreButton" onClick={this.learnMore}> Learn More </Button>
        </center>
        
        <Footer/>
    </Container>  
  );
    
  }
}