import React, { Component } from 'react';
import { connect } from 'react-redux';
import { hashHistory } from 'react-router';
import { bindActionCreators } from 'redux';
import { searchEvents, searchArtists, searchUsers } from '../actions/index';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import FlatButton from 'material-ui/FlatButton';
import TextField from 'material-ui/TextField';
import SearchIcon from 'material-ui/svg-icons/action/search';
import {List, ListItem} from 'material-ui/List';

class SearchBar extends Component {
  constructor(props) {
    super(props);

    this.state = {term: ''};

    this.onInputChange = this.onInputChange.bind(this);
    this.onFormSubmit = this.onFormSubmit.bind(this);
  }

  onInputChange(event) {
    this.setState({term: event.target.value});

  }

  onFormSubmit(event) {
    event.preventDefault();
    this.props.searchEvents(this.state.term);
    this.props.searchArtists(this.state.term);
    this.props.searchUsers(this.state.term);
    this.setState({ term: '' });
    hashHistory.push('/results');
  }

  render() {
    return (
      <div className="search-bar">
        <MuiThemeProvider>
          <form onSubmit={this.onFormSubmit}>
            <SearchIcon style={{ margin: '13px 0 0 0' }} />
            <TextField
              style={{ color: 'white' }}
              placeholder="Search events / artist / friends"
              value={this.state.term}
              onChange={this.onInputChange}
            >
            </TextField>
          </form>
        </MuiThemeProvider>
      </div>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ searchEvents, searchArtists, searchUsers }, dispatch);
}

export default connect(null, mapDispatchToProps)(SearchBar);
