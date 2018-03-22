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
import Box from 'react-layout-components';

export default class TrainClassifiers extends React.Component { 
    constructor(props) {
      super(props);

      this.state = {
        token: cookie.load('token'),
        brandName: cookie.load('brandName'),
        currentDataSet: cookie.load('currentDataSet'),
        loading: false,
        currentClassifiers: cookie.load('currentClassifiers'),
        newClassifier: '',
        newClassifierDescription: ''
      };
      if (this.state.token === undefined) {
        this.props.history.push('/login');
        return;
      }

      // var dataSetClassifiersList =  ["Running", "Walking", "Yoga", "Swimming"];
           
      // this.dataSetClassifiers = this.state.currentClassifiers.map(function(classifier, i){
      //   return <li align="left" key = {classifier.name.toString()} id ={classifier.id.toString()}> {classifier.name.toString()} 
      //       <ClassifierImages classifierName="{classifier.name.toString()}"/>
      //   </li>
      // });

       

      this.handleAddDataSet = this.handleAddDataSet.bind(this);
      this.handleAddClassifier = this.handleAddClassifier.bind(this);
      // this.handleDeleteClassifier = this.handleDeleteClassifier.bind(this);
      this.loadClassifiers = this.loadClassifiers.bind(this);
      this.createLists = this.createLists.bind(this);
      this.createLists();

    }

    createLists() {

      const handleDeleteClassifier = (classifier) => {
        // fetch('http://localhost:2000/datasets/'+ this.state.currentDataSet + '/classifiers', {
        //   method: 'DELETE',
        //   headers: {
        //     'Authorization': 'Bearer ' + this.state.token,
        //     'Content-Type': 'application/json',
        //   },
        //   body: JSON.stringify({
        //     "id": (classifier)
        //   })
        // }).then(response => response.json())
        // .then(json => {
        //   console.log("made it here");
        //   console.log(json);
          
        //   this.loadClassifiers();
        // });
      }

      this.dataSetClassifiers = this.state.currentClassifiers.map(function(classifier, i){
        return <li align="left" key = {classifier.name.toString()} id ={classifier.id.toString()}> {classifier.name.toString()} 
            <ClassifierImages classifierName="{classifier.name.toString()}"/>
        </li>
      });

      this.dataSetClassifierNames = this.state.currentClassifiers.map(function(classifier, i){
        return <li align="left" key = {classifier.name.toString()} id ={classifier.id.toString()}> 
        <h10 align="left"> {classifier.name.toString()} </h10>
        <Button className="deleteClassifierBtn" onClick={() => handleDeleteClassifier(classifier.id.toString())}> 
          <div align="center"> X </div> 
          </Button>
        </li>
        
      });
    }

    handleNewClassifierChange = (e) => {
      this.setState({
        newClassifier: e.target.value
      })
    }

    handleNewClassifierDescriptionChange = (e) => {
      this.setState({
        newClassifierDescription: e.target.value
      })
    }

    handleAddDataSet() {

    }

    handleAddClassifier() {
      fetch('http://localhost:2000/datasets/'+ this.state.currentDataSet + '/classifiers', {
        method: 'POST',
        headers: {
          'Authorization': 'Bearer ' + this.state.token,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          "name": (this.state.newClassifier).toLowerCase(),
          "description": (this.state.newClassifierDescription).toLowerCase(),
        })
      }).then(response => response.json())
      .then(json => {
        this.loadClassifiers();
      });
    }

    loadClassifiers() {
      fetch('http://localhost:2000/datasets/' + this.state.currentDataSet + '/classifiers', {
        method: 'GET',
        headers: {
          'Authorization': 'Bearer ' + this.state.token,
          'Content-Type': 'application/json',
        }
      }).then(response => response.json())
      .then(json => {
        console.log("classifier response");
        console.log(json);
        cookie.remove('currentClassifiers');
        cookie.save('currentClassifiers', json.classifier, { path: '/' , 'maxAge': 100000});
        this.setState({
          newClassifier: '',
          newClassifierDescription: '',
          currentClassifiers: cookie.load('currentClassifiers')
        });
        this.createLists();
        this.render();
        this.forceUpdate();
      });
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
                <FormGroup>
                  <table>
                    <thead><Button className="brandNameButton" onClick={this.handleAddDataSet}>
                      <div align="left"> hashtag  + </div>
                    </Button> </thead>
                    <tbody>
                    <h1> {this.state.brandName} </h1>
                    <h1> Other </h1>
                    </tbody>
                </table>
                  <Form><ul> {this.dataSetClassifierNames} </ul></Form>
                </FormGroup>
                <FormGroup>
                  <Input 
                    type="string" 
                    name="newClassifier" 
                    id="newClassifier" 
                    placeholder="New Classifier"
                    value={this.state.newClassifier}
                    onChange={this.handleNewClassifierChange}
                  />
                </FormGroup>
                <FormGroup>
                  <Input 
                    type="string" 
                    name="newClassifierDescription" 
                    id="newClassifierDescription"
                    placeholder="Describe your new classifier"
                    value={this.state.newClassifierDescription}
                    onChange={this.handleNewClassifierDescriptionChange}
                  />
                </FormGroup>
                <Button className="brandNameButton" onClick={this.handleAddClassifier}> 
                  <div align="left"> +  add classifier </div>
                </Button>
                  
                </Form>
               
                  
                </div>
              </div>
              

          </div>
        
        </center>
        <div className="bt-space"></div>
        <Footer/>
    </Container>
  );
    
  }
}