import React from 'react';
import './datasetlanding.css';
import cookie from "react-cookies";
import Loading from 'react-loading-bar';
import 'react-loading-bar/dist/index.css';
import FaIconPack from 'react-icons/lib/fa';
import ToolTip from 'react-portal-tooltip';

import { Container, Button } from 'reactstrap';

const CSSVariables = {
    border : {
        border : '10px solid green'
    },
    noBorder : {
        border : '10px solid transparent'
    },
  };

  export default class DataSetLanding extends React.Component { 
    constructor(props) {
      super(props);
      this.state = {
        isOpen: false,
        pictures: [],
        imageJSON: [],
        loading: false,
        showToolTipActive: false,
        classifierName: this.props.classifierName
      };
      this.selectedImages = [];

      this.imageClick = this.imageClick.bind(this);
      this.setBorder = this.setBorder.bind(this);
      
            // Image factory
      var createImage = function(src, title) {
        var img   = new Image();
        img.src   = src;
        img.alt   = title;
        img.title = title;
        return img; 
      };
      // array of images
      this.images = [];
      // push two images to the array
      this.images.push(createImage("http://content.nike.com/content/dam/one-nike/globalAssets/social_media_images/nike_swoosh_logo_black.png", "1"));
      this.images.push(createImage("http://content.nike.com/content/dam/one-nike/globalAssets/social_media_images/nike_swoosh_logo_black.png", "2"));
      this.images.push(createImage("http://content.nike.com/content/dam/one-nike/globalAssets/social_media_images/nike_swoosh_logo_black.png", "3"));
      this.images.push(createImage("http://content.nike.com/content/dam/one-nike/globalAssets/social_media_images/nike_swoosh_logo_black.png", "4"));
      this.images.push(createImage("http://content.nike.com/content/dam/one-nike/globalAssets/social_media_images/nike_swoosh_logo_black.png", "5"));
      this.images.push(createImage("http://content.nike.com/content/dam/one-nike/globalAssets/social_media_images/nike_swoosh_logo_black.png", "6"));

    }

    imageClick(image_src) {
        if (this.selectedImages.includes(image_src)){
          const index = this.selectedImages.indexOf(image_src);
          this.selectedImages.splice(index, 1);
  
        }
        else {
          this.selectedImages.push(image_src);
        }
        this.forceUpdate();
      }
  
      setBorder(image_src) {
        if (this.selectedImages.includes(image_src)){
          return CSSVariables.border;
        }
        else {
          return CSSVariables.noBorder;
        }
      }

  render() {
    return (
      <Container>
        <center>
            <div className="box">
            {this.images.map((photo) => {
              return <div className="dataSetBox" key={photo.src.toString()} margin= '30px' ><img id={this.state.ID} src={photo.src.toString()} onClick={() => { this.imageClick(photo.src.toString()) }} style={this.setBorder(photo.src.toString())} alt="Image" height="100" width="100" /></div>;
            })}
            </div>
            
        </center>
    </Container>  
  );
    
  }
}