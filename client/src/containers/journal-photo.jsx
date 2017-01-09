import React, { Component } from 'react';
import { Link } from 'react-router';
import Paper from 'material-ui/Paper';
import {GridList, GridTile} from 'material-ui/GridList';

class JournalPhoto extends Component {
  render() {
    const { event, i, comments } = this.props;
    let id = this.props.params.userId;
    let imageDiv = {
      width: '100%',
      height: '250px',
    };
    let imageStyle = {
      height: '250px',
      textAlign: 'center',
    };
      let date = event.date.slice(5, 10) + '-' + event.date.slice(0, 4);
      let time = event.date.slice(11, 16);
      let userId = this.props.userInfo.userInfo
      return (
        <Paper style={imageDiv}>
          <GridTile
            key={event.id}
          >
              <Link to={`/journal/${userId}/${event.id}`}>
                <img src={event.image} style={imageStyle} />
              </Link>
          </GridTile>
        </Paper>
      );
}
}

export default JournalPhoto;
