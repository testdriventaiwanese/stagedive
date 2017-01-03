import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { browserHistory, Link } from 'react-router';
import {Tabs, Tab} from 'material-ui/Tabs';
import { saveEvent, addFollower, saveArtist, getOtherUserEvents } from '../actions/index';
import SearchBar from './searchbar';
import Paper from 'material-ui/Paper';
import RaisedButton from 'material-ui/RaisedButton';
import { saveEvent, addFollower, saveArtist } from '../actions/index';

class SearchResults extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: 'events',
    };
    this.renderEvents = this.renderEvents.bind(this);
    this.renderArtists = this.renderArtists.bind(this);
    this.renderUsers = this.renderUsers.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.onProfileClick = this.onProfileClick.bind(this);
  }

  handleChange(value) {
    this.setState({ value });
  }

  onProfileClick(user) {
    this.props.getOtherUserEvents(user);
  }

  renderEvents() {
    if (this.props.events.length === 0) {
      return <div>No Results Found</div>
    }
    return this.props.events.map((event) => {
      const city = () => {
        return event._embedded.venues[0].city.name ? event._embedded.venues[0].city.name : '';
      };
      const cityValue = city();
      // const country = '';
      const country = () => (event._embedded.venues[0].country.name ? event._embedded.venues[0].country.name : '');
      const countryValue = country();
      const mid = () => (event._embedded.venues[0].country.name ? ', ' : '');
      const midValue = mid();

      return (
        <Paper key={event.id} onClick={() => this.props.saveEvent(event)} zDepth={2}>
          <div>
            <div>{event.name}</div>
            <div>{cityValue}{midValue}{countryValue}</div>
            <div>{event.dates.start.localDate}</div>
          </div>
          <br />
        </Paper>
      );
    });
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
    let bandsintown = this.props.artists.bandsintown;
    let songkick = this.props.artists.songkick;
    if(this.props.artists.bandsintown !== undefined || this.props.artists.songkick !== undefined){
      bandsintown = this.props.artists.bandsintown.data;
      songkick = this.props.artists.songkick.data.resultsPage.results.artist[0];
    }
    if (!bandsintown) {
      return (
        <Paper zDepth={2}>
          <div>
            No Artists Found
          </div>
          <br />
        </Paper>
      );
    }

    return (
      <Paper key={songkick.identifier[0].mbid} zDepth={2}>
        <div>
          <div style={imageDiv}>
            <img src={bandsintown.image_url} style={imageStyle} alt="artist headshot" />
          </div>
          <div>{songkick.displayName}</div>
          <div>On Tour until: {songkick.onTourUntil}</div>
          <div><a href={songkick.uri}>Songkick Tour Dates</a></div>
          <div><a href={bandsintown.facebook_page_url}>Facebook Page</a></div>
          <div>Number of upcoming events: {bandsintown.upcoming_event_count}</div>
          <RaisedButton
            label='Follow Artist'
            secondary
            onClick={() => this.props.saveArtist(bandsintown, songkick)}
          />
        </div>
        <br />
      </Paper>
    );
  }

  renderUsers() {
    const imageDiv = {
      width: '35%',
      float: 'left',
      height: '248px',
    };
    const imageStyle = {
      width: '100%',
    };
    if (this.props.users.length === 0) {
      return (
        <Paper zDepth={2}>
          <div>
            No Users Found
          </div>
          <br />
        </Paper>
      )
    }

    return this.props.users.map((user, index) => {
      return (
        <Paper key={user.id} zDepth={2}>
          <div>
            <div>{user.fullname}</div>
            <div>{user.email}</div>
            <Link to={`/view/${user.id}`}>
              <button onClick={this.onProfileClick(user)}>See Profile</button>
            </Link>
            <button onClick={() => this.props.addFollower(user.id)}>Follow</button>
          </div>
          <br />
        </Paper>
      );
    });
  }

  render() {
    return (
      <div>
        <button onClick={browserHistory.goBack}>Back</button>
        <h1>Search Results</h1>
          <Tabs
            value={this.state.value}
            onChange={this.handleChange}
          >
            <Tab label="Events" value="events" style={{backgroundColor: '#424242' }}>
              {this.renderEvents()}
            </Tab>
            <Tab label="Artists" value="artists" style={{backgroundColor: '#424242' }}>
              {this.renderArtists()}
            </Tab>
            <Tab label="Friends" value="users" style={{backgroundColor: '#424242' }}>
              {this.renderUsers()}
            </Tab>
          </Tabs>
      </div>
    );
  }
}


function mapStateToProps(state) {
  return {
    events: state.searchEvents,
    artists: state.searchArtists,
    users: state.searchUsers,
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ saveEvent, addFollower, saveArtist }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(SearchResults);
