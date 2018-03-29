import React from 'react';
import Footer from './footer.js';
import cookie from "react-cookies";
import Loading from 'react-loading-bar';
import 'react-loading-bar/dist/index.css';
import ClassifierImages from './classifierimages.js';
import './trainClassifiers.css';
import { Container, Button, Form, FormGroup, Input } from 'reactstrap';
import Box from 'react-layout-components';
import { Scrollbars } from 'react-custom-scrollbars';
export default class TrainClassifiers extends React.Component { 
    constructor(props) {
      super(props);

      this.state = {
        token: cookie.load('token'),
        brandName: cookie.load('brandName'),
        currentDataSet: cookie.load('currentDataSet'),
        loading: false,
        imageJSON: cookie.load('imageJSONS'),
        currentClassifiers: cookie.load('currentClassifiers'),
        newClassifier: '',
        newClassifierDescription: '',
        nodes: []
      };

      if (this.state.token === undefined) {
        this.props.history.push('/login');
        return;
      }

      this.handleAddDataSet = this.handleAddDataSet.bind(this);
      this.handleAddClassifier = this.handleAddClassifier.bind(this);
      this.loadClassifiers = this.loadClassifiers.bind(this);
      this.createLists = this.createLists.bind(this);
      this.createLists();
      
      this.setState({
        nodes: cookie.load('nodes')
      });
      const imageClick = (is_plus) => {
        console.log(is_plus);
        if (is_plus === "plus") {
          this.showTip();
        }
        
      }
      
      var createImage = function(src, title) {
        var img   = new Image();
        img.src   = src;
        img.alt   = title;
        img.title = title;
        return img; 
      };
      // array of images
      var images = [];

      for (var i = 0; i < this.state.imageJSON.length; i++) {
        var str = ('http://localhost:2000/' + this.state.imageJSON[i]);
        images.push(createImage(str), str);
      }
           
      this.dataSetImages = images.map(function(image){
        if (image.src === undefined) {
          return;
        }
        var str = image;
        return <div className="dataSetBox" key = {image.src.toString()} id ={image.title.toString()} > 
        <img vspace="50" height="150px" width="150px" src={image.src.toString()} onClick={() => imageClick(image.title.toString())}/>
        </div>;
      });
      console.log(this.state.nodes);
    }
    
    createLists() {
      const handleDeleteClassifier = (classifier) => {
        fetch('http://localhost:2000/datasets/'+ this.state.currentDataSet + '/classifiers/' + classifier, {
          method: 'DELETE',
          headers: {
            'Authorization': 'Bearer ' + this.state.token,
            'Content-Type': 'application/json',
          }
        }).then(response => {
          this.loadClassifiers();
        });
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

    handleEditDataset = (e) => {
      this.props.history.push('/datasetlanding/' + this.state.brandName.toLowerCase());
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
      var nodeList = prompt("List the nodes within this classifer (seperated by comma)", "nodes");
      var nodeArray = nodeList.split(",").map(function(item) {
        return item.trim();
      });
      console.log(this.state.newClassifier)
      console.log(nodeArray)
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
                <Button className="editDataset" onClick={this.handleEditDataset}> Edit Dataset </Button>
                </div>
                <div className="row">
                <ul> {this.dataSetClassifiers} </ul>
                </div>
              </div>
              
              <div className="header-space"></div>
              <div className="header-space"></div>
              <Scrollbars style={{ width: 650, height: 500 }}>
              <div className="box" id="dsImages">
                  {this.dataSetImages}
              </div>  
              </Scrollbars>
              <div className="column">
                <div className="row">
                <Form className="addForm">
                
                <FormGroup>
                   {/*
                    <Button className="brandNameButton" onClick={this.handleAddDataSet}>
                      <div align="left"> hashtag  + </div>
                    </Button>
                    */}
                    <h1 align="left"> {this.state.brandName} </h1>
                  <ul> {this.dataSetClassifierNames} </ul>
                </FormGroup>
                <FormGroup>
                  <Input 
                    type="string" 
                    name="newClassifier" 
                    id="newClassifier" 
                    placeholder="Classifier Name"
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