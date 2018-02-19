import React from 'react';
import './meettheteam.css';
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
      <figure className="wp-caption">
        <img className="demo" src={require('./images/meettheteam/anubhav.jpg')} alt="Image" />
        <figcaption className="wp-caption-text">Anubhav Sarkar: Full Stack Developer</figcaption>
      </figure>
      <figure className="wp-caption">
        <img className="demo" src={require('./images/meettheteam/shabina.jpg')} alt="Image" />
        <figcaption className="wp-caption-text">Shabina Rayan: Frontend Developer</figcaption>
      </figure>
      <figure className="wp-caption">
        <img className="demo" src={require('./images/meettheteam/ruth.jpg')} alt="Image" />
        <figcaption className="wp-caption-text">Ruth Libowsky: Frontend Developer</figcaption>
      </figure>
      <figure className="wp-caption">
        <img className="demo" src={require('./images/meettheteam/kevin.jpg')} alt="Image" />
        <figcaption className="wp-caption-text">Kevin Wang: Backend Developer</figcaption>
      </figure>
      </Carousel>
      </div>
    );
  }
}