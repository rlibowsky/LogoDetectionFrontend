import React from 'react';
import cookie from "react-cookies";
import { Container } from 'reactstrap';
import Footer from './footer.js';
import './searchresults.css';

  export default class SearchResults extends React.Component { 
    constructor(props) {
      super(props);
      this.state = {
        token: cookie.load('token')
      };
      if (this.state.token === undefined) {
        this.props.history.push('/login');
        return;
      }
      this.searchTerms = props.location.params["searchTerms"];
      this.searchResults = props.location.params["searchResults"].filePaths;

      this.searchResultsList = this.searchResults.map(function(photo){
        return <div className="dataSetBox" key={photo.toString()} ><img src={photo} alt="Image" height="350" width="450" margin="10px" /></div>;
      })
    }

  render() {
    window.history.pushState(null, null, '/login');
    return (
    <Container>
        <center>
            <h1> SEARCH </h1>
            <h3> {this.searchTerms} </h3>
            <div className="box">
                {this.searchResultsList}
            </div>
        </center>
        <Footer/>
    </Container>  
    );
  }
}