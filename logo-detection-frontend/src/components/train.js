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
      const imageClick = () => {
        console.log(this.state.brand_name);
        this.props.history.push({
          pathname: '/datasetlanding',
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
      var dummyBrandNames = ["Nike", "Patagonia", "Lululemon", "Adidas", "Reebok", "Under Armour"];

      this.dummyBrandNamesList = dummyBrandNames.map(function(brandName){
        return 
        <div className="dataSetBox" key={brandName.toString()} >
          <button> 
            <img height="300px" width="300px" src="http://content.nike.com/content/dam/one-nike/globalAssets/social_media_images/nike_swoosh_logo_black.png" onClick={imageClick()}
            />
          </button> 
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
              <h5> Upload images containing your brand logo </h5>
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
                  {this.dummyBrandNamesList}
                  
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