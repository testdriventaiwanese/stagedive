import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { searchEvents } from '../actions/index'

class SearchResults2 extends Component {
  componentWillMount() {
    console.log(this.props);
    this.props.searchEvents();
    // console.log('this wpld be a a great time to call an actrio creator')
  }

  render() {
    return(
      <div> TEST TEST TEST </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    events: state.events
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ searchEvents }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(SearchResults2);
