import React from 'react';
import Footer from './footer.js';
import { Container, Button } from 'reactstrap';
import ImagesUploader from 'react-images-uploader';
import 'react-images-uploader/styles.css';
import 'react-images-uploader/font.css';
import cookie from "react-cookies";

  export default class Train extends React.Component { 
    constructor(props) {
      super(props);
      
      this.state = { 
        pictures: [],
        token: cookie.load('token')
       };
       if (this.state.token === undefined) {
        this.props.history.push('/login');
        return;
      }
      this.onSubmit = this.onSubmit.bind(this);
    }

    onSubmit(ev) {
      this.state.pictures = [];
    }

    render() {
      return (
      <Container>
          <center>
              <h5> Upload images containing your brand logo </h5>
              <div class="header-space"></div>
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
              <div class="header-space"></div>
              <h5> Upload all the photos that resemble your brand's logo. We will do the work from 
                there to assess and determine how to best </h5>
              <h5> recognize your logo on social media. </h5>
              <div>
            </div>
          </center>
          <Footer/>
      </Container>  
      );
    }
}