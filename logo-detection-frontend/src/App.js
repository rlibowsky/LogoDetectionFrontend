import React, { Component } from 'react';
import './App.css';
import { BrowserRouter, Route } from 'react-router-dom';
import Header from './components/header.js';
import Landing from './components/landing.js';
import Login from './components/login.js';
import SignUp from './components/signup.js';

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <div>
          <Header />
          <div>
          <Route exact path="/" component={Landing}/>
          <Route exact path="/login" component={Login}/>
          <Route exact path="/signup" component={SignUp}/>
          </div>
        </div>
    </BrowserRouter>
    );
  }
}

export default App;
