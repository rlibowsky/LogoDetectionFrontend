import React, { Component } from 'react';
import './App.css';
import { Container } from 'reactstrap';
import { BrowserRouter, Route } from 'react-router-dom';
import Landing from './components/landing.js';
import Login from './components/login.js';
import SignUp from './components/signup.js';
import Portal from './components/portal.js';
import DataSetLanding from './components/datasetlanding.js';
import Train from './components/train.js';
import Search from './components/search.js';
import SearchResults from './components/searchresults.js';
import Header from './components/header.js';
import ScrapeInstagram from './components/scrapeInstagram.js';
import FinishPage from './components/finishPage.js';
import Upload from './components/upload.js';
import TrainClassifiers from './components/trainClassifiers.js';
import ScrapeResults from './components/scraperesults.js';
import DataSetProgress from './components/dataSetProgress.js';
import DataSetContext from './components/dataSetContext.js';
class App extends Component {

  render() {
    return (
      <BrowserRouter>
      <Container>
      <Route path="" component={Header}/>
        <div>
          <div>
          <Route exact path="/" component={Landing}/>
          <Route exact path="/login" component={Login}/>
          <Route path="/datasetlanding" component={DataSetLanding}/>
          <Route exact path="/signup" component={SignUp}/>
          <Route path="/portal" component={Portal} />
          <Route path="/train" component={Train}/>
          <Route path="/upload" component={Upload} />
          <Route path="/search" component={Search} />
          <Route path="/searchresults" component={SearchResults} />
          <Route path="/scrapeInstagram" component={ScrapeInstagram} />
          <Route path="/finishPage" component={FinishPage} />
          <Route path="/trainclassifiers" component={TrainClassifiers} />
          <Route path="/scraperesults" component={ScrapeResults} />
          <Route path="/dataSetProgress" component={DataSetProgress} />
          <Route path="/dataSetContext" component={DataSetContext} />
          </div>
        </div>
        </Container>
    </BrowserRouter>
    
    );
  }
}

export default App;
