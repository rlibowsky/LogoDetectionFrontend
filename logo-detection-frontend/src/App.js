import React, { Component } from 'react';
import './App.css';
import { BrowserRouter, Route } from 'react-router-dom';
import Landing from './components/landing.js';
import Login from './components/login.js';
import SignUp from './components/signup.js';
import Portal from './components/portal.js';
import Train from './components/train.js';
import Search from './components/search.js';
import SearchResults from './components/searchresults.js';
import cookie from "react-cookies";

class App extends Component {

  render() {
    return (
      <BrowserRouter>
        <div>
          <div>
          <Route exact path="/" component={Landing}/>
          <Route exact path="/login" component={Login}/>
          <Route exact path="/signup" component={SignUp}/>
          <Route path="/portal" component={Portal} />
          <Route exact path="/train" component={Train} />
          <Route exact path="/search" component={Search} />
          <Route path="/searchresults" component={SearchResults} />
          </div>
        </div>
    </BrowserRouter>
    );
  }
}

export default App;
