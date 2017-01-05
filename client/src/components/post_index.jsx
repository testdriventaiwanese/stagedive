import React, { Component } from 'react';
import EventList from '../containers/event-list';
import Friends from '../containers/friends';
import Artists from '../containers/artists';

class PostIndex extends Component {
  render() {
    return (
      <div>
        <div>
        </div>
        <div>
          <EventList />
          <Friends />
          <Artists />
        </div>
    </div>

    );
  }
}

export default PostIndex;
