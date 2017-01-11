import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { hashHistory, Link } from 'react-router';
import {Tabs, Tab} from 'material-ui/Tabs';
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import { saveEvent, addFollower, saveArtist, getUserEvents } from '../actions/index';
import RaisedButton from 'material-ui/RaisedButton';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentAdd from 'material-ui/svg-icons/content/add';
import ArrowBack from 'material-ui/svg-icons/navigation/arrow-back';
import moment from 'moment';
import Avatar from 'material-ui/Avatar';

class SearchResults extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: 'events',
    };
    this.renderEvents = this.renderEvents.bind(this);
    this.renderArtists = this.renderArtists.bind(this);
    this.renderUsers = this.renderUsers.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.onProfileClick = this.onProfileClick.bind(this);
  }

  handleChange(value) {
    this.setState({ value });
  }

  onProfileClick(user) {
    this.props.getUserEvents(user);
  }

  renderEvents() {
    const imageDiv = {
      width: '35%',
      position: 'relative',
      width: '220px',
      margin: '10px',
    };
    const imageStyle = {
      width: '60%',
    };
    if (this.props.events.length === 0) {
      return (
        <Card zDepth={1}>
          <div>
            No Events Found
          </div>
          <br />
        </Card>
      )
    }
    return this.props.events.map((event) => {
      console.log('event : ', event);
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
      let city = null;
      if (event._embedded.venues[0].city.name) {
        city = event._embedded.venues[0].city.name;
      };
      let venueName = null;
      let stateCountryName = null;
      let venueStateOrCountry = null;
      if (event._embedded.venues[0].name) {
        venueName = event._embedded.venues[0].name;
      }
      if (event._embedded.venues[0].state) {
        stateCountryName = event._embedded.venues[0].city.name;
        venueStateOrCountry = event._embedded.venues[0].state.stateCode;
      } else if (event._embedded.venues[0].country) {
        stateCountryName = event._embedded.venues[0].city.name;
        venueStateOrCountry = event._embedded.venues[0].country.name;
      }
      let image = null;
      if (event.images){
        image = largestPic(event.images) || null;
      }
      const momentDate = moment(event.dates.start.dateTime).format('LLLL');

      return (
        <Card key={event.id} >
          <FloatingActionButton onClick={() => this.props.saveEvent(event)} style={{float:'right', margin:'10px'}}>
            <ContentAdd />
          </FloatingActionButton>
          <CardText>
            <h4><strong>{event.name}</strong></h4>
            <br />
            <span>{venueName}</span>
            <br />
            <span>{`${stateCountryName}, ${venueStateOrCountry}`}</span>
            <br />
            <span>Event date: {momentDate.toString()}</span>
          </CardText>
          <br />
        </Card>
      );
    });
  }

  renderArtists() {
    const imageDiv = {
      width: '35%',
      float: 'left',
      height: '248px',
    };
    const avatarStyle = {
      width: '20%',
      height: '20%',
    };
    let bandsintown = this.props.artists.bandsintown;
    let songkick = this.props.artists.songkick;
    if(this.props.artists.bandsintown !== undefined || this.props.artists.songkick !== undefined){
      bandsintown = this.props.artists.bandsintown.data;
      if(this.props.artists.songkick.data.resultsPage.results.artist !== undefined && this.props.artists.songkick.data.resultsPage.results.artist !== undefined) {
        songkick = this.props.artists.songkick.data.resultsPage.results.artist[0];
        console.log('bandsintown.image_url:: ', bandsintown.image_url)
        let avatar = <Avatar src={bandsintown.image_url} style={avatarStyle}/>
        return (
          <Card zDepth={1}>
            <FloatingActionButton mini={true} style={{float:'right', margin:'10px', position:'relative', zIndex:2}}>
              <ContentAdd onClick={() => this.props.saveArtist(bandsintown, songkick)} />
            </FloatingActionButton>
            <CardHeader
              title={ <Link to={`/artists/${songkick.identifier[0].mbid}`}><h2>{songkick.displayName}</h2></Link>}
              subtitle={<div><p>On Tour until: {songkick.onTourUntil}</p><p><a href={songkick.uri}>Songkick Tour Dates</a></p><p>Number of upcoming events: {bandsintown.upcoming_event_count}</p></div>}
              avatar={avatar}
            />
          </Card>
        );
      } else {
        return (
          <Card zDepth={1}>
            <div>
              No Artists Found
            </div>
            <br />
          </Card>
        );
      }
  }
}

  renderUsers() {
    if (this.props.users.length === 0) {
      return (
        <Card zDepth={1}>
          <div>
            No Users Found
          </div>
          <br />
        </Card>
      )
    }

    return this.props.users.map((user, index) => {
      let avatar = <Avatar>{user.fullname.slice(0,1)}</Avatar>;
      if (user.profile_photo){
        avatar = <Avatar src={user.profile_photo} />;
      }
      return (
        <Card key={user.id} zDepth={1}>
          <FloatingActionButton mini={true} style={{float:'right', margin:'10px', position:'relative', zIndex:2}}>
            <ContentAdd onClick={() => this.props.addFollower(user.id)} />
          </FloatingActionButton>
          <CardHeader
            title={ <Link to={`/view/${user.id}`} onClick={() => this.onProfileClick(user)}>{user.fullname}</Link>}
            subtitle={user.email}
            avatar={avatar}
          />
        </Card>
      );
    });
  }

  render() {
    return (
      <div>
        <FloatingActionButton style={{float:'left', margin:'10px'}}>
          <ArrowBack onClick={hashHistory.goBack} />
        </FloatingActionButton>
        <h1>Search Results</h1>
          <Tabs
            value={this.state.value}
            onChange={this.handleChange}
          >
            <Tab label="Events" value="events" style={{backgroundColor: '#424242' }}>
              {this.renderEvents()}
            </Tab>
            <Tab label="Artists" value="artists" style={{backgroundColor: '#424242' }}>
              {this.renderArtists()}
            </Tab>
            <Tab label="Friends" value="users" style={{backgroundColor: '#424242' }}>
              {this.renderUsers()}
            </Tab>
          </Tabs>
      </div>
    );
  }
}


function mapStateToProps(state) {
  return {
    events: state.searchEvents,
    artists: state.searchArtists,
    users: state.searchUsers,
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ saveEvent, addFollower, saveArtist, getUserEvents }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(SearchResults);
