import React from 'react';
import Footer from './footer.js';
import { Container } from 'reactstrap';
import ImagesUploader from 'react-images-uploader';
import 'react-images-uploader/styles.css';
import 'react-images-uploader/font.css';

  export default class Train extends React.Component { 
    constructor(props) {
      super(props);
      this.state = { pictures: [] };
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