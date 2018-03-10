import React from 'react';
import './datasetlanding.css';
import Footer from './footer.js';
import cookie from "react-cookies";
import Loading from 'react-loading-bar';
import 'react-loading-bar/dist/index.css';
import FaIconPack from 'react-icons/lib/fa';

import { Container, Button } from 'reactstrap';

  export default class DataSetLanding extends React.Component { 
    constructor(props) {
      super(props);
      const imageClick = (brand_name) => {
        if (brand_name.equals("")) {
          return;
        }
        return;
      }
      this.state = {
        isOpen: false,
        token: cookie.load('token'),
        imageJSON: [],
        brandName: cookie.load('brandName'),
        loading: false
      };
      if (this.state.token === undefined) {
        this.props.history.push('/login');
        return;
      }

      this.state = { 
        pictures: [],
        token: cookie.load('token'),
        brand_name: ''
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
      // push two images to the array
      images.push(createImage("http://content.nike.com/content/dam/one-nike/globalAssets/social_media_images/nike_swoosh_logo_black.png", ""));
      images.push(createImage("http://content.nike.com/content/dam/one-nike/globalAssets/social_media_images/nike_swoosh_logo_black.png", ""));
      images.push(createImage("http://content.nike.com/content/dam/one-nike/globalAssets/social_media_images/nike_swoosh_logo_black.png", ""));
      images.push(createImage("http://content.nike.com/content/dam/one-nike/globalAssets/social_media_images/nike_swoosh_logo_black.png", ""));
      images.push(createImage("http://content.nike.com/content/dam/one-nike/globalAssets/social_media_images/nike_swoosh_logo_black.png", ""));
      images.push(createImage("http://content.nike.com/content/dam/one-nike/globalAssets/social_media_images/nike_swoosh_logo_black.png", ""));
      images.push(createImage("react-icons/lib/fa/plus-circle", "plus"));
           
      this.dataSetImages = images.map(function(image, i){
        return <div className="dataSetBox" key = {image.src.toString()}> 
        <Button> <img height="300px" width="300px" faIcon={image.title.toString()} src={image.src.toString()} onClick={() => imageClick(image.title.toString())}/> </Button>
        </div>;
      });



      this.onAddImages = this.onAddImages.bind(this);
      this.onScrape = this.onScrape.bind(this);
      this.learnMore = this.learnMore.bind(this);
      this.nextPage = this.nextPage.bind(this);
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
      this.props.history.push({
        pathname: '/scrapeInstagram',
        params: {
          email: this.email,
          searchTerms: this.state.brandName,
          searchResults: this.state.imageJSON
        }
      })
    }

  render() {
    return (
      <Container>
        <center>
            <h2> {this.state.brandName} </h2>
            <div className="header-space"></div>
            <div className="box">
                  {this.dataSetImages}
            </div>


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