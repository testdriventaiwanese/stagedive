import React, { PropTypes as T } from 'react'
import classnames from 'classnames'
import {GoogleApiWrapper, Marker} from 'google-maps-react'
import AppBar from './app-bar';
import GOOGLEMAPSAPIKEY from './GOOGLEMAPSAPIKEY.js';
import ReactDOM from 'react-dom';

class Map extends React.Component {
  componentDidUpdate(prevProps, prevState) {
    if (prevProps.google !== this.props.google) {
      this.loadMap();
    }
  }
  loadMap() {
    console.log('loading map')
    if (this.props && this.props.google) {
      const { google } = this.props;
      const maps = google.maps;

      const mapRef = this.refs.map;

      const node = ReactDOM.findDOMNode(mapRef);

      const zoom = 14;
      let crd;
      let center;
      const position = navigator.geolocation.getCurrentPosition((pos) => {
        crd = pos.coords;
        console.log(`Latitude : ${crd.latitude}`);
        console.log(`Longitude: ${crd.longitude}`);
        const center = new maps.LatLng(crd.latitude, crd.longitude)
        const mapConfig = Object.assign({}, {
          center: center,
          zoom: zoom
        })
        this.map = new maps.Map(node, mapConfig);
        console.log('this.map::', this.map);
        return this.map
      })
    }
  }
  render() {
    return (
      <div ref='map'>
        Loading map..
      </div>
    )
  }
}

export class MapComponent extends React.Component {
  render() {
    const style = {
      width: '100vw',
      height: '100vh'
    }
    return (
      <div ref="map" style={style}>
        <Map google={this.props.google} />
      </div>
    );
  }
}

export default GoogleApiWrapper({ apiKey: GOOGLEMAPSAPIKEY })(MapComponent);
