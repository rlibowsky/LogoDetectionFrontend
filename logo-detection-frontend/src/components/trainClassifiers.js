import React from 'react';
import Footer from './footer.js';
import cookie from "react-cookies";
import 'react-loading-bar/dist/index.css';
import ClassifierImages from './classifierimages.js';
import './trainClassifiers.css';
import { Container, Button, Form, FormGroup, Input } from 'reactstrap';
import { Scrollbars } from 'react-custom-scrollbars';

const CSSVariables = {
  border : {
      border : '10px solid green'
  },
  noBorder : {
      border : '10px solid transparent'
  },
};
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
        selectedClassifier:'',
        selectedNode: '',
        newClassifierID: ''
      };
      this.selectedImages = [];
      this.images = [];

      if (this.state.token === undefined) {
        this.props.history.push('/login');
        return;
      }
      this.imageClick = this.imageClick.bind(this);
      this.setBorder = this.setBorder.bind(this);
      this.background = this.background.bind(this);
      this.addToTrainingSet = this.addToTrainingSet.bind(this);
      this.selectClassifierOrNode = this.selectClassifierOrNode.bind(this);
      this.handleAddClassifier = this.handleAddClassifier.bind(this);
      this.handleDeleteClassifier = this.handleDeleteClassifier.bind(this);
      this.loadClassifiers = this.loadClassifiers.bind(this);
      this.createLists = this.createLists.bind(this);
      this.createLists();
      this.returnNodes = this.returnNodes.bind(this);
      
      var createImage = function(src, title) {
        var img   = new Image();
        img.src   = src;
        img.alt   = title;
        img.title = title;
        return img; 
      };
      // array of images

      for (var i = 0; i < this.state.imageJSON.length; i++) {
        var str = (this.state.imageJSON[i]);
        this.images.push(createImage(str), str);
      }
          
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
        }). then (json => {
          this.dataSetClassifiers = this.state.currentClassifiers.map(function(classifier, i){
            return <li align="left" key = {classifier.name.toString()} id ={classifier.id.toString()}> {classifier.name.toString()} 
                <ClassifierImages classifierName="{classifier.name.toString()}"/>
            </li>
          });
        });
      }
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

    handleDeleteClassifier (classifier) {
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

    addToTrainingSet() {
      console.log(this.selectedImages);
      for (var item in this.selectedImages) {
        console.log(this.selectedImages[item][0]);
        console.log("COOKIE for " + this.selectedImages[item][0] + " is " + cookie.load(this.selectedImages[item][0]));
      }
    }


    handleAddClassifier() {
      const getEverything = () => {
        console.log("IN GET EVERYTHING!!!")
        var nodeArray = [];
        //post nodes as categories to rest API
          fetch('http://localhost:2000/datasets/'+ this.state.currentDataSet + '/classifiers/' + this.state.newClassifierID, {
            method: 'GET',
            headers: {
              'Authorization': 'Bearer ' + this.state.token,
              'Content-Type': 'application/json',
            }
          }).then(response => response.json())
          .then(json => {
            console.log(json);
            var categories = json['categories'];
            for (var i in categories) {
              var nodeName = (categories[i]['name']);
              nodeName= nodeName.toLowerCase();
              var nodeID = (categories[i]['categoryId']);
              var classifier = this.state.newClassifier.toLowerCase();
              console.log("classifier: " + classifier);
              console.log(classifier+'-'+nodeName);
              cookie.save(classifier+"-"+nodeName, nodeID, { path: '/' , 'maxAge': 100000})  
            }
          })
          this.loadClassifiers();
      }
      const postCategories= (nodeArray) => {
        for (var element in nodeArray) {
          //post nodes as categories to rest API
          fetch('http://localhost:2000/datasets/'+ this.state.currentDataSet + '/classifiers/' + this.state.newClassifierID, {
            method: 'POST',
            headers: {
              'Authorization': 'Bearer ' + this.state.token,
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              "name": nodeArray[element].toLowerCase(),
            })
          }).then(response => response.json())
          .then(json => {
            console.log(json);
            getEverything()
          })
        }
      }
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
        console.log(json);
        var id = (json['createdClassifier']['classifierId']);
        var name = (json['createdClassifier']['name']);
        this.setState({
          newClassifierID: id,
          newClassifier: name
        })
        var nodeList = prompt("List the nodes within this classifer (seperated by comma)", "nodes");
        var nodeArray = nodeList.split(",").map(function(item) {
          return item.trim();
        });
        var nodeString = nodeArray.toString();
        //if cookie exists
        console.log(this.state.newClassifierID)
        if (document.cookie.indexOf(this.state.newClassifierID + '=') > -1) {
          var cookieString = cookie.load(this.state.newClassifierID);
          var cookieArray = cookieString.split(',');
          var newString = (nodeArray.concat(cookieArray)).toString();
          console.log("new string: " + newString);
          cookie.save(this.state.newClassifierID, newString, { path: '/' , 'maxAge': 100000});
        }
        //if cookie does not exist
        else {
          console.log("node string: " + nodeString);
          cookie.save(this.state.newClassifierID, nodeString, { path: '/' , 'maxAge': 100000});
        }
        
        setTimeout(function(){
          postCategories(nodeArray);
        }, 2000);
      });
    }

    selectClassifierOrNode(str){
      //if it is a node
      if(str.indexOf('-') >= 0){
        this.setState({
          selectedNode: str
        })
      }
      //if it is a classifier
      else{
        if (this.state.selectedClassifier !== str) {
          this.setState({
            selectedNode: ''
          })
        }
        this.setState({
          selectedClassifier: str
        })
      }
      this.forceUpdate();
    }

    background(str){
      //if it is a node
      if(str.indexOf('-') >= 0){
        if (this.state.selectedNode === str) {
          return "salmon"
        }
      }
      //if it is a classifier
      else{
        if (this.state.selectedClassifier === str) {
          return "powderblue"
        }
        else {
          return "white"
        }
      }
    }
    

    loadClassifiers() {
      console.log("Load Classifiers");
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

    returnNodes(classifierID) {
      var arr = [];
      if (document.cookie.indexOf(classifierID + '=') === -1) {
        return arr;
      }
      else {
        var nodeString = cookie.load(classifierID);
        return nodeString.split(',')
      }
    }
    imageClick(image_src){
        //if this.state.selectedClassifier doesnt exist
        if (this.state.selectedNode === '') {
          alert("Please select a classifier");
        }
        else {
          if (this.selectedImages.length === 0) {
            var arr = [image_src]
            var obj = [this.state.selectedNode, arr]
            this.selectedImages.push(obj);
          }
          else {
            var found = false;
            for (var i = 0, length = this.selectedImages.length; i < length; i++) {
              if (this.selectedImages[i][0] === this.state.selectedNode) {
                found = true;
                if(this.selectedImages[i][1].includes(image_src)) {
                  var index = this.selectedImages[i][1].indexOf(image_src);
                  this.selectedImages[i][1].splice(index, 1);
                }
                else {
                  var classifier = this.selectedImages[i][0];
                  var arr = this.selectedImages[i][1];
                  arr.push(image_src);
                  var obj = [classifier, arr]
                  this.selectedImages.splice(i, 1);
                  this.selectedImages.push(obj);
                }
              }
            }
            if (found === false) {
              var arr = [image_src]
              var obj = [this.state.selectedNode, arr]
              this.selectedImages.push(obj);
            }
          }
        }
      this.forceUpdate()
    }

    setBorder(image_src){
      for (var i = 0, length = this.selectedImages.length; i < length; i++) {
        if (this.selectedImages[i].includes(this.state.selectedNode)) {
          if(this.selectedImages[i][1].includes(image_src)) {
            return CSSVariables.border;
          }
          else {
            return CSSVariables.noBorder;
          }
        }
      } 
      return CSSVariables.noBorder;
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
                {/*<ul> {this.dataSetClassifiers} </ul>*/}
                </div>
              </div>
              
              <div className="header-space"></div>
              <div className="header-space"></div>
              <Scrollbars style={{ width: 500, height: 500 }}>
              <div className="box" id="dsImages">
                  {this.images.map((image) => {
                      if (image.src === undefined) {
                        return;
                      }
                      var str = image;
                      return <div className="dataSetBox" key = {image.src.toString()} id ={image.title.toString()}> 
                      <img vspace="50" height="160px" width="160px" src={image.src.toString()}  onClick={() => this.imageClick(image.src.toString())} style={this.setBorder(image.src.toString())}/>
                      </div>;
                  })}
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
                  <ul> 
                  {this.loadClassifiers}
                  {this.state.currentClassifiers.map((classifier, i) =>{
                    return <li class="borderlist" style={{background: this.background(classifier.name.toString())}} onClick={() => this.selectClassifierOrNode(classifier.name.toString())} align="left" key = {classifier.name.toString()} id ={classifier.id.toString()}> 
                    <h5 align="left"> {classifier.name.toString()} 
                    </h5>
                    {this.returnNodes(classifier.id.toString()).map((node) => {
                      return <div align = 'center' style={{background: this.background(classifier.name.toString().toLowerCase() + '-' + node.toString().toLowerCase())}} onClick={() => this.selectClassifierOrNode(classifier.name.toString() + '-' + node.toString())} > 
                        {node}
                      </div>;
                  })}
                    <Button className="deleteClassifierBtn" onClick={() => this.handleDeleteClassifier(classifier.id.toString())}> 
                      <div align="center"> X </div> 
                    </Button>
                    </li>
                  })}

                  </ul>
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
                <Button onClick={() => this.addToTrainingSet()}>
                <div align="left"> TRAIN IMAGES </div>
                </Button>
               
                  
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