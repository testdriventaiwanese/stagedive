import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Link } from 'react-router';
import Paper from 'material-ui/Paper';
import RaisedButton from 'material-ui/RaisedButton';
import { getArtistCalendar, removeArtist, saveArtist } from '../actions/index';

class ArtistPage extends Component {
  componentWillMount() {
    console.log('ARTISTPAGE:: ',this.props.params.artistId);
    console.log('ARTISTPAGE:: ', this.props)
    const artistsArr = this.props.artists.filter((artist) => {
      return artist.mbid === this.props.params.artistId;
    });
    const artist = artistsArr[0];
    const search = {mbid: this.props.params.artistId}
    if(!artist) {
      this.props.getArtistCalendar(search)
    } else {
      this.props.getArtistCalendar(artist);
    }
  }

  renderCalendar() {
    if(!this.props.artistCalendar.data){
      return(
        <Paper>
          <div>
            No Upcoming Events!
          </div>
        </Paper>
      )
    }

    let events = this.props.artistCalendar.data.resultsPage.results.event || [];
    return events.map((event) => {
      return(
        <Paper key={event.id}>
          <div>
            <div>{event.displayName}</div>
            <div>{event.location.city}</div>
            <div>{event.start.date}</div>
            <div>{event.start.time}</div>
          </div>

        </Paper>
      )
    })
  }
  renderArtist() {
    let imageDiv = {
      width: '35%',
      float: 'left',
      height: '248px',
    };
    let imageStyle = {
      width: '100%',
    };
    if (!this.props.artists) {
      return <div>Artist Not Listed</div>;
    }
    const artistsArr = this.props.artists.filter((artist) => {
      return artist.mbid === this.props.params.artistId;
    });
    let artist = artistsArr[0];
    const search = {mbid: this.props.params.artistId}

    if(!this.props.artistCalendar.data) {
      return (
        <div>Loading..</div>
      )
    }
    const musician = this.props.artistCalendar.data
    console.log('artist calendar:: ',musician);
    const realName = !musician.resultsPage.results.event ? '' : musician.resultsPage.results.event[0].performance[0].displayName;
    console.log('ARTIST NAME:: ', realName);
    artist = {
      name: realName,
      image: undefined,
    }

    return (
      <Paper>
        <h1>{artist.name}</h1>
        <div style={imageDiv}>
            <img src={artist.image} style={imageStyle}></img>
        </div>
        <div>
          <h5><strong>Calendar</strong></h5>
            <RaisedButton
              label="Remove Artist"
              secondary
              onClick={() => this.props.removeArtist(artist.mbid, 0)}
            />
          <div className="list-group col-sm-16">{this.renderCalendar()}</div>
        </div>
      </Paper>
    )
  }
  render() {
    return (
      <div>
        <ul className="list-group col-sm-16">
          {this.renderArtist()}
        </ul>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    artists: state.getArtists,
    artistCalendar: state.getArtistCalendar,
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ getArtistCalendar, removeArtist }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(ArtistPage);
