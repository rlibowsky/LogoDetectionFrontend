import React from 'react';
import './search.css';
import Footer from './footer.js';
import cookie from "react-cookies";
import Loading from 'react-loading-bar';
import 'react-loading-bar/dist/index.css';
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
        loading: false,
        currentDataSet: null,
        hashtagToScrape: '',
        searchError: ''
      }

      this.classifierArray = [];
      this.allUserClassifiers = [];

      if (this.state.token === undefined) {
        this.props.history.push('/login');
        return;
      }

      // this.nextPage = this.nextPage.bind(this);
      this.addUser = this.addUser.bind(this);
      this.addClassifier = this.addClassifier.bind(this);
      this.addHashtag = this.addHashtag.bind(this);
      this.buildClassifierList = this.buildClassifierList.bind(this);
      this.buildHashtagList = this.buildHashtagList.bind(this);
      this.buildUserList = this.buildUserList.bind(this);
      this.refresh = this.refresh.bind(this);
      this.setClassifiers = this.setClassifiers.bind(this);
      this.getUserClassifiers = this.getUserClassifiers.bind(this);
      this.handleSubmit = this.handleSubmit.bind(this);
      this.callBing = this.callBing.bind(this);
      this.getUserClassifiers();

      
    }

    getUserClassifiers() {
      fetch('http://localhost:2000/classifiers/', {
        headers: {
          'Authorization': 'Bearer ' + this.state.token,
          'Content-Type': 'application/json',
        }
      }).then(response => 
        response.json())
      .then(json => {
        var data = json.classifiers;
        for(var i in data)
        {
          var data_set = {
            name: data[i].name,
            url: data[i].request.url,
            id: data[i].id
          };
          this.classifierArray.push(data_set);
          this.allUserClassifiers.push(data_set);
        }
        this.setClassifiers();
      });
    }

    setClassifiers() {
      const handleAddClassifier = (classifier) => {
        this.state.currentClassifier = classifier;
        this.addClassifier();
        this.removeUserClassifier(classifier);
      };

      this.userClassifiers = this.classifierArray.map(function(classifier){
        return(
         <div align="left" key = {classifier.name.toString()} id ={classifier.id.toString()} className="listItem"> 
        <h10 align="left"> {classifier.name.toString()} </h10>
        <Button className="deleteClassifierBtn" onClick={() => handleAddClassifier(classifier.name.toString())}> 
          <div align="center"> + </div> 
          </Button>
        </div>);
      })
      this.forceUpdate();
    }

    removeUserClassifier(classifierToRemove) {
      var array = [];
      for (var i = 0; i < this.classifierArray.length; i++ ) {
        if (this.classifierArray[i].name !== classifierToRemove) {
          array.push(this.classifierArray[i]);
        }
      }
      this.classifierArray = array;
      this.state.classifiers = array;
      this.setClassifiers();
    }

    addUserClassifier(classifierName) {
      // find id and url
      for (var i = 0; i < this.allUserClassifiers.length; i++) {
        if (this.allUserClassifiers[i].name === classifierName) {
          this.classifierArray.push(this.allUserClassifiers[i]);
          this.setClassifiers();
          return;
        }
      }
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
        this.addUserClassifier(classifier);
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

    refresh() {
      fetch('http://localhost:2000/datasets/', {
        headers: {
          'Authorization': 'Bearer ' + this.state.token,
          'Content-Type': 'application/json',
        }
      }).then(response => 
        response.json())
      .then(json => {
        var data = json.datasets;
        var array = [];
        for(var i in data)
        {
          var src = data[i].src;
          var name = data[i].name;
          var id = data[i]._id;
          var data_set = [src, name, id];
          array.push(data_set);
          if (name === this.state.hashtags[0]) {
            this.state.currentDataSet = id;
            cookie.save('currentDataSet', id, { path: '/' , 'maxAge': 100000});
          }
        }
        var str = array.toString();
        cookie.save('datasets', str, { path: '/' , 'maxAge': 100000});
        this.callBing();
      });
    }

    // adds data scraped from bing to data set
    callBing() {
      var jsonImg;
      const postBing = () => {
        fetch('http://localhost:2000/datasets/'+ this.state.currentDataSet +'/uploadImages', {
          method: 'POST',
          headers: {
            'Authorization': 'Bearer ' + this.state.token,
            'Accept': 'application/json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            "images":arr,
          })
        }).then(response => response.json())
        .then(data => {
          var imageArray = data['images'];
          cookie.remove('imageJSONS');
          cookie.save('imageJSONS', imageArray.slice(0,20), { path: '/' , 'maxAge': 100000});
          this.props.history.push('/scraperesults');
        });
        this.setState({
            loading: true
          })
      };



      let https = require('https');
      let subscriptionKey = 'ebf811d0d7bb493089f573dae59b08ab';
      let host = 'api.cognitive.microsoft.com';
      let path = '/bing/v7.0/images/search';
      let term = '';
      for (var h = 0; h < this.state.hashtags.length; h++) {
        term += this.state.hashtags[h];
        if (((h + 1) < this.state.hashtags.length) || (this.state.classifiers.length > 0)) {
          term += '+';
        }
      }
      for (var c = 0; c < this.state.classifiers.length; c++) {
        term += this.state.classifiers[c];
        if (((c + 1) < this.state.classifiers.length)) {
          term += '+';
        }
      }
      console.log("term is " + term);
      var arr = [];
      let response_handler = function (response) {
          let body = '';
          response.on('data', function (d) {
              body += d;
          });
          response.on('end', function () {
              let json = JSON.parse(body);
              body = JSON.stringify(JSON.parse(body), null, '  ');
              console.log('\nJSON Response:\n');
              console.log(json);
              var images = json['value']
              for (var key in images) {
                  var val = images[key];
                  var contentURL = val['contentUrl'];
                  arr.push(contentURL);
              }
              var shuffle = require('shuffle-array');
              shuffle(arr);
          });
          response.on('error', function (e) {
              console.log('Error: ' + e.message);
          });
      };
      let bing_web_search = function (search) {
        console.log('Searching the Web for: ' + term);
        let request_params = {
              method : 'GET',
              hostname : host,
              path : path + '?q=' + encodeURIComponent(search),
              headers : {
                  'Ocp-Apim-Subscription-Key' : subscriptionKey,
              }
          };
          let req = https.request(request_params, response_handler);
          req.end();
      }  
      if (subscriptionKey.length === 32) {
          bing_web_search(term);
      } else {
          console.log('Invalid Bing Search API subscription key!');
          console.log('Please paste yours into the source code.');
      }
      setTimeout(function(){
        postBing(arr);
      }, 2000);

    }

    handleSubmit = (e) => {
      // create a new data set with name as first hashtag
      if (this.state.hashtags.length === 0) {
        this.setState({
          searchError: "Please enter at least one hashtag"
        });
        return;
      }
      // create a new data set
      cookie.save('brandName', this.state.hashtags[0], { path: '/' , 'maxAge': 100000});
        fetch('http://localhost:2000/datasets', {
        method: 'POST',
        headers: {
          'Authorization': 'Bearer ' + this.state.token,
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          "name": (this.state.hashtags[0]).toLowerCase(),
          "datasetType": "0"
        })
      }).then(response => {
        if (response.status === 200) {
          //good
        }
        else {
          //bad
        }
        this.refresh();
      });
    }

    // nextPage() {
    //     cookie.remove('imageJSONS');
    //     cookie.save('imageJSONS', this.state.imageJSON, { path: '/' , 'maxAge': 100000});
    //     this.props.history.push('/scraperesults');
    // }


  render() {
    return (
    <Container>
        <center>
        <Loading show={this.state.loading} color="red" />
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
                Classifiers:
                <ul>
                  {this.classifierList}
                </ul>
              </div>
            </div>
            <h5 className="searchError"> {this.state.searchError} </h5>
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
                {/* <div>
                <Input 
                type="text" 
                id="currentUser" 
                placeholder="Add users to scrape" 
                className="searchBox"
                value={this.state.currentUser}
                onChange={this.handleUsersChange}
                />
                <Button className="addBtn" onClick={this.addUser}> Add User </Button>
                </div> */}
                <div>
                <h1> Add Classifiers </h1>
                <li>
                {this.userClassifiers}
              </li>
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