import React from 'react';
import './search.css';
import Footer from './footer.js';

import { Button, Container, Form, FormGroup, Input } from 'reactstrap';

  export default class Search extends React.Component { 
    constructor(props) {
      super(props);
      this.searchLogo = this.searchLogo.bind(this);
    }

    searchLogo(ev) {
      const data = {
        val: document.getElementById("searchTerms").value
      }
      this.props.history.push({
        pathname: '/searchresults',
        params: {
          searchTerms: data.val
        }
      });
    }

  render() {
    return (
    <Container>
        <center>
            <h2> SEARCH </h2>
            <div className="header-space"></div>
            <Form>
            <FormGroup> 
              <Input type="text" id="searchTerms" placeholder="Enter logo name" className="searchBox"/>
              <Button onClick={this.searchLogo}  className="searchBtn"> Search </Button>
              </FormGroup>
            </Form>
            <div>
          </div>
        </center>
        <Footer/>
    </Container>  
    );
  }
}