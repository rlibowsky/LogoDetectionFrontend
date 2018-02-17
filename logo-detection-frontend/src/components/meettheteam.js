import React from 'react';
import './meettheteam.css';
import ReactDOM from 'react-dom';
var Carousel = require('nuka-carousel');

export default class MeetTheTeam extends React.Component {
  constructor(props) {
    super(props);
    this.toggle = this.toggle.bind(this);
    this.state = {
      isOpen: false
    };
  }
  toggle() {
    this.setState({
      isOpen: !this.state.isOpen
    });
  }
  render() {
    return (
      <div align = "center">
      <Carousel width="40%">
      <figure class="wp-caption">
        <img class="demo" src={require('./images/meettheteam/anubhav.jpg')} alt="Image" />
        <figcaption class="wp-caption-text">Anubhav Sarkar: Full Stack Developer</figcaption>
      </figure>
      <figure class="wp-caption">
        <img class="demo" src={require('./images/meettheteam/shabina.jpg')} alt="Image" />
        <figcaption class="wp-caption-text">Shabina Rayan: Frontend Developer</figcaption>
      </figure>
      <figure class="wp-caption">
        <img class="demo" src={require('./images/meettheteam/ruth.jpg')} alt="Image" />
        <figcaption class="wp-caption-text">Ruth Libowsky: Frontend Developer</figcaption>
      </figure>
      <figure class="wp-caption">
        <img class="demo" src={require('./images/meettheteam/kevin.jpg')} alt="Image" />
        <figcaption class="wp-caption-text">Kevin Wang: Backend Developer</figcaption>
      </figure>
      </Carousel>
      </div>
    );
  }
}