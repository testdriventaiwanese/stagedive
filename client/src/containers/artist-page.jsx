import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Link } from 'react-router';
// import { selectEvent } from '../actions/index';
import Paper from 'material-ui/Paper';
import RaisedButton from 'material-ui/RaisedButton';


import { getArtistCalendar, removeArtist, saveArtist } from '../actions/index';

class ArtistPage extends Component {
  componentWillMount() {
    const artistsArr = this.props.artists.filter((artist) => {
      return artist.mbid === this.props.params.artistId;
    });
    const artist = artistsArr[0];

    this.props.getArtistCalendar(artist);
  }

  renderProfileBar() {
    return (
      <div>
        <h1>
          {this.props.events.userInfo.fullname}
        </h1>
        <button onClick={() => this.props.saveArtist(this.props.artists.userInfo.id)}>Follow</button>
        <button onClick={() => this.props.unfollowArtist(this.props.artists.userInfo.id)}>Unfollow</button>
      </div>
    )
  }

  renderCalendar() {
    if(!this.props.artistCalendar.data){
      return(
        <Paper>
          <div>
            Loading Calendar..
          </div>
        </Paper>
      )
    }
    return this.props.artistCalendar.data.resultsPage.results.event.map((event) => {
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
    const artist = artistsArr[0];
    console.log('artist:: ', artist);

    return (
      <Paper>
        <h1>{artist.name}</h1>
        <div style={imageDiv}>
            <img src={artist.image} style={imageStyle}></img>
        </div>
        <div>
          <h5><strong>Calendar</strong></h5>
            <RaisedButton
              label="Remove Event"
              secondary
              onClick={() => this.props.removeArtist(artist.mbid)}
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
  return bindActionCreators({getArtistCalendar, removeArtist, saveArtist }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(ArtistPage);
