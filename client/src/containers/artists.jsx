import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Paper from 'material-ui/Paper';
import RaisedButton from 'material-ui/RaisedButton';
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import IconButton from 'material-ui/IconButton';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';
import Snackbar from 'material-ui/Snackbar';
import { Link } from 'react-router';
import { getArtists, removeArtist } from '../actions/index';

class Artists extends Component {
  constructor(props) {
    super(props);
     this.state = {
       open: false,
     };
   };
   handleTouchTap() {
     this.setState({
       open: true,
     });
   };
   handleRequestClose() {
     this.setState({
       open: false,
     });
   };
  componentWillMount() {
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
      height: '90%',
    };
    const menuStyle = {
      float: 'right',
      height: '0%',
    }
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
    return this.props.artists.map((artist, i) => {
      return (
        <Paper key={artist.id} className="list-group-item" zDepth={2}>
          <div>
            <div style={imageDiv}>
              <img src={artist.image} style={imageStyle} alt="artist headshot" />
            </div>
            <CardActions>
              <IconMenu
                style={menuStyle}
                iconButtonElement={<IconButton><MoreVertIcon /></IconButton>}
                anchorOrigin={{horizontal: 'right', vertical: 'bottom'}}
                targetOrigin={{horizontal: 'right', vertical: 'top'}}
              >
                <MenuItem
                  primaryText="Unfollow"
                  secondary
                  onTouchTap={this.handleTouchTap}
                  onClick={() => this.props.removeArtist(artist.mbid, i)}
                  />
                  <Snackbar
                    open={this.state.open}
                    message="Artist Unfollowed"
                    autoHideDuration={4000}
                    onRequestClose={this.handleRequestClose}
                  />
              </IconMenu>
            </CardActions>
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
  return bindActionCreators({ getArtists, removeArtist }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Artists);
