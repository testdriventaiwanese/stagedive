import React, { Component } from 'react';
import { Link } from 'react-router';
import Paper from 'material-ui/Paper';
import {GridList, GridTile} from 'material-ui/GridList';
import moment from 'moment';
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';


class JournalPhoto extends Component {
  render() {
    const { event, i, comments } = this.props;
    const id = this.props.params.userId;
    const imageDiv = {
      width: '100%',
      height: '250px',
    };
    const imageStyle = {
      height: '250px',
      textAlign: 'center',
    };
    let image = null;
    if(event.image){
      image = JSON.parse(event.image)[3].url || null;
    };
    const momentDate = moment(event.date).format('LLLL');
    const momentFromNow = moment(event.date).fromNow();
    const est = moment(event.date)._d;
    const userId = this.props.userInfo.userInfo;
    return (
      <Link to={`/journal/${userId}/${event.id}`}>
        <GridTile
          key={event.id}
          title={event.name}
          subtitle={momentFromNow.toString()}
        >
          <img src={image} style={imageStyle} />
        </GridTile>
      </Link>
    );
  }
}

export default JournalPhoto;
