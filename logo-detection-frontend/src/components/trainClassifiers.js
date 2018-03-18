import React from 'react';
import Footer from './footer.js';
import cookie from "react-cookies";
import Loading from 'react-loading-bar';
import 'react-loading-bar/dist/index.css';
import FaIconPack from 'react-icons/lib/fa';
import ToolTip from 'react-portal-tooltip';
import ClassifierImages from './classifierimages.js';
import './trainClassifiers.css';
import { Container, Button, Form, FormGroup, Input } from 'reactstrap';

export default class TrainClassifiers extends React.Component { 
    constructor(props) {
      super(props);

      this.state = {
        token: cookie.load('token'),
        brandName: cookie.load('brandName'),
        loading: false
      };
      if (this.state.token === undefined) {
        this.props.history.push('/login');
        return;
      }

      var dataSetClassifiersList =  ["Running", "Walking", "Yoga", "Swimming"]
           
      this.dataSetClassifiers = dataSetClassifiersList.map(function(classifier, i){
        return <li align="left" key = {classifier.toString()} id ={classifier.toString()}> {classifier.toString()} 
            <ClassifierImages/>
        </li>
      });

      this.dataSetClassifierNames = dataSetClassifiersList.map(function(classifier, i){
        return <li align="left" key = {classifier.toString()} id ={classifier.toString()}> {classifier.toString()} 
        </li>
      }); 

      this.handleAddDataSet = this.handleAddDataSet.bind(this);
      this.handleAddClassifier = this.handleAddClassifier.bind(this);

    }

    handleAddDataSet() {

    }

    handleAddClassifier() {

    }


  render() {
    return (
      <Container>
        <center>
        <div className="row">

              <div className="column">
                <div className="row">
                <h1> {this.state.brandName} </h1>
                </div>
                <div className="row">
                <Button className="addMoreImages"> Add More Images </Button>
                </div>
                <div className="row">
                <ul> {this.dataSetClassifiers} </ul>
                </div>
              </div>

              <div className="column">
                <div className="row">
                  
                <Form className="addForm">
                <Button className="brandNameButton" onClick={this.handleAddDataSet}> 
                  <div align="left"> hashtag  + </div>
                </Button>
                <h1> Nike </h1>
                <ul> {this.dataSetClassifierNames} </ul>
                  {/* <FormGroup>
                    <Input 
                      type="email" 
                      name="email"
                      id="email"
                      placeholder="Email"
                      value={this.state.email}
                      onChange={this.handleEmailChange}
                    />
                  </FormGroup> */}
                <Button className="brandNameButton" onClick={this.handleAddClassifier}> 
                  <div align="left"> +  add classifier </div>
                </Button>
                  
                </Form>
                  
                </div>
                <div className="row">
                    Add Classifier
                </div>
              </div>
              

          </div>
        
        </center>
        <Footer/>
    </Container>
  );
    
  }
}