import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Paper from 'material-ui/Paper';
import { Link } from 'react-router';
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
      margin: '10px',
    };
    const imageStyle = {
      width: '100%',
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
      console.log(artist);
      return (
        <Paper key={artist.id} className="list-group-item" zDepth={2}>
          <div>
            <div style={imageDiv}>
              <img src={artist.image} style={imageStyle} alt="artist headshot" />
            </div>
            <div>
              <Link to={`/artists/${artist.mbid}`}>
                <div><strong>{artist.name}</strong></div>
              </Link>
              <p>{artist.facebook}</p>
              <p>{artist.events}</p>
              <p>On Tour until: {artist.onTourUntil}</p>
              <p>Remaining Tour Dates: {artist.upcoming_events}</p>

            </div>
          </div>
        </Paper>
      );
    });
  }

  render() {
    return (
      <div>
        <h3>Artists Following</h3>
        <ul className='list-group col-sm-16'>
          {this.renderArtists()}
        </ul>
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
