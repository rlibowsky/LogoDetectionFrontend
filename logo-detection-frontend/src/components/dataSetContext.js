import React from 'react';
import './datasetlanding.css';
import Footer from './footer.js';
import cookie from "react-cookies";
import Loading from 'react-loading-bar';
import 'react-loading-bar/dist/index.css';

import { Container, Button } from 'reactstrap';

  export default class DataSetContext extends React.Component { 
    constructor(props) {
      super(props);

      this.state = {
        isOpen: false,
        pictures: [],
        token: cookie.load('token'),
        currentDataSet: cookie.load('currentDataSet'),
        imageJSON: cookie.load('imageJSONS'),
        imagesWithContexts: cookie.load('imagesWithContexts'),
        brandName: cookie.load('brandName'),
        loading: false,
        showToolTipActive: false,
        datasets: cookie.load('datasets')
      };
      console.log("images w contexts");
      console.log(this.state.imagesWithContexts);
      if (this.state.token === undefined) {
        this.props.history.push('/login');
        return;
      }
      
      // Image factory
      var createImage = function(src, title, context) {
        var img   = new Image();
        img.src   = src;
        img.alt   = title;
        img.title = title;
        img.context = context.map(function(c) {
          console.log("c is ");
          console.log(c);
          return <div align="left"> Classifier: {c[0].classifier} <div align="center"> Values: {c[0].values}</div> </div>
        });
        return img; 
      };

      // array of images
      var images = [];

      for (var i = 0; i < this.state.imagesWithContexts.length; i++) {
        var str = (this.state.imagesWithContexts[i].url);
        var results = [];
        if (this.state.imagesWithContexts[i].results !== undefined) {
          if (this.state.imagesWithContexts[i].results.length > 0) {
            for (var res in this.state.imagesWithContexts[i].results) {
              results.push(this.state.imagesWithContexts[i].results[res]);
            }
          }
        }
        images.push(createImage(str, str, results), str);
      }
           
      this.dataSetImages = images.map(function(image){
        if (image.src === undefined) {
          return;
        }
        // console.log("image context is ");
        // console.log(image.context);
        // var vals = "";
        // for (var c in image.context) {
        //   console.log("here we have");
        //   console.log(image.context[c]);
        //   // if (image.context.values[i] !== "'") {
        //   //   vals = vals + image.context.values[i];
        //   // }
        // }
        return <div className="dataSetBox" key = {image.src.toString()} id ={image.title.toString()}> 
        <img height="200" width="250" hspace="20" src={image.src.toString()}/>
        <div> {image.context} </div>
        </div>;
      });

      this.learnMore = this.learnMore.bind(this);
      this.showTip = this.showTip.bind(this);
    }

    learnMore(ev) {
        this.props.history.push('/');
      }

    showTip(ev) {
      this.setState({
        showToolTipActive: !this.state.showToolTipActive
      });
    }

  render() {
    return (
      <Container>
        <center>
            <h2> Get Insights on your {this.state.brandName} dataset </h2>
            <div className="header-space"></div>
            <div className="box" id="dsImages">
                  {this.dataSetImages}
            </div>
          <div className="bt-space"></div>
          <h5> Interested in how our services can help you? Give us a call! </h5>
          <Button className="learnMoreButton" onClick={this.learnMore}> Learn More </Button>
        </center>
        
        <Footer/>
    </Container>  
  );
    
  }
}