import React, { PropTypes as T } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { GoogleApiWrapper, Marker} from 'google-maps-react';
import ReactDOM from 'react-dom';
import { getLocalEvents, getLocation, showLocalEvents } from '../actions/index';
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import Paper from 'material-ui/Paper';
import moment from 'moment'
import GMAPS from '../containers/gmaps'

class Map extends React.Component {
  componentDidMount() {
    setTimeout(() => {
      this.loadMap();
    }, 150)
  }
  componentDidUpdate(prevProps, prevState) {
    console.log('prevState:: ', prevState);
    if (prevProps.google !== this.props.google) {
      this.loadMap();
    }
    console.log('prevProps:: ', prevProps);
  }

  componentWillUnmount () {
    clearTimeout(this.timeout)
  }

  loadMap() {
    const { google } = this.props;
    if (this.props && this.props.google) {
      const { google } = this.props;
      const maps = google.maps;
      const mapRef = this.refs.map;
      const node = ReactDOM.findDOMNode(mapRef);
      let crd;
      const position = navigator.geolocation.getCurrentPosition((pos) => {
        const zoom = 13;
        crd = pos.coords;
        getLocation(crd)
            .then((val) => {
              const localEvents = val.type;
              return localEvents;
            })
            .then((location) => {
              return this.props.getLocalEvents(location);
            })
            .then((value) => {
              return this.props.localEvents.payload.resultsPage;
            })
            .then((events) => {
              return events.filter((value) => {
                return value.status === 'ok';
              }).map((value, i) => {
                return {
                  id: i,
                  displayName: value.displayName,
                  venue: value.venue.displayName,
                  longitude: value.venue.lng,
                  latitude: value.venue.lat,
                  uri: value.uri,
                  date: value.start.date,
                  time: value.start.time,
                }
              }).filter((startTime) => {
                return startTime.time !== null;
              })
            })
            .then((concert) => {
              // this.props.object = concert.splice();
              // this.state.object =concert;
              console.log('CONCERT:::', concert)
              this.props.showLocalEvents(concert);

              let val;
              return concert.map((value, i) => {
                return {
                  value: i,
                  infowindow: new google.maps.InfoWindow({
                    content: '<div>' + '<p><strong>' + value.displayName + '</strong></p>' + '<p>' + value.venue + '</p>' + '<p>' + value.date + '</p>' + '<p>' + value.time + '</p>' + '</div>'
                  }),
                  markers: new google.maps.Marker({
                    position: new google.maps.LatLng(value.latitude, value.longitude),
                    map: mapRef,
                  }),
                }
              })
            })
            .then((mark) => {
              console.log('MARK IN PROMISES:: ', mark);
              return mark.forEach((marking) => {
                  marking.markers.setMap(this.map);
                  marking.markers.addListener('mouseover', function() {
                    marking.infowindow.open(marking.markers.map, marking.markers);
                  });
                  marking.markers.addListener('mouseout', function() {
                    marking.infowindow.close(marking.markers.map, marking.markers);
                  })
              });
            })

        const center = new maps.LatLng(crd.latitude, crd.longitude)

        const mapConfig = Object.assign({}, {
          center: center,
          zoom: zoom,
        })

        this.map = new maps.Map(node, mapConfig);

        var currentLocation = new maps.Marker({
          position: center,
          map: mapRef,
        })

        currentLocation.setMap(this.map);

        return this.map
      })
    }
  }

  render() {
    const style = {
      width: '100%',
      height: '100%'
    }

    return (
        <div ref='map' style={style}>
          Loading..
        </div>
    )
  }
}


export class MapComponent extends React.Component {
  renderEvents() {
    if(!this.props.showEvents.payload) {
      return (
        <div>Loading Events</div>
      )
    }
    return this.props.showEvents.payload.map((value, i) => {
      const momentDate = moment(value.date).format('LL');
      const est = moment(value.date)._d;
      const date = momentDate.toString() + ' ' + est.toString().slice(39);
      const time = moment(value.time, 'HH:mm:ss').format('h:mm A')

      return (
          <Card key={i} >
            <CardHeader
              title={value.displayName}
              subtitle={<div><div>{value.venue}</div><div>{date}</div><div>{time}</div></div>}
            />
          </Card>
    )
    })
  }
  render() {

    const style = {
      width: '40vw',
      height: '75vh',
      float: 'left',
    }
    let eventStyle = {
      float: 'right',
      width: '48%',
    }
    let over = {
      overflow:'scroll',
      height: '1100px',
    }
    let mapStyle = {
      width: '100%',
    }
    return (
      <div>

          <div style={eventStyle}>
            <h1>Local Events</h1>
            <div style={over}>{this.renderEvents()}</div>
          </div>
          <div ref="map" style={style}>
            <h1>Explore</h1>
            <Map style={mapStyle} {...this.props} object={[]} />
          </div>
      </div>
    );
  }
}

const googleWrapped = GoogleApiWrapper({ apiKey: GMAPS})(MapComponent);

function mapStateToProps(state) {
  return {
    localEvents: state.getLocalEvents,
    showEvents: state.showLocalEvents,
  };
}

export default connect(mapStateToProps, { getLocation, getLocalEvents, showLocalEvents })(googleWrapped);


// const test = GoogleApiWrapper({ apiKey: GOOGLEMAPSAPIKEY })(MapComponent);
// export default connect(mapStateToProps, { getLocation, getLocalEvents })(test);
// export default GoogleApiWrapper({ apiKey: GOOGLEMAPSAPIKEY })(connect(mapStateToProps, { getLocation, getLocalEvents })(MapComponent));
