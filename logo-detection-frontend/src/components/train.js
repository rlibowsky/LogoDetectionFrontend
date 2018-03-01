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
      var dummyBrandNames = ["Nike", "Patagonia", "Lululemon", "Adidas", "Reebok", "Under Armour"];

      this.dummyBrandNamesList = dummyBrandNames.map(function(brandName){
        return <li key={brandName.toString()} > {brandName} </li>;
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
              <ul>
                  {this.dummyBrandNamesList}
              </ul>
              <div>
            </div>
          </center>
          <Footer/>
      </Container>  
      );
    }
}