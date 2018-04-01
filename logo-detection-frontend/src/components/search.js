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
        currentHashtag: '',
        currentUser: '',
        currentClassifier: '',
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
      this.addUser = this.addUser.bind(this);
      this.addClassifier = this.addClassifier.bind(this);
      this.addHashtag = this.addHashtag.bind(this);
      this.buildClassifierList = this.buildClassifierList.bind(this);
      this.buildHashtagList = this.buildHashtagList.bind(this);
      this.buildUserList = this.buildUserList.bind(this);
    }
    handleHashtagChange = (e) => {
      this.setState({
        currentHashtag: e.target.value
      })
    }

    handleUsersChange = (e) => {
      this.setState({
        currentUser: e.target.value
      })
    }

    handleClassifiersChange = (e) => {
      this.setState({
        currentClassifier: e.target.value
      })
    }

    addUser() {
      var userList = this.state.users;
      userList.push(this.state.currentUser);
      this.setState ({
        users: userList,
        currentUser: ''
      })
      this.buildUserList();
    }

    addHashtag() {
      var hashtagList = this.state.hashtags;
      hashtagList.push(this.state.currentHashtag);
      this.setState ({
        hashtags: hashtagList,
        currentHashtag: ''
      })
      this.buildHashtagList();
    }

    addClassifier() {
      var classifierList = this.state.classifiers;
      classifierList.push(this.state.currentClassifier);
      this.setState ({
        classifiers: classifierList,
        currentClassifier: ''
      })
      this.buildClassifierList();
    }

    buildClassifierList () {
      const handleDeleteClassifier = (classifier) => {
        var newClassifierList = [];
        for (var c = 0; c < this.state.classifiers.length; c++) {
          if (this.state.classifiers[c] !== classifier) {
            newClassifierList.push(this.state.classifiers[c]);
          }
        }
        this.state.classifiers = newClassifierList;
        this.state.currentClassifier = '';
        this.buildClassifierList();
      };
      this.classifierList = this.state.classifiers.map(function(classifier){
        return(
         <li align="left" key = {classifier.toString()} id ={classifier.toString()} className="listItem"> 
        <h10 align="left"> {classifier.toString()} </h10>
        <Button className="deleteClassifierBtn" onClick={() => handleDeleteClassifier(classifier.toString())}> 
          <div align="center"> X </div> 
          </Button>
        </li>);
      })
      this.forceUpdate();
    }

    buildUserList () {
      const handleDeleteUser = (user) => {
        var newUserList = [];
        for (var u = 0; u < this.state.users.length; u++) {
          if (this.state.users[u] !== user) {
            newUserList.push(this.state.users[u]);
          }
        }
        this.state.users = newUserList;
        this.state.currentUser = '';
        console.log(this.state.users);
        this.buildUserList();
      };
      this.userList = this.state.users.map(function(user){
        return(
         <li align="left" key = {user.toString()} id ={user.toString()} className="listItem"> 
        <h10 align="left"> {user.toString()} </h10>
        <Button className="deleteClassifierBtn" onClick={() => handleDeleteUser(user.toString())}> 
          <div align="center"> X </div> 
          </Button>
        </li>);
      })
      this.forceUpdate();
    }

    buildHashtagList () {
      const handleDeleteHashtag = (hashtag) => {
        var newHashtagList = [];
        for (var h = 0; h < this.state.hashtags.length; h++) {
          if (this.state.hashtags[h] !== hashtag) { 
            newHashtagList.push(this.state.hashtags[h]);
          }
        }
        this.state.hashtags = newHashtagList;
        this.state.currentHashtag = '';
        this.buildHashtagList();
      };

      this.hashtagList = this.state.hashtags.map(function(hashtag){
        return(
        <li align="left" key = {hashtag.toString()} id ={hashtag.toString()} className="listItem"> 
        <h10 align="left"> {hashtag.toString()} </h10>
        <Button className="deleteClassifierBtn" onClick={() => handleDeleteHashtag(hashtag.toString())}> 
          <div align="center"> X </div> 
          </Button>
        </li>);
      })
      this.forceUpdate();
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
            <h3> Currently Scraping for: </h3>
            <div>
              <div>
                Hashtags:
                <ul>
                  {this.hashtagList}
                </ul>
              </div>
              <div>
                Users:
                <ul>
                  {this.userList}
                </ul>
              </div>
              <div>
                Classifiers:
                <ul>
                  {this.classifierList}
                </ul>
              </div>
            </div>
            <Form>
            <FormGroup> 
              <div>
              <Input 
                type="text" 
                id="currentHashtag" 
                placeholder="Add hashtags to scrape" 
                className="searchBox"
                value={this.state.currentHashtag}
                onChange={this.handleHashtagChange}
                />
                <Button className="addBtn" onClick={this.addHashtag}> Add Hashtag </Button>
                </div>
                <div>
                <Input 
                type="text" 
                id="currentUser" 
                placeholder="Add users to scrape" 
                className="searchBox"
                value={this.state.currentUser}
                onChange={this.handleUsersChange}
                />
                <Button className="addBtn" onClick={this.addUser}> Add User </Button>
                </div>
                <div>
                <Input 
                type="text" 
                id="currentClassifier" 
                placeholder="Add classifiers to use" 
                className="searchBox"
                value={this.state.currentClassifier}
                onChange={this.handleClassifiersChange}
                />
                <Button className="addBtn" onClick={this.addClassifier}> Add Classifier </Button>
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