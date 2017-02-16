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
    const tileStyle = {
      height: '250px',
      minWidth: '90px',
    };
    const imageStyle = {
      height: 'inherit',
      width: 'inherit',
      textAlign: 'center',
    };
    let image = null;
    const largestPic = (imageArray) => {
      let largest = 0;
      let index;
      imageArray.forEach((image, i) => {
        if(image.width > largest) {
          largest = image.width;
          index = i;
        }
      });
      return imageArray[index].url;
    }
    if(event.image){
      image = largestPic(JSON.parse(event.image)) || null;
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
          style={tileStyle}
        >
          <img src={image} style={imageStyle} />
        </GridTile>
      </Link>
    );
  }
}

export default JournalPhoto;
