import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

class SearchResults extends Component {
  renderList() {
    return this.props.results.map((result) => {
      return (
        <li
          key={result.id}
          onClick={() => this.props.selectEvent(result)}
          className="list-group-item">
          {result.name}
        </li>
      );
    });
  }
  render() {
    return (
      <ul className="list-group col-sm-4">
        {this.renderList()}
      </ul>
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
export default connect(mapStateToProps)(SearchResults);
