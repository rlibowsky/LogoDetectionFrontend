import React from 'react';

import { Button, Container, Form, FormGroup, Input } from 'reactstrap';
import Footer from './footer.js';

  export default class SearchResults extends React.Component { 
    constructor(props) {
      super(props);
      this.searchTerms = props.location.params["searchTerms"];
      this.searchResults = [
        "Photo 1",
        "Photo 2",
        "Photo 3",
        "Photo 4",
        "Photo 5",
        "Photo 6",
        "Photo 7",
        "Photo 8",
        "Photo 9",
        "Photo 10",
        "Photo 11",
        "Photo 12",
      ]

      this.searchResultsList = this.searchResults.map(function(photo){
        return <li>{photo}</li>;
      })
    }

  render() {
    return (
    <Container>
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