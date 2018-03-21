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
        console.log(is_plus);
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
      console.log("in train ");
      console.log(cookie.load('imageJSONS'));
      
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
        var str = ('http://localhost:2000/' + this.state.imageJSON[i]);
        images.push(createImage(str), str);
      }
      images.push(createImage(require("./images/services/plus.png"), "plus"));


      // push two images to the array
      // images.push(createImage("http://content.nike.com/content/dam/one-nike/globalAssets/social_media_images/nike_swoosh_logo_black.png", "1"));
      // images.push(createImage("http://content.nike.com/content/dam/one-nike/globalAssets/social_media_images/nike_swoosh_logo_black.png", "2"));
      // images.push(createImage("http://content.nike.com/content/dam/one-nike/globalAssets/social_media_images/nike_swoosh_logo_black.png", "3"));
      // images.push(createImage("http://content.nike.com/content/dam/one-nike/globalAssets/social_media_images/nike_swoosh_logo_black.png", "4"));
      // images.push(createImage("http://content.nike.com/content/dam/one-nike/globalAssets/social_media_images/nike_swoosh_logo_black.png", "5"));
      // images.push(createImage("http://content.nike.com/content/dam/one-nike/globalAssets/social_media_images/nike_swoosh_logo_black.png", "6"));
      // images.push(createImage(require("./images/services/plus.png"), "plus"));

      console.log("images is " + images);
           
      this.dataSetImages = images.map(function(image){
        if (image.src === undefined) {
          return;
        }
        console.log('image is' + image);
        console.log('src is ' + image.src.toString());
        
        var str = image;
        return <div className="dataSetBox" key = {image.src.toString()} id ={image.title.toString()} > 
        <img height="300px" width="300px" src={image.src.toString()} onClick={() => imageClick(image.title.toString())}/>
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
      console.log("training those classifiers");
      // fetch('http://localhost:2000/datasets/'+ this.state.currentDataSet + '/classifiers', {
      //   method: 'POST',
      //   headers: {
      //     'Authorization': 'Bearer ' + this.state.token,
      //     'Content-Type': 'application/json',
      //   },
      //   body: JSON.stringify({
      //     "name": ("swimming").toLowerCase(),
      //     "description": ("front stroke, back stroke").toLowerCase(),
      //   })
      // }).then(response => response.json())
      // .then(json => {
      //   this.state.imageJSON = json;
      //   console.log(this.state.imageJSON);
      //   this.setState({
      //     loading: false
      //   })
      // });
      fetch('http://localhost:2000/datasets/' + this.state.currentDataSet + '/classifiers', {
        method: 'GET',
        headers: {
          'Authorization': 'Bearer ' + this.state.token,
          'Content-Type': 'application/json',
        }
      }).then(response => response.json())
      .then(json => {
        console.log("classifier response");
        console.log(json);
        cookie.remove('currentClassifiers');
        cookie.save('currentClassifiers', json.classifier, { path: '/' , 'maxAge': 100000});
        this.props.history.push('/trainclassifiers');

      });
    }

    learnMore(ev) {
        this.props.history.push('/');
      }

    onAddImages(ev) {
      this.props.history.push('/upload');
    }
    onScrape = (e) => {
      var hashtag = prompt("Enter the #hashtag you want to scrape", "hashtag");
      e.preventDefault();
      this.setState({
        loading: true
      })
      // fetch('http://localhost:2000/scrape/', {
      //   method: 'POST',
      //   headers: {
      //     'Accept': 'application/json',
      //     'Content-Type': 'application/json',
      //   },
      //   body: JSON.stringify({
      //     "hashtag": (this.state.brandName).toLowerCase(),
      //     "image_count": "30"
      //   })
      // }).then(response => response.json())
      // .then(json => {
      //   this.state.imageJSON = json;
      //   this.setState({
      //     loading: false,
      //     brandName: this.state.brandName
      //   })
      // })
      // .then(this.nextPage);

      fetch('http://localhost:2000/datasets/'+ this.state.currentDataSet + '/scrape', {
      method: 'POST',
      headers: {
        'Authorization': 'Bearer ' + this.state.token,
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        "hashtag": hashtag.toLowerCase(),
        "image_count": "10"
      })
    }).then(response => response.json())
    .then(json => {
      console.log("NIKE PHOTOS");
      console.log(json);
      fetch('http://localhost:2000/datasets/'+ this.state.currentDataSet +'/', {
        method: 'GET',
        headers: {
          'Authorization': 'Bearer ' + this.state.token,
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        }
      }).then(response => response.json())
      .then(json => {
        this.state.imageJSON = json.images.slice(0,20);
        console.log(json.images);
        cookie.remove('imageJSONS');
        cookie.save('imageJSONS', this.state.imageJSON, { path: '/' , 'maxAge': 100000});
        console.log(cookie.load('imageJSONS'));
        window.location.reload();

      });
    });
      //.then(this.nextPage);
    }
    nextPage() {
      cookie.save('searchTerms', this.state.brandName, { path: '/' , 'maxAge': 100000});
      cookie.save('searchResults', this.state.imageJSON, { path: '/' , 'maxAge': 100000});
      this.props.history.push('/scrapeInstagram');
    }

    showTip(ev) {
      console.log("in showTip");
      this.setState({
        showToolTipActive: !this.state.showToolTipActive
      });
    }

  render() {
    console.log('tool tip state is ' + this.state.showToolTipActive);
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
            

          <Button onClick={this.trainClassifiers}> Train Classifiers </Button>
          <h5> Interested in how our services can help you? Give us a call! </h5>
          <Button className="learnMoreButton" onClick={this.learnMore}> Learn More </Button>
        </center>
        <Footer/>
    </Container>  
  );
    
  }
}