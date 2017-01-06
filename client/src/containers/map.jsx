import React, { PropTypes as T } from 'react'
import classnames from 'classnames'
import { GoogleApiWrapper, Marker} from 'google-maps-react'
import AppBar from './app-bar';
import GOOGLEMAPSAPIKEY from './GOOGLEMAPSAPIKEY.js';
import ReactDOM from 'react-dom';


export class Map extends React.Component {
  componentDidUpdate(prevProps, prevState) {
    console.log('prevProps:: ', prevProps);
    console.log('prevState:: ', prevState);
    console.log('this.props.google:: ', this.props.google)
    if (prevProps.google !== this.props.google) {
      this.loadMap();
    }
  }
  loadMap() {
    console.log('loading map')
    console.log('loadMap this.props:: ', this.props);
    console.log('loadMapthis.props.google:: ', this.props.google)
    if (this.props && this.props.google) {
      console.log('loadMap this.props:: ', this.props);
      console.log('loadMapthis.props.google:: ', this.props.google)

      const { google } = this.props;
      const maps = google.maps;
      console.log('loadMap maps:: ', maps)


      // const lol = maps.Marker({
      //   position: navigator.geolocation.getCurrentPosition((pos) => {
      //     const zoom = 14;
      //     crd = pos.coords;
      //     console.log(`Latitude : ${crd.latitude}`);
      //     console.log(`Longitude: ${crd.longitude}`);
      //     const center = new maps.LatLng(crd.latitude, crd.longitude)
      //     const mapConfig = Object.assign({}, {
      //       center: center,
      //       zoom: zoom,
      //     });
      //   }),
      //   map: new maps.Map(node, this.mapConfig)
      // })

      console.log('FIGURE WHAT TO DO HERE WITH THE MAPS!');
      const mapRef = this.refs.map;
      console.log('mapRef:: ', mapRef);
      const node = ReactDOM.findDOMNode(mapRef);
      let crd;
      const position = navigator.geolocation.getCurrentPosition((pos) => {
        const zoom = 14;
        crd = pos.coords;
        console.log(`Latitude : ${crd.latitude}`);
        console.log(`Longitude: ${crd.longitude}`);
        const center = new maps.LatLng(crd.latitude, crd.longitude)

        const mapConfig = Object.assign({}, {
          center: center,
          zoom: zoom,

        })
        var marker = new maps.Marker({
          position: center,
          map: mapRef,
          title: 'YOU Are HERE!',
        })



        this.map = new maps.Map(node, mapConfig);
        marker.setMap(this.map);
        console.log('marker:: ', marker);
        console.log('this.map::', this.map);
        return this.map
      })
    }

  }
  render() {
    const style = {
      width: '50%',
      height: '75%'
    }
    return (
      <div ref='map' style={style}>
        Loading..
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
        <h1>Explore</h1>
        <Map google={this.props.google} />
      </div>
    );
  }
}



export default GoogleApiWrapper({ apiKey: GOOGLEMAPSAPIKEY })(MapComponent);
