import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
// import { selectEvent } from '../actions/index';
import { getEvents, removeEvent, getUserInfo } from '../actions/index';

class Upcoming extends Component {
  // componentWillMount() {
  //   this.props.getEvents();
  // }

  renderList() {
    let imageDiv = {
      width: '35%',
      float: 'left',
      height: '248px',
    };
    let imageStyle = {
      width: '100%',
    };
    let sortByDate = [];
    // let event = {date:}
    // let dateArray = this.props.events.map((event) => {
    //   event.dateObj = new Date(event.date.slice(0,10));
    // });
    // console.log('THIS IS DATEARRAY IN UPCOMING: ', dateArray);
    if(this.props.events.length > 0) {
      sortByDate = this.props.events.sort((a,b)=> {
        let aDate = new Date(a.date.slice(0,10));
        let bDate = new Date(b.date.slice(0,10));
        return aDate - bDate;
      })
      let event = this.props.events[0];
      let dateObj = new Date(event.date.slice(0,10));
      let date = dateObj.toString();
      let time = event.date.slice(11, 16);
      return (
        <div className="list-group-item">
          <h1>Upcoming Event</h1>
          <div style={imageDiv}>
            <img src={event.image} style={imageStyle}></img>
          </div>
          <div>
            <p><strong>{event.name}</strong></p>
            <p>{event.venue}</p>
            <span>{event.city}</span>
            <p>{event.country}</p>
            <span>{date}</span>
            <p>Time: {time}</p>
            <p><a href={event.event_url}>Buy Tickets</a></p>
            <p onClick={() => this.props.removeEvent(event)}>Remove Event</p>
          </div>
        </div>
      );
    }
  }
  render() {
    return (
      <div>
        <ul className="list-group col-sm-16">
          {this.renderList()}
        </ul>
      </div>
    )
  }
}

function mapStateToProps(state) {
  // Whatever is returned will show up as props
  // inside of BookList
  return {
    events: state.getEvents,
    userInfo: state.getUserInfo,
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ removeEvent, getEvents, getUserInfo }, dispatch);
}


export default connect(mapStateToProps, mapDispatchToProps)(Upcoming);
