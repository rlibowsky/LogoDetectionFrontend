import React from 'react';
import './datasetlanding.css';
import Footer from './footer.js';
import cookie from "react-cookies";
import Loading from 'react-loading-bar';
import 'react-loading-bar/dist/index.css';
import FaIconPack from 'react-icons/lib/fa';
import ToolTip from 'react-portal-tooltip';

import { Container, Button } from 'reactstrap';

  export default class DataSetLanding extends React.Component { 
    constructor(props) {
      super(props);
      const imageClick = (is_plus) => {
        console.log(is_plus);
        if (is_plus === "plus") {
          this.showTip();
        }
        
      }
      this.state = {
        isOpen: false,
        pictures: [],
        token: cookie.load('token'),
        imageJSON: [],
        brandName: cookie.load('brandName'),
        loading: false,
        showToolTipActive: false
      };
      if (this.state.token === undefined) {
        this.props.history.push('/login');
        return;
      }

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
      // push two images to the array
      images.push(createImage("http://content.nike.com/content/dam/one-nike/globalAssets/social_media_images/nike_swoosh_logo_black.png", "1"));
      images.push(createImage("http://content.nike.com/content/dam/one-nike/globalAssets/social_media_images/nike_swoosh_logo_black.png", "2"));
      images.push(createImage("http://content.nike.com/content/dam/one-nike/globalAssets/social_media_images/nike_swoosh_logo_black.png", "3"));
      images.push(createImage("http://content.nike.com/content/dam/one-nike/globalAssets/social_media_images/nike_swoosh_logo_black.png", "4"));
      images.push(createImage("http://content.nike.com/content/dam/one-nike/globalAssets/social_media_images/nike_swoosh_logo_black.png", "5"));
      images.push(createImage("http://content.nike.com/content/dam/one-nike/globalAssets/social_media_images/nike_swoosh_logo_black.png", "6"));
      images.push(createImage(require("./images/services/plus.png"), "plus"));
           
      this.dataSetImages = images.map(function(image, i){
        var str = image.src.toString();
        var parentKey = "#" + image.title.toString();
        return <div className="dataSetBox" key = {image.src.toString()} id ={image.title.toString()} > 
        <Button> <img height="300px" width="300px" src={image.src} onClick={() => imageClick(image.title.toString())}/> </Button>
        </div>;
        
      });



      this.onAddImages = this.onAddImages.bind(this);
      this.onScrape = this.onScrape.bind(this);
      this.learnMore = this.learnMore.bind(this);
      this.nextPage = this.nextPage.bind(this);
      this.showTip = this.showTip.bind(this);
    }

    learnMore(ev) {
        this.props.history.push('/');
      }

    onAddImages(ev) {
      this.props.history.push({
        pathname: '/upload',
        params: {
          email: this.state.email
        }
      });
    }
    onScrape = (e) => {
      e.preventDefault();
      this.setState({
        loading: true
      })
      fetch('http://localhost:2000/scraper/', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          "hashtag": (this.state.brandName).toLowerCase(),
          "image_count": "30"
        })
      }).then(response => response.json())
      .then(json => {
        this.state.imageJSON = json;
        this.setState({
          loading: false,
          brandName: this.state.brandName
        })
      })
      .then(this.nextPage);
    }
    nextPage() {
      cookie.save('searchTerms', this.state.brandName, { path: '/' , 'maxAge': 100000});
      cookie.save('searchResults', this.state.imageJSON, { path: '/' , 'maxAge': 100000});
      this.props.history.push({
        pathname: '/scrapeInstagram',
        params: {
          email: this.email,
          searchTerms: this.state.brandName,
          searchResults: this.state.imageJSON
        }
      })
    }

    showTip(ev) {
      console.log("in showTip");
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
                <Button onClick ={this.onScrape}> Scrape Instagram </Button>
                <Loading show={this.state.loading} color="red" />
              </div>
            </ToolTip>
            


          <h5> Interested in how our services can help you? Give us a call! </h5>
          <Button className="learnMoreButton" onClick={this.learnMore}> Learn More </Button>
        </center>
        <Footer/>
    </Container>  
);
    {/* <Container>
        <center>
            <h2> {this.state.brandName} </h2>
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
                      <img src={require('./images/services/instagram.png')} alt="Image" height="350" width="450"/>
                    </div>
                    <div className="imgButton">
                      <Button onClick ={this.onScrape}> Scrape Instagram </Button>
                      <Loading
                        show={this.state.loading}
                        color="red"
                      />
                    </div>
                  </div>
                </div>
              </div>

          </div>
          <h5> Interested in how our services can help you? Give us a call! </h5>
          <Button className="learnMoreButton" onClick={this.learnMore}> Learn More </Button>
        </center>
        <Footer/>
    </Container>   */}
    
  }
}