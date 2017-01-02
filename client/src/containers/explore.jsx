import React, {component} from 'react'
import Map, {GoogleApiWrapper} from 'google-maps-react'
import { searchNearby } from '../actions/index'
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import AppBar from '../containers/app-bar';
import MapComponent from '../containers/map';
import GOOGLEMAPSAPIKEY from './GOOGLEMAPSAPIKEY.js';

class Explore extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      places: [],
      pagination: null
    }
  }

  onReady(mapProps, map) {
    const {google} = this.props;
    const opts = {
      location: map.center,
      radius: '500',
      types: ['cafe']
    }
    searchNearby(google, map, opts)
      .then((results, pagination) => {
        this.setState({
          places: results,
          pagination
        })
      }).catch((status, result) => {
        // There was an error
      })
  }
  render() {
    console.log('I AM THE EXPLORE PAGE')

    return (
      <div>
          <Map
          google={this.props.google}
          onReady={this.onReady.bind(this)}
          visible={true}>

          {this.state.places.map(place => {
            return (<div key={place.id}>{place.name}</div>)
          })}

        </Map>
      </div>
    )
  }

};


function mapDispatchToProps(dispatch) {
  return bindActionCreators({ searchNearby }, dispatch);
}

// export default connect(null, mapDispatchToProps)(Explore);
export default GoogleApiWrapper({
  apiKey: GOOGLEMAPSAPIKEY
})(Explore)
