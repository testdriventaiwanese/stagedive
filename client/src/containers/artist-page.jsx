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
        <Card key={event.id}>
          <div>
            <div>{event.displayName}</div>
            <div>{event.location.city}</div>
            <div>{event.start.date}</div>
            <div>{event.start.time}</div>
          </div>

        </Card>
      )
    })
  }
  renderArtist() {
    let avatarStyle = {
      width: '35%',
      float: 'left',
      height: '248px',
      margin: '10px',
      position: 'fixed',
    };
    let calendarStyle = {
      float: 'right',
      width: '45%',
    }
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
    console.log('INSIDE this.props:: ', this.props)
    console.log('OUTSIDE artistArr:: ', this.props.artists)
    let artistsArr;
    artistsArr = this.props.artists.filter((artist) => {
      console.log('artist.mbid in artistArr:: ', artist.mbid)
      console.log('props.artists in artistsArr:: ', this.props.artists);
      console.log('props.params.artist in artistArr:: ', this.props.params.artistId)
      if(artist.mbid === this.props.params.artistId) {
        return artist;
      };
    });
    console.log('artistsArr', artistsArr)
    console.log('1 artistsArr[0]:: ', artistsArr[0])
    console.log('this.props.params:: ', this.props.params)
    console.log('this.props.artistSearch.bandsintown.data.name:: ')

    if(artistsArr.length === 0 && !this.props.artistSearch) {
      console.log('2 artistsArr[0]:: ', artistsArr[0])
      console.log('!!!!!!  !!!!!! !!!!! artistSearch:: ', this.props.artistSearch)
      console.log('1 artistsArr[0]:: ', artistsArr[0])
      return(
        <div>Loading..</div>
      )
    }
    console.log('2 artistsArr[0]:: ', artistsArr[0]);
    console.log('!!!!!!  !!!!!! !!!!! artistSearch:: ', this.props.artistSearch)
    if(this.props.artistSearch.bandsintown) {
      artistsArr.push({
          name: this.props.artistSearch.bandsintown.data.name,
          facebook: this.props.artistSearch.bandsintown.data.facebook_page_url,
          upcomingEvents: this.props.artistSearch.bandsintown.data.upcoming_event_count,
          image: this.props.artistSearch.bandsintown.data.image_url,
        })
      if(this.props.params.artistId === this.props.artistSearch.songkick.data.resultsPage.results.artist[0].identifier[0].mbid) {
        artistsArr.push({
          name: this.props.artistSearch.bandsintown.data.name,
          facebook: this.props.artistSearch.bandsintown.data.facebook_page_url,
          upcomingEvents: this.props.artistSearch.bandsintown.data.upcoming_events,
          image: this.props.artistSearch.bandsintown.data.image_url,
        });
      }
    }
    console.log('4 artistsArr[0]', artistsArr[0])

    // console.log('artistArr:: ', artistsArr[0])
    // console.log('this.props.params:: ', this.props.params)
    // // console.log('this.props.artistSearch.songkick.data.resultsPage.results.artist[0].identifier[0]', this.props.artistSearch.songkick.data.resultsPage.results.artist[0].identifier[0])
    // console.log('INSIDE this.props.artistSearch:: ', this.props.artistSearch)
    // console.log('INSIDE this.props.artistSearch.songkick:: ', this.props.artistSearch);

    let artist = {
      name: artistsArr[0].name,
      facebook: artistsArr[0].facebook,
      upcomingEvents: artistsArr[0].upcomingEvents,
      image: artistsArr[0].image,
    };

    console.log('3 artistsArr[0]', artistsArr[0])

    console.log('artist:: ', artist)
    if(!this.props.artistCalendar.data) {
      return (
        <div>Loading..</div>
      )
    }

    return (
      <div>
      <Card>
        <div style={avatarStyle}>
            <img src={artist.image} style={imageStyle}></img>
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
        <div style={calendarStyle}>
          <h5><strong>Calendar</strong></h5>
          <div className="list-group col-sm-16">{this.renderCalendar()}</div>
        </div>
      </div>
    )
  }
  render() {
    // console.log('render this.props.artists::: ', this.props.artists )
    // console.log('render this.props.artistSearch:: ', this.props.artistSearch)
    // console.log('render')
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
    artistSearch: state.searchArtists,
    artistCalendar: state.getArtistCalendar,
  };
}

export default connect(mapStateToProps, { getArtistCalendar, removeArtist, searchArtists, getArtists })(ArtistPage);
