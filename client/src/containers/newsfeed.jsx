import React, { Component } from 'react';
import { hashHistory } from 'react-router';
import Friends from './friends';
import FriendEvents from './friends-events';

class NewsFeed extends Component {
  render() {
    const leftStyle = {
      width: '33%',
      float: 'left',
      marginTop: '10px',
    };
    const rightStyle = {
      width: '65%',
      float: 'right',
      marginBottom: '10px',
      marginTop: '10px',
    };
    return (
      <div className="newsfeed-container">
        <div>
          <FriendEvents />
        </div>
        <div>
          <Friends />
        </div>
      </div>
    );
  }
}

export default NewsFeed;
