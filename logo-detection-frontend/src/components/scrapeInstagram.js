import React from 'react';
import cookie from "react-cookies";
import { Container, Button} from 'reactstrap';
import Footer from './footer.js';
import './scrapeInstagram.css';

const CSSVariables = {
  border : {
      border : '10px solid green'
  },
  noBorder : {
      border : '10px solid transparent'
  },
};


  export default class ScrapeInstagram extends React.Component { 
    constructor(props) {
      super(props);
      this.state = {
        token: cookie.load('token'),
        showBorder : false,
        lastClicked: ''
      };
      if (this.state.token === undefined) {
        this.props.history.push('/login');
        return;
      }
      this.selectedImages = [];
      this.searchTerms = cookie.load("searchTerms");
      this.searchResults = cookie.load("searchResults");
      this.imageClick = this.imageClick.bind(this);
      this.finish = this.finish.bind(this);
      this.setBorder = this.setBorder.bind(this);
    }

    imageClick(image_src) {
      if (this.selectedImages.includes(image_src)){
        const index = this.selectedImages.indexOf(image_src);
        this.selectedImages.splice(index, 1);
        console.log("removing");

      }
      else {
        this.selectedImages.push(image_src);
        console.log("pushing");
      }
      this.forceUpdate()
    }

    setBorder(image_src) {
      if (this.selectedImages.includes(image_src)){
        return CSSVariables.border;
      }
      else {
        return CSSVariables.noBorder;
      }
    }
    finish() {
      this.props.history.push({
        pathname: '/finishPage',
        params: {
          selectedImages: this.selectedImages
        }
      });
    }

  render() {
    return (
    <Container>
        <center>
            <h1> SCRAPE INSTAGRAM </h1>
            <h3> {this.searchTerms} </h3>
            <h5> SELECT IMAGES THAT SHOW YOUR LOGO </h5>
            <div className="box">
            {this.searchResults.map((photo) => {
              return <div className="dataSetBox" key={photo.toString()} margin= '30px' ><img id={this.state.ID} src={photo} onClick={() => { this.imageClick(photo.toString()) }} style={this.setBorder(photo.toString())} alt="Image" height="200" width="250" /></div>;
            })}
            </div>
        </center>
        <Button onClick={this.finish}> FINISHED </Button>
        <Footer/>
    </Container>  
    );
  }
}