import React from 'react';
import Footer from './footer.js';
import cookie from "react-cookies";
import Loading from 'react-loading-bar';
import 'react-loading-bar/dist/index.css';
import ProgressButton from 'react-progress-button';
import './scraperesults.css';

import { Button, Container, Form, FormGroup, Input, Label } from 'reactstrap';

  export default class ScrapeResults extends React.Component { 
    constructor(props) {
      super(props);
      this.state = {
        token: cookie.load('token'),
        loading: false,
        sortBy: 'classifierAccuracy'
      }
      if (this.state.token === undefined) {
        this.props.history.push('/login');
        return;
      }
      this.nextPage = this.nextPage.bind(this);
      this.handleSortChange = this.handleSortChange.bind(this);
    }
    handleSortChange(event) {
        this.setState({
            sortBy: event.target.value
        });
        this.render();
    }

    handleSubmit = (e) => {

    }

    nextPage() {
      this.props.history.push('/search');
    }

  render() {
      console.log("state is " + (this.state.sortBy === "numClassifiers"));
    return (
    <Container>
        <center>
            <h2> RESULTS </h2>
            <div className="header-space"></div>
            <Form>
                <div>
                Sort by:
                <FormGroup className="sortRadioBtn">
                    <Label>
                        <Input type="radio" 
                        name="classifierAccuracy" 
                        id="classifierAccuracy" 
                        value="classifierAccuracy"
                        
                        checked={this.state.sortBy === "classifierAccuracy"} 
                        onChange={this.handleSortChange}/>{' '}
                        Accuracy of Classifier {'   '}
                    </Label>
                    
                </FormGroup>
                <FormGroup className="sortRadioBtn">
                    <Label>
                        <Input type="radio" 
                        name="numClassifiers" 
                        id="numClassifiers" 
                        value="numClassifiers"
                        checked={this.state.sortBy === "numClassifiers"} 
                        onChange={this.handleSortChange}/>{' '}
                        Number of Classifiers
                    </Label>
                </FormGroup>
                </div>
              
            </Form>
            <div>
          </div>
        </center>
        <Footer/>
    </Container>  
    );
  }
}