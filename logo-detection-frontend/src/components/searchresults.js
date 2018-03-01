import React from 'react';

import { Container } from 'reactstrap';
import Footer from './footer.js';
import Header from './header.js';
import cookie from "react-cookies";

  export default class SearchResults extends React.Component { 
    constructor(props) {
      super(props);
      this.searchTerms = props.location.params["searchTerms"];
      this.searchResults = props.location.params["searchResults"].filePaths;
      console.log(props.location.params["searchResults"].filePaths);

      this.searchResultsList = this.searchResults.map(function(photo){
        return <li key={photo.toString()} ><img src={photo} alt="Image" height="350" width="450"/></li>;
      })
    }

  render() {
    return (
    <Container>
    <Header {...this.props}/>
        <center>
            <h1> SEARCH </h1>
            <h3> {this.searchTerms} </h3>
            <ul>
                {this.searchResultsList}
            </ul>
        </center>
        <Footer/>
    </Container>  
    );
  }
}