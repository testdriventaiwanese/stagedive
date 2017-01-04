import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Link } from 'react-router';
// import { selectEvent } from '../actions/index';
import Paper from 'material-ui/Paper';

import { getArtistCalendar, unfollowArtist, saveArtist } from '../actions/index';

class ArtistPage extends Component {
  componentWillMount() {
    //
  }

  renderProfileBar() {
    return (
      <div>
        <h1>
          {this.props.events.userInfo.fullname}
        </h1>
        <button onClick={() => this.props.saveArtist(this.props.artists.userInfo.id)}>Follow</button>
        <button onClick={() => this.props.unfollowArtist(this.props.artists.userInfo.id)}>Unfollow</button>
      </div>
    )
  }

  renderArtist() {
    let imageDiv = {
      width: '35%',
      float: 'left',
      height: '248px',
    };
    let imageStyle = {
      width: '100%',
    };
    if (!this.props.artists) {
      return <div>Artist Not Listed</div>;
    }
    const artistsArr = this.props.artists.filter((artist) => {
      return artist.id === Number(this.props.params.artistId);
    });
    console.log('artistsArr:: ', artistsArr);
    const artist = artistsArr[0];
    return (
      <Paper>
        <div style={imageDiv}>
            <img src={artist.image} style={imageStyle}></img>
        </div>
        <div>
          <h2>{artist.name}</h2>
        </div>
        <div>
          <h6>Upcoming Events</h6>
          <p>Place</p>
          <p>Date</p>
        </div>
      </Paper>
    )
    // return this.props.events.futureEvents.slice(1).map((event) => {
    //   let date = event.date.slice(5, 10) + '-' + event.date.slice(0, 4);
    //   let time = event.date.slice(11, 16);
    //   return (
    //     <div key={event.id} className="list-group-item">
    //       <div style={imageDiv}>
    //         <img src="event.image" style={imageStyle}></img>
    //       </div>
    //       <div>
    //         <p><strong>{event.name}</strong></p>
    //         <p>{event.venue}</p>
    //         <span>{event.city}</span>
    //         <p>{event.country}</p>
    //         <span>{date}</span>
    //         <p>Time: {time}</p>
    //         <p><a href={event.event_url}>Buy Tickets</a></p>
    //         <p onClick={() => this.props.removeEvent(event)}>Remove Event</p>
    //       </div>
    //     </div>
    //   );
    // });
  }
  render() {
    return (
      <div>
        <h1>Artist Page</h1>
        <ul className="list-group col-sm-16">
          {this.renderArtist()}
        </ul>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    artists: state.getArtists,
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({getArtistCalendar, unfollowArtist, saveArtist }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(ArtistPage);
