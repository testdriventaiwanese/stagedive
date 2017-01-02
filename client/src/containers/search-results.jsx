import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { browserHistory } from 'react-router';
import {Tabs, Tab} from 'material-ui/Tabs';
import { saveEvent, addFollower } from '../actions/index';
import SearchBar from './searchbar';
import Paper from 'material-ui/Paper';
import AppBar from '../containers/app-bar';

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
  }

  handleChange(value) {
    this.setState({ value });
  }

  renderEvents() {
    if (this.props.events.length === 0) {
      return <div>No Results Found</div>
    }
    else {
      return this.props.events.map((event) => {
        let city = ()=> {
          return event._embedded.venues[0].city.name ? event._embedded.venues[0].city.name : '';
        };
        let cityValue = city();
        // let country = '';
        let country = () => (event._embedded.venues[0].country.name ? event._embedded.venues[0].country.name : '');
        let countryValue = country();
        let mid = () => (event._embedded.venues[0].country.name ? ', ' : '');
        let midValue = mid();

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
  }

  renderArtists() {
    let imageDiv = {
      width: '35%',
      float: 'left',
      height: '248px',
    };
    let imageStyle = {
      width: '100%',
    };
    if(this.props.artists.length === 0) {
      return (
        <Paper zDepth={2}>
          <div>
            No Artists Found
          </div>
          <br />
        </Paper>
      )
    }

    return this.props.artists.map((artist) => {
      return (
        <Paper key={artist.tracker_count} zDepth={2}>
          <div>
            <div style={imageDiv}>
                <img src={artist.image_url} style={imageStyle}></img>
            </div>
            <div>{artist.name}</div>
            <div><a href={artist.facebook_page_url}>Facebook Page</a></div>
          </div>
          <br />
        </Paper>
      );
    });
  }

  renderUsers() {
    let imageDiv = {
      width: '35%',
      float: 'left',
      height: '248px',
    };
    let imageStyle = {
      width: '100%',
    };
    if(this.props.users.length === 0) {
      return (
        <Paper zDepth={2}>
          <div>
            No Users Found
          </div>
          <br />
        </Paper>
      )
    }

    return this.props.users.map((user) => {
      return (
        <Paper key={user.id} zDepth={2}>
          <div>
            <div>{user.fullname}</div>
            <div>{user.email}</div>
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
  return bindActionCreators({ saveEvent, addFollower }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(SearchResults);
