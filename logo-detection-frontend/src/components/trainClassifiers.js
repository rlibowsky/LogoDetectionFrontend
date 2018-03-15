import React from 'react';
import Footer from './footer.js';
import cookie from "react-cookies";
import Loading from 'react-loading-bar';
import 'react-loading-bar/dist/index.css';
import FaIconPack from 'react-icons/lib/fa';
import ToolTip from 'react-portal-tooltip';
import { Container, Button } from 'reactstrap';

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
        return <li key = {classifier.toString()} id ={classifier.toString()}> {classifier.toString()} </li>;
        
      });


    }


  render() {
    return (
      <Container>
        <center>
            <h1> {this.state.brandName} </h1>
            <Button> Add More Images </Button>
            <ul> {this.dataSetClassifiers} </ul>
        </center>
        <Footer/>
    </Container>  
  );
    
  }
}