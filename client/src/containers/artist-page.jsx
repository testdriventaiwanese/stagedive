import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { hashHistory } from 'react-router';
import Paper from 'material-ui/Paper';
import RaisedButton from 'material-ui/RaisedButton';
import { getArtistCalendar, removeArtist, saveArtist, searchArtists, getArtists } from '../actions/index';
import Auth from '../modules/auth';

class ArtistPage extends Component {
  componentWillMount() {
    if (!Auth.isUserAuthenticated()) {
      hashHistory.push('/login');
    }
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
    };
    let imageStyle = {
      width: '90%',
      height: '90%',
    };
    if (!this.props.artists) {
      return <div>Artist Not Listed</div>;
    }
    const artistsArr = this.props.artists.filter((artist) => {
      console.log('artistsarrartist:: ', artist);
      return artist.mbid === this.props.params.artistId;
    });
    let artist = artistsArr[0];
    if(!this.props.artistCalendar.data) {
      return (
        <div>Loading..</div>
      )
    }
    const image = this.props.artists.filter((name) => { return name.mbid === this.props.params.artistId }).map((img) => {return img.image});
    console.log('image:: ', image)

    const musician = this.props.artistCalendar.data.resultsPage.results.event[0].performance.map((performer) => { return performer.artist}).map((id) => {return {name: id.displayName, mbid: !id.identifier[0] ? null : id.identifier[0].mbid } }).filter((mb, i)=> { if(mb.mbid === this.props.params.artistId) {return mb.name}});
    console.log('musician:: ',musician);
    const realName = !musician[0] ? '' : musician[0].name;
    console.log('ARTIST NAME:: ', realName);
    artist = {
      name: realName,
      picture: !image[0] ? this.props.artistImage.bandsintown.data.image_url : image[0],
    }

    return (
      <Paper>
        <h1>{artist.name}</h1>
        <div style={imageDiv}>
            <img src={artist.picture} style={imageStyle}></img>
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
    console.log('this.props.artists:: ', this.props.artists);
    console.log('this.props.params.artistId', this.props.params.artistId);
    console.log('this.props. Artist Calendar:: ', this.props.artistCalendar)
    console.log('ARTISTS IMAGE:: ', this.props.artistImage)

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

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ getArtistCalendar, removeArtist, searchArtists, getArtists }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(ArtistPage);
