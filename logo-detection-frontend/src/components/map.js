import React, { Component } from 'react';
import GoogleMapReact from 'google-map-react';
import { Container, Row, Col, Table } from 'reactstrap';
 
const AnyReactComponent = ({ text }) =>   <div style={{
  position: 'relative', color: 'white', background: 'red',
  height: 100, width: 100,
}}>{text}</div>;

// const AnyReactComponent = ({ text }) => <div>{text}</div>;
 
export default class SimpleMap extends Component {
  static defaultProps = {
    center: {lat: 59.95, lng: 30.33},
    zoom: 11
  };
 
  render() {
    return (
      <Container>
      {/* <div className="box box-default" style={{height: '948px, width: 1000px'}}>
      <div className="box-body">
      <div className="row"> */}
      <GoogleMapReact
    bootstrapURLKeys={{ key: [''] }}
    defaultCenter={{lat: 59.95, lng: 30.33}}
    defaultZoom={this.props.zoom}
    >
    <AnyReactComponent
    lat={59.955413}
    lng={30.337844}
    text={'sample text'}
    />
  </GoogleMapReact>
      {/* </div>
    </div>
    </div> */}
      </Container>
    );
  }
}