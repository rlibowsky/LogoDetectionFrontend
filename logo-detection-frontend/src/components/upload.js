import React from 'react';
import Footer from './footer.js';
import { Container, Button } from 'reactstrap';
import ImagesUploader from 'react-images-uploader';
import 'react-images-uploader/styles.css';
import 'react-images-uploader/font.css';
import './train.css';
import cookie from "react-cookies";

  export default class Upload extends React.Component { 
    constructor(props) {
      super(props);
      this.state = { 
        token: cookie.load('token'),
        brand_name: '',
        pictures: []
       };
       if (this.state.token === undefined) {
        this.props.history.push('/login');
        return;
      }

      this.onSubmit = this.onSubmit.bind(this);
    }
        
    onSubmit(ev) {
        this.state.pictures = [];
        this.props.history.push({
            pathname: '/finishPage',
            params: {
              pictures: this.state.pictures
            }
          });
      }

    render() {
      return (
      <Container>
          <center>
              <h5> UPLOAD IMAGES FOR YOUR DATASET </h5>
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
              <div>
            </div>
          </center>
          <div className="header-space"></div>
          <Footer/>
      </Container>  
      );
    }
}