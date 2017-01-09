import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import RaisedButton from 'material-ui/RaisedButton';
import CircularProgress from 'material-ui/CircularProgress';
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import IconButton from 'material-ui/IconButton';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';
import Snackbar from 'material-ui/Snackbar';

import { Link, hashHistory } from 'react-router';
import { getUserEvents, getUserInfo, removeEvent, getEvents } from '../actions/index';
import Auth from '../modules/auth';

class EventList extends Component {
  constructor(props) {
    super(props);
     this.state = {
       open: false,
     };
   }

   handleTouchTap = () => {
     this.setState({
       open: true,
     });
   };

   handleRequestClose = () => {
     this.setState({
       open: false,
     });
   };

  componentWillMount() {
    const id = localStorage.getItem('id');
    const user = { id };
    this.props.getUserInfo();
    this.props.getUserEvents(user);
  }

  renderUpcoming() {
    const id = localStorage.getItem('id');
    const menuStyle = {
      float: 'right',
      height: '0%',
    }
    const imageDiv = {
      width: '30%',
      float: 'left',
      height: '248px',
      margin: '10px',
    };
    const imageStyle = {
      width: '100%',
    };
    let sortByDate = [];
    if(!this.props.events.futureEvents) {
      return (
        <div align='center'>
          <CircularProgress size={60} />
        </div>
      )
    }
    if(this.props.events.futureEvents.length > 0) {
      let event = this.props.events.futureEvents[0];
      let date = event.date.slice(5, 10) + '-' + event.date.slice(0, 4);
      let time = event.date.slice(11, 16);
      return (
        <Card className="list-group-item" zDepth={1}>
          <h1>Upcoming Event</h1>
          <CardMedia overlay={ <CardTitle title={event.name} subtitle={event.city} />} >
            <img src={event.image} style={imageStyle}/>
          </CardMedia>
          <CardActions>
            <IconMenu
              iconButtonElement={<IconButton><MoreVertIcon /></IconButton>}
              anchorOrigin={{horizontal: 'right', vertical: 'bottom'}}
              targetOrigin={{horizontal: 'right', vertical: 'top'}}
            >
            <Link to={`/event/${id}/${event.id}`}>
              <MenuItem primaryText="View Event Details" secondary/>
            </Link>
              <MenuItem
                primaryText="Remove Event"
                secondary
                onTouchTap={this.handleTouchTap}
                onClick={() => this.props.removeEvent(event.tm_id, 0)}
                />
                <Snackbar
                  open={this.state.open}
                  message="Removed Event"
                  autoHideDuration={4000}
                  onRequestClose={this.handleRequestClose}
                />
            </IconMenu>
          </CardActions>
          <CardText>
            <p><strong>{event.name}</strong></p>
            <p>{event.venue}</p>
            <span>{event.city}</span>
            <p>{event.country}</p>
            <span>{date}</span>
            <p>Time: {time}</p>
            <p><a href={event.event_url}>Buy Tickets</a></p>
          </CardText>

        </Card>
      );
    }
  }

  renderList() {
    const id = localStorage.getItem('id');
    const imageDiv = {
      width: '35%',
      float: 'left',
      height: '248px',
      margin: '10px',
    };
    const imageStyle = {
      width: '100%',
    };
    const menuStyle = {
      float: 'right',
      height: '0%',
    }
    return this.props.events.futureEvents.slice(1).map((event, i) => {
      let date = event.date.slice(5, 10) + '-' + event.date.slice(0, 4);
      let time = event.date.slice(11, 16);
      return (
        <Card key={event.id} className="list-group-item" zDepth={1}>
          <CardMedia
            overlay={ <CardTitle
            title={event.name}
            subtitle={event.city}
            /> }
          >
            <img src={event.image} style={imageStyle}/>
          </CardMedia>
            <CardActions>
              <IconMenu
                style={menuStyle}
                iconButtonElement={<IconButton><MoreVertIcon /></IconButton>}
                anchorOrigin={{horizontal: 'right', vertical: 'bottom'}}
                targetOrigin={{horizontal: 'right', vertical: 'top'}}
              >
              <Link to={`/event/${id}/${event.id}`}>
                <MenuItem primaryText="View Event Details" secondary/>
              </Link>
                <MenuItem
                  primaryText="Remove Event"
                  secondary
                  onTouchTap={this.handleTouchTap}
                  onClick={() => this.props.removeEvent(event.tm_id, 0)}
                  />
                  <Snackbar
                    open={this.state.open}
                    message="Event Removed"
                    autoHideDuration={4000}
                    onRequestClose={this.handleRequestClose}
                  />
              </IconMenu>
            </CardActions>
          <CardText>
            <p><strong>{event.name}</strong></p>
            <p>{event.venue}</p>
            <span>{event.city}</span>
            <p>{event.country}</p>
            <span>{date}</span>
            <p>Time: {time}</p>
            <p><a href={event.event_url}>Buy Tickets</a></p>
          </CardText>
        </Card>
      );
    });
  }
  render() {
    return (
      <div>
        <div>{this.renderUpcoming()}</div>
        <h1>Events Feed</h1>
        <div className="list-group col-sm-16">
          {this.renderList()}
        </div>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    events: state.userEvents,
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ getUserEvents, getUserInfo, removeEvent, getEvents }, dispatch);
}


export default connect(mapStateToProps, mapDispatchToProps)(EventList);
