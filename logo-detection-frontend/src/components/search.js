import React from 'react';
import './search.css';
import Footer from './footer.js';

import { Button, Container, Form, FormGroup, Input } from 'reactstrap';

  export default class Search extends React.Component { 
    constructor(props) {
      super(props);
      this.state = {
        logoName: ''
      }
      this.searchLogo = this.searchLogo.bind(this);
    }
    handleLogoNameChange = (e) => {
      this.setState({
        logoName: e.target.value
      })
    }

    handleSubmit = (e) => {
      e.preventDefault();
      fetch('http://localhost:2000/scraper/', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          "hashtag": this.state.logoName,
          "image_count": "30"
        })
      }).then(response => {
        console.log(response.status)
      }).then(data => {
        this.setState({data: data })
    });  
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
              <Input 
                type="text" 
                id="searchTerms" 
                placeholder="Enter logo name" 
                className="searchBox"
                value={this.state.logoName}
                onChange={this.handleLogoNameChange}
                />
              <Button onClick={this.handleSubmit}  className="searchBtn"> Search </Button>
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