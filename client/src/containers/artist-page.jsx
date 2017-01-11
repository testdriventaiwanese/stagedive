import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { hashHistory } from 'react-router';
import Paper from 'material-ui/Paper';
import RaisedButton from 'material-ui/RaisedButton';
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';

import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import IconButton from 'material-ui/IconButton';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';
import Snackbar from 'material-ui/Snackbar';
import { getArtistCalendar, removeArtist, saveArtist, searchArtists, getArtists } from '../actions/index';
import Auth from '../modules/auth';

class ArtistPage extends Component {
  constructor(props) {
    super(props);
     this.state = {
       open: false,
     };
   }

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
    const artistsArr = this.props.artists.filter((artist) => {
      if(artist.mbid === this.props.params.artistId) {
        return artist;
      }
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
      margin: '10px',
    };
    let imageStyle = {
      width: '100%',
    };
    let menuStyle = {
      height: '0%',
      float: 'right',
    }
    if (!this.props.artists) {
      return <div>Artist Not Listed</div>;
    }
    const artistsArr = this.props.artists.filter((artist) => {
      console.log('artist in artistsArr:: ', artist);
      return artist.mbid === this.props.params.artistId;
    });
    let artist = artistsArr[0];
    if(!this.props.artistCalendar.data) {
      return (
        <div>Loading..</div>
      )
    }
    let image = this.props.artists.filter((name) => { return name.mbid === this.props.params.artistId }).map((img) => {return img});
    let musician = !this.props.artistCalendar.data.results ? '' : this.props.artistCalendar.data.resultsPage.results.event[0].performance.map((performer) => { return performer.artist}).map((id) => {return {name: id.displayName, mbid: !id.identifier[0] ? null : id.identifier[0].mbid } }).filter((mb, i)=> { if(mb.mbid === this.props.params.artistId) {return mb.name}});
    console.log('musician:: ',musician);
    const artistImageFromSearch = this.props.artistImage.songkick.data.resultsPage.results.artist[0];
    if (!musician) {
      musician = [{name: artistImageFromSearch.displayName, mbid: artistImageFromSearch.identifier[0].mbid}];
    }
    if (image.length === 0) {
      image = [this.props.artistImage.bandsintown.data.image_url];
    }
    console.log('image: ', image)
    const realName = !musician[0] ? artist.name : musician[0].name;
    const musicId = !musician[0] ? artist.mbid : musician[0].mbid;
    artist = {
      name: realName,
      mbid: musicId,
      picture: image[0].image,
      facebook: image[0].facebook,
      upcomingEvents: image[0].upcoming_events,
    }
    console.log('artist:: ', artist)
    return (
      <div>
      <Card>
        <div style={imageDiv}>
            <img src={artist.picture} style={imageStyle}></img>
            <h1>{artist.name}</h1>
            <p>Upcoming: {artist.upcomingEvents}</p>
            <p><a href={artist.facebook}>Facebook</a></p>
        </div>
      </Card>
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
              onClick={() => this.props.removeArtist(artist.mbid, 0)}
              />
          </IconMenu>
        </CardActions>
        <div>
          <h5><strong>Calendar</strong></h5>
          <div className="list-group col-sm-16">{this.renderCalendar()}</div>
        </div>
      </div>
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
    artistImage: state.searchArtists,
    artistCalendar: state.getArtistCalendar,
  };
}

export default connect(mapStateToProps, { getArtistCalendar, removeArtist, searchArtists, getArtists })(ArtistPage);
