import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
// import { browserHistory } from 'react-router';
// import { selectEvent } from '../actions/index';

class SearchResults extends Component {
  renderList() {
    return this.props.results.map((result) => {
      return (
        <li
          key={result.id}
          onClick={() => this.props.selectEvent(result)}
          className="list-group-item">
          <div>{result.name}</div>
          <div>{result._embedded.venues[0].city.name}, {result._embedded.venues[0].country.name}</div>
          <div>{result.dates.start.localDate}</div>
        </li>
      );
    });
  }
  render() {
    return (<div>
      <h1>Search Results</h1>
      <ul>
        {this.renderList()}
      </ul>
    </div>
    )
  }
}


function mapStateToProps(state) {
  // Whatever is returned will show up as props
  // inside of BookList
  return {
    results: state.searchEvents
  };
}

// Anything returned from this function will end up as props
// on the BookList container
// function mapDispatchToProps(dispatch) {
//   // Whenever selectBook is called, the result shoudl be passed
//   // to all of our reducers
//   return bindActionCreators({ selectEvent: selectEvent }, dispatch);
// }

// Promote BookList from a component to a container - it needs to know
// about this new dispatch method, selectBook. Make it available
// as a prop.
export default connect(mapStateToProps, null)(SearchResults);
