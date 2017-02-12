import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Paper from 'material-ui/Paper';
import RaisedButton from 'material-ui/RaisedButton';
import FlatButton from 'material-ui/FlatButton';
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import IconButton from 'material-ui/IconButton';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';
import Delete from 'material-ui/svg-icons/action/delete';
import Snackbar from 'material-ui/Snackbar';
import { Link } from 'react-router';
import Avatar from 'material-ui/Avatar';
import moment from 'moment';

import { getArtists, removeArtist } from '../actions/index';

class Artists extends Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
    };
  }

  componentDidMount() {
    this.props.getArtists();
  }

  handleTouchTap() {
    this.setState({
      open: true,
    });
  }

  handleRequestClose() {
    this.setState({
      open: false,
    });
  }

  renderArtists() {
    if (this.props.artists.length === 0) {
      return (
        <Card zDepth={2}>
          <div>
            You're not following any artists!
          </div>
          <br />
        </Card>
      );
    }
    return this.props.artists.map((artist, i) => {
      let avatar = <Avatar>{artist.name.slice(0, 1)}</Avatar>;
      if (artist.image) {
        avatar = <Avatar src={artist.image} />;
      }
      const onTour = moment(artist.onTourUntil).format('LL');
      return (
        <Card key={artist.id} zDepth={1}>
          <IconMenu
            style={{float:'right', position:'relative', zIndex:2}}
            iconButtonElement={<IconButton><MoreVertIcon /></IconButton>}
            anchorOrigin={{horizontal: 'right', vertical: 'bottom'}}
            targetOrigin={{horizontal: 'right', vertical: 'top'}}
          >
            <MenuItem
              primaryText='Unfollow'
              onTouchTap={this.handleTouchTap}
              rightIcon={<Delete />}
              onClick={() => this.props.removeArtist(artist.mbid, i)}
            />
              <Snackbar
                open={this.state.open}
                message="Artist Unfollowed"
                autoHideDuration={4000}
                onRequestClose={this.handleRequestClose}
              />
          </IconMenu>
          <CardHeader
            title={<Link to={`/artists/${artist.mbid}`}>{artist.name}</Link>}
            subtitle={`On Tour through ${onTour.toString()}`}
            avatar={avatar}
            />
        </Card>
      );
    });
  }

  render() {
    return (
      <div>
        <h5>Artists You're Following</h5>
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
  return bindActionCreators({ getArtists, removeArtist }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Artists);
