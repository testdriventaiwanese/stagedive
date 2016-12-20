import React, { Component } from 'react';
import { connect } from 'react-redux';
import { searchEvents } from '../actions/index';
import { bindActionCreators } from 'redux';

export default class SearchBar extends Component {
  onInputChange(event) {
    console.log('SUBMIT FUNCTION CALLED');
    console.log(event.target.value);
  }

  render() {
    return (
      <form className="input-group">
        <input
          placeholder="Search for events"
          onClick={this.onInputChange}
        />
        <span className="input-group-btn">
          <button className="btn btn-secondary">Submit</button>
        </span>
      </form>
    )
  };
}

// function mapStateToProps(state) {
//   // Whatever is returned will show up as props
//   // inside of BookList
//   return {
//     events: state.searchEvents
//   };
// }
//
// // Anything returned from this function will end up as props
// // on the BookList container
// function mapDispatchToProps(dispatch) {
//   // Whenever selectBook is called, the result shoudl be passed
//   // to all of our reducers
//   return bindActionCreators({ searchEvents: searchEvents }, dispatch);
// }
//
// // Promote BookList from a component to a container - it needs to know
// // about this new dispatch method, selectBook. Make it available
// // as a prop.
// export default connect(mapStateToProps, mapDispatchToProps)(SearchBar);
