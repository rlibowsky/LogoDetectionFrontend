import React from 'react';
import Footer from './footer.js';
import { Container, Button } from 'reactstrap';
import ImagesUploader from 'react-images-uploader';
import 'react-images-uploader/styles.css';
import 'react-images-uploader/font.css';
import './train.css';
import cookie from "react-cookies";

  export default class Train extends React.Component { 
    constructor(props) {
      super(props);
      const imageClick = (brand_name) => {
        this.state.brand_name = brand_name;
        this.props.history.push({
          pathname: '/datasetlanding',
          params: {
            brandName: this.state.brand_name
          }
        });
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
      images.push(createImage("http://content.nike.com/content/dam/one-nike/globalAssets/social_media_images/nike_swoosh_logo_black.png", "Nike"));
      images.push(createImage("http://1000logos.net/wp-content/uploads/2017/11/logo-Patagonia.jpg", "Patagonia"));
      images.push(createImage("https://www.shopirvinecompany.com/media/8524/store-logo-lululemon.jpg", "Lululemon"));
      images.push(createImage("https://seeklogo.com/images/A/adidas-logo-49D5BEBA90-seeklogo.com.png", "Adidas"));
      images.push(createImage("http://1000logos.net/wp-content/uploads/2017/06/Logo-Under-Armour.jpg", "Under Armour"));
      images.push(createImage("https://assets.lookbookspro.com/amanacliq/gm_5a29ffe2-7840-445e-bbaf-158fac11000a.jpg", "Converse"));
           
      this.BrandNamesList = images.map(function(image, i){
        return <div className="dataSetBox" key = {image.src.toString()}> 
        <button> <img height="300px" width="300px" src={image.src.toString()} onClick={() => imageClick(image.title.toString())}/> {image.title.toString()}</button> 
        </div>;
      })
      this.onSubmit = this.onSubmit.bind(this);
    }

    onSubmit(ev) {
      this.state.pictures = [];
    }

    render() {
      return (
      <Container>
          <center>
              <h5> CREATE A NEW DATA SET </h5>
              <ImagesUploader
                url="http://localhost:9090/multiple"
                optimisticPreviews
                onLoadEnd={(err) => {
                    if (err) {
                        console.error(err);
                    }
                }}
                label=""
                />
                <Button className="searchBtn" disabled={this.state.pictures.length > 0} onClick={this.onSubmit}> Submit </Button>
              <div className="header-space"></div>
              <h5> YOUR DATA SETS </h5>
              <div className="box">
                  {this.BrandNamesList}
              </div>
              <div>
            </div>
          </center>
          <div className="header-space"></div>
          <Footer/>
      </Container>  
      );
    }
}