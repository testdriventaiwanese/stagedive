import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { browserHistory } from 'react-router';
import {Tabs, Tab} from 'material-ui/Tabs';
import { saveResult } from '../actions/index';
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
          <Paper key={event.id} onClick={() => this.props.saveResult(event)} zDepth={2}>
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
    return this.props.artists.map((artist) => {
      return (
        <Paper key={artist.tracker_count} onClick={() => this.props.saveResult(artist)} zDepth={2}>
          <div>
            <div>{artist.name}</div>
            <div>{cityValue}{midValue}{countryValue}</div>
            <div>{artist.dates.start.localDate}</div>
          </div>
          <br />
        </Paper>
      );
    });
  }

  render() {
    return (
      <div>
        <AppBar />
        <button onClick={browserHistory.goBack}>Back</button>
        <h1>Search Results</h1>
        <div>
          {this.renderEvents()}
        </div>
      </div>
    );
  }
}


function mapStateToProps(state) {
  return {
    events: state.searchEvents,
    artists: state.searchArtists,
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ saveResult: saveResult }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(SearchResults);
