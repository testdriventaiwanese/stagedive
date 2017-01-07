import React, { Component } from 'react';
import { Link } from 'react-router';
import Paper from 'material-ui/Paper';

class JournalPhoto extends Component {
  render() {
    const { event, i, comments } = this.props;
    let id = this.props.params.userId;
    let imageDiv = {
      width: '30%',
      float: 'left',
      height: '248px',
    };
    let imageStyle = {
      width: '100%',
    };
      let date = event.date.slice(5, 10) + '-' + event.date.slice(0, 4);
      let time = event.date.slice(11, 16);
      let userId = this.props.userInfo.userInfo
      return (
      <Paper style={imageDiv} zDepth={2}>
        <div key={event.id}>
          <Link to={`/journal/${userId}/${event.id}`}>
            <img src={event.image} style={imageStyle} />
          </Link>
        </div>
      </Paper>
      );
}
}

export default JournalPhoto;
