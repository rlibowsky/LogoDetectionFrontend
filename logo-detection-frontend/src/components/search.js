import React from 'react';
import './search.css';
import Footer from './footer.js';
import cookie from "react-cookies";
import Loading from 'react-loading-bar';
import 'react-loading-bar/dist/index.css';
import ProgressButton from 'react-progress-button';

import { Button, Container, Form, FormGroup, Input } from 'reactstrap';

  export default class Search extends React.Component { 
    constructor(props) {
      super(props);
      this.state = {
        logoName: '',
        data: '',
        imageJSON: [],
        ready: false,
        token: cookie.load('token'),
        loading: false
      }
      if (this.state.token === undefined) {
        this.props.history.push('/login');
        return;
      }
      this.nextPage = this.nextPage.bind(this);
    }
    handleLogoNameChange = (e) => {
      this.setState({
        logoName: e.target.value
      })
    }

    handleSubmit = (e) => {
      console.log(this.state.logoName);
      e.preventDefault();
      this.setState({
        loading: true
      })
      fetch('http://localhost:2000/scraper/', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          "hashtag": (this.state.logoName).toLowerCase(),
          "image_count": "30"
        })
      }).then(response => response.json())
      .then(json => {
        this.state.imageJSON = json;
        console.log(this.state.imageJSON );
        this.setState({
          loading: false
        })
      })
      .then(this.nextPage);
    }

    nextPage() {
      const data = {
        val: document.getElementById("searchTerms").value
      }
      cookie.save('searchTerms', data.val, { path: '/' , 'maxAge': 100000});
      cookie.save('searchResults', this.state.imageJSON, { path: '/' , 'maxAge': 100000});
      this.props.history.push({
        pathname: '/searchresults',
        params: {
          email: this.email,
          searchTerms: data.val,
          searchResults: this.state.imageJSON
        }
      })
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
              <Loading
                show={this.state.loading}
                color="red"
              />
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