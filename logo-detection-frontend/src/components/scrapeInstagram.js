import React from 'react';
import cookie from "react-cookies";
import { Container, Button} from 'reactstrap';
import Footer from './footer.js';
import './scrapeInstagram.css';

const CSSVariables = {
  border : {
      border : '2px solid green'
  },
  noBorder : {
      border : '2px solid transparent'
  },
};


  export default class ScrapeInstagram extends React.Component { 
    constructor(props) {
      super(props);
      this.state = {
        token: cookie.load('token'),
        selectedImages: [],
        showBorder : false
      };
      if (this.state.token === undefined) {
        this.props.history.push('/login');
        return;
      }
      this.searchTerms = props.location.params["searchTerms"];
      this.searchResults = props.location.params["searchResults"].filePaths;
      this.imageClick = this.imageClick.bind(this);
      this.finish = this.finish.bind(this);
    }

    imageClick(image_src) {
      this.setState(state => ({ showBorder: !state.showBorder }))
      this.state.selectedImages.push(image_src);
      console.log(image_src);
    }
    finish() {
      this.props.history.push({
        pathname: '/finishPage',
        params: {
          selectedImages: this.state.selectedImages
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
              return <div className="dataSetBox" key={photo.toString()}><img id={this.state.ID} src={photo} onClick={() => { this.imageClick(photo.toString()) }} style={this.state.showBorder ? CSSVariables.border : CSSVariables.noBorder} alt="Image" height="350" width="450" margin="100px" /></div>;
            })}
            </div>
        </center>
        <Button onClick={this.finish}> FINISHED </Button>
        <Footer/>
    </Container>  
    );
  }
}