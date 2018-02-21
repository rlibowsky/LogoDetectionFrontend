import React from 'react';
import Footer from './footer.js';
import { Container } from 'reactstrap';

  export default class Train extends React.Component { 
    constructor(props) {
      super(props);
      this.state = { pictures: [] };
      this.onDrop = this.onDrop.bind(this);
    }

    onDrop(picture) {
      this.setState({
          pictures: this.state.pictures.concat(picture),
      });
    }

    render() {
      return (
      <Container>
          <center>
              <h5> Upload images containing your brand logo </h5>
              <div class="header-space"></div>
              <div class="header-space"></div>
              <h5> Drag all the photos that resemble your brand's logo. We will do the work from 
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