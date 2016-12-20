import React, { Component } from 'react';
import { connect } from 'react-redux';
const axios = require('axios');

class BookDetail extends Component {
  getall () {
    axios.get('/api/events/getall')
      .then((resp) => {
        console.log(resp);
      });
  }

  render() {
    if (!this.props.book) {
      return <div>Select a book to get started.</div>;
    }

    return (
      <div>
        <h3>Details for:</h3>
        <div>Title: {this.props.book.title}</div>
        <div>Pages: {this.props.book.pages}</div>
        <div><button onClick={this.getall}>Get Events</button></div>

      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    book: state.activeBook
  };
}

export default connect(mapStateToProps)(BookDetail);
