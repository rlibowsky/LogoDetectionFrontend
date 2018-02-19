import React, { Component } from 'react';
import {
  withScriptjs,
  withGoogleMap,
  GoogleMap,
  Marker,
} from "react-google-maps";

const MapWithAMarker = withScriptjs(withGoogleMap(props =>
  <GoogleMap
    defaultZoom={15}
    defaultCenter={{ lat: 34.019359, lng: -118.282858 }}
  >
    <Marker
      position={{ lat: 34.019359, lng: -118.282858 }}
    />
  </GoogleMap>
));

export default class Map extends Component {
  render() {
    return (
    <MapWithAMarker
      googleMapURL="https://maps.googleapis.com/maps/api/js?key=AIzaSyArOJzTpHkpinV-nSLodCOFLBX3jBHC1VQ&v=3.exp&libraries=geometry,drawing,places"
      loadingElement={<div style={{ height: `100%` }} />}
      containerElement={<div style={{ height: `400px` }} />}
      mapElement={<div style={{ height: `100%` }} />}
    />
    )
  }
}