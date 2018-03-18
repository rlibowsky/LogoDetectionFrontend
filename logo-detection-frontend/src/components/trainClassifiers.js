import React from 'react';
import Footer from './footer.js';
import cookie from "react-cookies";
import Loading from 'react-loading-bar';
import 'react-loading-bar/dist/index.css';
import FaIconPack from 'react-icons/lib/fa';
import ToolTip from 'react-portal-tooltip';
import { Container, Button } from 'reactstrap';
import ClassifierImages from './classifierimages.js';
import './trainClassifiers.css';

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
                    Classifiers
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