import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Paper from 'material-ui/Paper'


class EventDetail extends Component {
  renderEvent() {
    if (!this.props.event) {
      return <div>Event Not Listed</div>;
    }
    const eventArr = this.props.event.events.filter((event) => {
      return event.id === Number(this.props.params.eventId);
    });
    let imageDiv = {
      width: '35%',
      float: 'left',
      height: '248px',
      margin: '10px',
    };
    let imageStyle = {
      width: '100%',
    };
    return (
      <Paper key={eventArr[0].id} className="list-group-item" zDepth={2}>
        <div style={imageDiv}>
            <img src={eventArr[0].image} style={imageStyle}></img>
        </div>
        <div>
          <p>{eventArr[0].name}</p>
        </div>
      </Paper>
    )
  }

  render() {
    return (
      <div>
        <h3>Event Details</h3>
        <div className="list-group col-sm-16">
          {this.renderEvent()}
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    event: state.getEvents,
  };
}


export default connect(mapStateToProps)(EventDetail);
