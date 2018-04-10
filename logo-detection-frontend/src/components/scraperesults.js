import React from 'react';
import Footer from './footer.js';
import cookie from "react-cookies";
import 'react-loading-bar/dist/index.css';
import './scraperesults.css';
import { Container, Form, FormGroup, Input, Label } from 'reactstrap';

  export default class ScrapeResults extends React.Component { 
    constructor(props) {
      super(props);
      this.state = {
        token: cookie.load('token'),
        loading: false,
        sortBy: 'classifierAccuracy',
        currentDataSet: cookie.load('currentDataSet'),
        imageJSON: cookie.load('imageJSONS'),
        brandName: cookie.load('brandName'),
        loading: false,
        datasets: cookie.load('datasets')
      }
      if (this.state.token === undefined) {
        this.props.history.push('/login');
        return;
      }
      this.nextPage = this.nextPage.bind(this);
      this.handleSortChange = this.handleSortChange.bind(this);

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
        
              for (var i = 0; i < this.state.imageJSON.length; i++) {
                var str = (this.state.imageJSON[i]);
                images.push(createImage(str), str);
              }
                   
              this.dataSetImages = images.map(function(image){
                if (image.src === undefined) {
                  return;
                }
                var str = image;
                return <div className="dataSetBox" key = {image.src.toString()} id ={image.title.toString()}> 
                <img height="200" width="250" hspace="20" src={image.src.toString()}/>
                </div>;
                
              });

    }
    handleSortChange(event) {
        this.setState({
            sortBy: event.target.value
        });
        this.render();
    }

    handleSubmit = (e) => {

    }

    nextPage() {
      this.props.history.push('/search');
    }

  render() {
      console.log("state is " + (this.state.sortBy === "numClassifiers"));
    return (
    <Container>
        <center>
            <h2> RESULTS </h2>
            <div className="header-space"></div>
            <div className="box" id="dsImages">
                  {this.dataSetImages}
            </div>
            <div>
          </div>
        </center>
        <Footer/>
    </Container>  
    );
  }
}