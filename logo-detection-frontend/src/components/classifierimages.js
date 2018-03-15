import React from 'react';
import './datasetlanding.css';
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
        imageJSON: [],
        loading: false,
        showToolTipActive: false
      };
      
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
           
      this.dataSetImages = images.map(function(image, i){
        var str = image.src.toString();
        var parentKey = "#" + image.title.toString();
        return <div className="dataSetBox" key = {image.src.toString()} id ={image.title.toString()} > 
        <img height="100px" width="100px" src={image.src}/>
        </div>;
        
      });

    }

  render() {
    return (
      <Container>
        <center>
            <div className="box" id="dsImages">
                  {this.dataSetImages}
            </div>
            
        </center>
    </Container>  
  );
    
  }
}