import { Component } from 'react';
import { Link } from 'react-router';

class JournalPhoto extends Component {
  render() {
    let id = localStorage.getItem('id');
    let imageDiv = {
      width: '30%',
      float: 'left',
      height: '248px',
    };
    let imageStyle = {
      width: '100%',
    };
// /${event.tm_id}
  console.log('EVENTS OBJECT IN JOURNAL: ', this.props.events);
    return this.props.events.pastEvents.map((event) => {
      let date = event.date.slice(5, 10) + '-' + event.date.slice(0, 4);
      let time = event.date.slice(11, 16);
      let userId = this.props.userInfo
      return (
        <Paper style={imageDiv} zDepth={2}>
        <div key={event.id}>
          <Link to={`/journal/${id}/${event.id}`}>
            <img src={event.image} style={imageStyle}/>
          </Link>
          <span><strong>{event.name}</strong></span>
          <p>Date: {date}</p>
        </div>
      </Paper>
      );
    });
  }
}

export default Photo;
