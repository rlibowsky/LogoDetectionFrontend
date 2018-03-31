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
        hashtags: [],
        users: [],
        classifiers: [],
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
    handleHashtagChange = (e) => {
      this.setState({
        hashtag: e.target.value
      })
    }

    handleUsersChange = (e) => {
      this.setState({
        users: e.target.value
      })
    }

    handleClassifiersChange = (e) => {
      this.setState({
        classifiers: e.target.value
      })
    }

    handleSubmit = (e) => {
      // console.log(this.state.logoName);
      // e.preventDefault();
      // this.setState({
      //   loading: true
      // })
      // fetch('http://localhost:2000/scraper/', {
      //   method: 'POST',
      //   headers: {
      //     'Accept': 'application/json',
      //     'Content-Type': 'application/json',
      //   },
      //   body: JSON.stringify({
      //     "hashtag": (this.state.logoName).toLowerCase(),
      //     "image_count": "30"
      //   })
      // }).then(response => response.json())
      // .then(json => {
      //   this.state.imageJSON = json;
      //   console.log(this.state.imageJSON );
      //   this.setState({
      //     loading: false
      //   })
      // })
      // .then(this.nextPage);
      this.nextPage();
    }

    nextPage() {
      // const data = {
      //   val: document.getElementById("searchTerms").value
      // }
      // cookie.save('searchTerms', data.val, { path: '/' , 'maxAge': 100000});
      // cookie.save('searchResults', this.state.imageJSON, { path: '/' , 'maxAge': 100000});
      // this.props.history.push({
      //   pathname: '/searchresults',
      //   params: {
      //     email: this.email,
      //     searchTerms: data.val,
      //     searchResults: this.state.imageJSON
      //   }
      // })
      this.props.history.push('/scraperesults');
    }
  render() {
    return (
    <Container>
        <center>
            <h2> SEARCH </h2>
            <div className="header-space"></div>
            <Form>
            <FormGroup> 
              <div>
              <Input 
                type="text" 
                id="hashtag" 
                placeholder="Choose hashtags to scrape" 
                className="searchBox"
                value={this.state.hashtag}
                onChange={this.handleHashtagChange}
                />
                </div>
                <div>
                <Input 
                type="text" 
                id="users" 
                placeholder="Choose users to scrape" 
                className="searchBox"
                value={this.state.users}
                onChange={this.handleUsersChange}
                />
                </div>
                <div>
                <Input 
                type="text" 
                id="classifiers" 
                placeholder="Choose classifiers to use" 
                className="searchBox"
                value={this.state.classifiers}
                onChange={this.handleClassifiersChange}
                />
                </div>
              <Button onClick={this.handleSubmit}  className="searchBtn"> DONE </Button>
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