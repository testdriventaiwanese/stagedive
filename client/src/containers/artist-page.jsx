import React, { Component } from 'react';
import { connect } from 'react-redux';
import Paper from 'material-ui/Paper';
import { Card } from 'material-ui/Card';
import { getArtistCalendar, removeArtist, saveArtist, searchArtists, getArtists } from '../actions/index';
import moment from 'moment';
import FlatButton from 'material-ui/FlatButton';


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
  }

  handleRequestClose() {
    this.setState({
      open: false,
    });
  }
  componentWillMount() {
    this.props.getArtists();
    const artistsArr = this.props.artists.filter((artist) => {
      if (artist.mbid === this.props.params.artistId) {
        return artist;
      }
    });

    const artist = artistsArr[0];
    const search = { mbid: this.props.params.artistId }
    if (!artist) {
      this.props.getArtistCalendar(search)
    } else {
      this.props.getArtistCalendar(artist);
    }
  }

  renderCalendar() {
    const innerEvents = {
      padding: '10px',
    };
    const eventDetails = {
      fontSize: '10pt',
      marginLeft: '15px',
    };
    if (!this.props.artistCalendar.data) {
      return (
        <Paper>
          <div>
            No Upcoming Events!
          </div>
        </Paper>
      );
    }

    const events = this.props.artistCalendar.data.resultsPage.results.event || [];

    return events.map((event) => {
      const momentDate = moment(event.start.date).format('LL');
      const est = moment(event.date)._d;
      const date = momentDate.toString() + ' ' + est.toString().slice(39);
      const time = moment(event.start.time, 'HH:mm:ss').format('h:mm A')

      return(
        <Card key={event.id} >
          <div style={innerEvents}>
            <div><strong>{event.displayName}</strong></div>
            <div style={eventDetails}>
              <div>{event.location.city}</div>
              <div>{date}</div>
              <div>{time}</div>
            </div>
          </div>
        </Card>
      );
    });
  }
  renderArtist() {
    const artistStyle = {
      width: '35%',
      float: 'left',
      margin: '10px',
    };
    const calendarStyle = {
      float: 'right',
      width: '60%',
      height: '1100px',
      overflow: 'scroll',
    }
    const calTitle = {
      width: '20%',
      marginLeft: '450px',
      marginTop: '20px',
    }
    const imageStyle = {
      width: '90%',
      marginLeft: '19px',
      marginRight: '10px',
      marginTop: '15px',
      marginBottom: '10px',
      borderRadius: '5px',
    };
    const artistTextStyle = {
      margin: '10px',
    };
    const flatButtonStyle = {
      float: 'right',
    };
    if (!this.props.artists) {
      return <div>Artist Not Listed</div>;
    }
    const artistsArr = this.props.artists.filter((artist) => {
      if (artist.mbid === this.props.params.artistId) {
        return artist;
      }
    });
    if (artistsArr.length === 0 && !this.props.artistSearch) {
      return (
        <div>Loading..</div>
      );
    }
    if (this.props.artistSearch.bandsintown) {
      artistsArr.push({
          name: this.props.artistSearch.bandsintown.data.name,
          facebook: this.props.artistSearch.bandsintown.data.facebook_page_url,
          upcomingEvents: this.props.artistSearch.bandsintown.data.upcoming_event_count,
          image: this.props.artistSearch.bandsintown.data.image_url,
      });
      if (this.props.params.artistId === this.props.artistSearch.songkick.data.resultsPage.results.artist[0].identifier[0].mbid) {
        artistsArr.push({
          name: this.props.artistSearch.bandsintown.data.name,
          facebook: this.props.artistSearch.bandsintown.data.facebook_page_url,
          upcomingEvents: this.props.artistSearch.bandsintown.data.upcoming_events,
          image: this.props.artistSearch.bandsintown.data.image_url,
        });
      }
    }
    const artist = {
      name: artistsArr[0].name,
      facebook: artistsArr[0].facebook,
      upcomingEvents: !artistsArr[0].upcomingEvents ? artistsArr[0].upcoming_events : artistsArr[0].upcomingEvents,
      image: artistsArr[0].image,
    };
    if (!this.props.artistCalendar.data) {
      return (
        <div>Loading..</div>
      );
    }
    return (
      <div>
      <Card style={artistStyle}>
        <div>
          <img src={artist.image} style={imageStyle}></img>
          <div style={artistTextStyle}>
          <h1><strong>{artist.name}</strong></h1>
          <p>Upcoming: {artist.upcomingEvents}</p>
          <p><a href={artist.facebook}>Facebook</a></p>
            <div style={flatButtonStyle}>
              <FlatButton onClick={() => this.props.saveArtist(this.props.artistSearch.bandsintown.data, this.props.artistSearch.songkick.data.resultsPage.results.artist[0])}>Follow</FlatButton>
              <FlatButton onClick={() => this.props.removeArtist(this.props.params.artistId, 0)}> Unfollow</FlatButton>
            </div>
          </div>
        </div>
      </Card>
        <div>
          <div style={calTitle}>
            <h1><strong>Calendar</strong></h1>
          </div>
          <div style={calendarStyle}>{this.renderCalendar()}</div>
        </div>
      </div>
    );
  }
  render() {
    return (
      <div>
        <ul className="list-group col-sm-16">
          {this.renderArtist()}
        </ul>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    artists: state.getArtists,
    artistSearch: state.searchArtists,
    artistCalendar: state.getArtistCalendar,
  };
}

export default connect(mapStateToProps, { getArtistCalendar, removeArtist, searchArtists, getArtists, saveArtist })(ArtistPage);
