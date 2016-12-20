import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { selectEvent } from '../actions/index'

class PostIndex extends Component {
  componentWillMount() {
    console.log(this.props.events);
    // console.log('this wpld be a a great time to call an actrio creator')
  }

  render() {
    return(
      <div> this.componentWillMount()</div>
    )
  }
}

function mapStateToProps(state) {
  return {
    events: state.events
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ fetchPosts }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(PostIndex);
