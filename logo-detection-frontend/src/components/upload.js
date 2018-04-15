import React from 'react';
import Footer from './footer.js';
import { Container, Button, Form, FormGroup, Input } from 'reactstrap';
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
        currentDataSet: cookie.load('currentDataSet'),
        brand_name: cookie.load('brandName'),
        pictures: [],
        imageUrl: '',
       };
       if (this.state.token === undefined) {
        this.props.history.push('/login');
        return;
      }

      this.onSubmit = this.onSubmit.bind(this);
      this.onDone = this.onDone.bind(this);
    }

    handleUrlChange = (e) => {
      e.preventDefault();
      this.setState({
        imageUrl: e.target.value
      })
    }
        
    onSubmit(ev) {
      ev.preventDefault();
      var picArr = this.state.pictures;

      var imageExists = require('image-exists');
      
      imageExists (this.state.imageUrl, function(exists) {
        if (!exists) {
          console.log("does not exist");
          return;
        }
      });
      
      picArr.push(this.state.imageUrl);
      this.setState({
        imageUrl: ''
      });
    }
    
      onDone(ev) {
        ev.preventDefault();
        console.log("uploading images");
        console.log(this.state.pictures);
        if (this.state.pictures.length === 0) {
          return;
        }
        fetch('http://localhost:2000/datasets/'+ this.state.currentDataSet +'/uploadImages', {
          method: 'POST',
          headers: {
              'Authorization': 'Bearer ' + this.state.token,
              'Accept': 'application/json',
              'Content-Type': 'application/json',
          },
          body: JSON.stringify({
              "images": this.state.pictures,
          })
        }).then(response => response.json())
        .then(data => {
          console.log("data is ");
          console.log(data);
          var imageArray = data['images'];
          cookie.remove('imageJSONS');
          cookie.save('imageJSONS', imageArray.slice(0,20), { path: '/' , 'maxAge': 100000});
          this.props.history.push('/finishPage');
        });
        
      }

    render() {
      return (
      <Container>
          <center>
              <h2> UPLOAD IMAGES FOR YOUR DATASET </h2>
              <h5> Type in the url for an image you'd like to upload to the dataset: { this.state.brand_name } </h5>
              <Form>
              <FormGroup>
                <Input 
                  type="string" 
                  name="imageUrl" 
                  id="imageUrl"
                  placeholder="Enter the image url here"  
                  value={this.state.imageUrl}
                  onChange={this.handleUrlChange}
                />
              </FormGroup>
            </Form>
              <Button className="searchBtn" onClick={this.onSubmit}> Add Image </Button>
              <Button className="searchBtn" onClick={this.onDone}> Done </Button>
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