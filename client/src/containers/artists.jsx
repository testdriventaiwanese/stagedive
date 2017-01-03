import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Paper from 'material-ui/Paper';
import { getArtists, unfollowArtist } from '../actions/index';

class Artists extends Component {
  componentDidMount() {
    this.props.getArtists();
  }

  renderArtists() {
    const imageDiv = {
      width: '35%',
      float: 'left',
      height: '248px',
    };
    const imageStyle = {
      width: '60%',
    };
    if (this.props.artists.length === 0) {
      return (
        <Paper zDepth={2}>
          <div>
            You're not following any artists!
          </div>
          <br />
        </Paper>
      );
    }
    return this.props.artists.map((artist) => {
      return (
        <Paper key={artist.id} zDepth={2}>
          <div>
            <div style={imageDiv}>
              <img src={artist.image} style={imageStyle} alt="artist headshot" />
            </div>
            <div><strong>{artist.name}</strong></div>
            <div>{artist.facebook}</div>
            <div>{artist.events}</div>
            <div>On Tour until: {artist.onTourUntil}</div>
            <div>Remaining Tour Dates: {artist.upcoming_events}</div>
          </div>
        </Paper>
      );
    });
  }

  render() {
    return (
      <div>
        <h3>Artists Following</h3>
        <div>{this.renderArtists()}</div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    artists: state.getArtists,
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ getArtists, unfollowArtist }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Artists);
