import React, { PropTypes as T } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { GoogleApiWrapper, Marker} from 'google-maps-react';
import AppBar from './app-bar';
import GOOGLEMAPSAPIKEY from './GOOGLEMAPSAPIKEY.js';
import ReactDOM from 'react-dom';
import { getLocalEvents, getLocation } from '../actions/index';


class Map extends React.Component {
  componentDidUpdate(prevProps, prevState) {
    console.log('prevProps:: ', prevProps);
    console.log('prevState:: ', prevState);
    if (prevProps.google !== this.props.google) {
      this.loadMap();
    }
  }
  loadMap() {
    console.log('loading map')
    console.log('loadMap this.props:: ', this.props);
    console.log('loadMapthis.props.google:: ', this.props.google)
    const { google } = this.props;
    if (this.props && this.props.google) {
      console.log('loadMap this.props:: ', this.props);
      console.log('loadMapthis.props.google:: ', this.props.google)

      const { google } = this.props;
      const maps = google.maps;
      console.log('loadMap maps:: ', maps)


      var locations = [
        ['Webster Hall', 40.73169140, -73.98929022],
        ['Highline Ballroom', 40.73988960, -73.99769460],
        ['Playstation Theatre', 40.75720100, -73.98576300],
        ['Gramercy Theatre', 40.738602000, -73.982597000],
        ];

      console.log('FIGURE WHAT TO DO HERE WITH THE MAPS!');
      const mapRef = this.refs.map;
      console.log('mapRef:: ', mapRef);
      const node = ReactDOM.findDOMNode(mapRef);
      let crd;
      const position = navigator.geolocation.getCurrentPosition((pos) => {
        const zoom = 12;
        crd = pos.coords;
        console.log(`Latitude : ${crd.latitude}`);
        console.log(`Longitude: ${crd.longitude}`);
        console.log(`crd:`, crd)
        const localEvents = getLocation(crd)
          .then((metroId) => {
            this.props.getLocalEvents(metroId)
          });

        const center = new maps.LatLng(crd.latitude, crd.longitude)

        const mapConfig = Object.assign({}, {
          center: center,
          zoom: zoom,
        })

        this.map = new maps.Map(node, mapConfig);

        var currentLocation = new maps.Marker({
          position: center,
          map: mapRef,
          title: 'YOU Are HERE!',
        })

        var markeringStuff = [];

        for (var i = 0; i < locations.length; i++) {
          let value = new google.maps.Marker({
            position: new google.maps.LatLng(locations[i][1], locations[i][2]),
            map: mapRef,
          });
          markeringStuff.push(value);
        };

        markeringStuff.forEach((value) => {
          return value.setMap(this.map);
        })

        console.log('DUMMYDATA:: ', markeringStuff);
        console.log('CURRENTLOCATION:: ', currentLocation)

        currentLocation.setMap(this.map);
        // console.log('marker:: ');
        console.log('this.map::', this.map);
        return this.map
      })
      console.log('position:: ', position);
    }


  }
  render() {
    console.log('INNER MAP PROPS: ', this.props);
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

    console.log('GOOGLE PROPS', this.props);
    return (
      <div ref="map" style={style}>
        <h1>Explore</h1>
        <Map {...this.props} />
      </div>
    );
  }
}

const googleWrapped = GoogleApiWrapper({ apiKey: GOOGLEMAPSAPIKEY })(MapComponent);

function mapStateToProps(state) {
  return {
    getLocalEvents: state.getLocalEvents,
  };
}
function mapDispatchToProps(dispatch) {
  return bindActionCreators({ getLocation, getLocalEvents }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(googleWrapped);


// const test = GoogleApiWrapper({ apiKey: GOOGLEMAPSAPIKEY })(MapComponent);
// export default connect(mapStateToProps, { getLocation, getLocalEvents })(test);
// export default GoogleApiWrapper({ apiKey: GOOGLEMAPSAPIKEY })(connect(mapStateToProps, { getLocation, getLocalEvents })(MapComponent));
