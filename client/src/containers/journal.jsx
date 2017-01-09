import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { hashHistory } from 'react-router';
import Paper from 'material-ui/Paper';
import {GridList, GridTile} from 'material-ui/GridList';
import { removeEvent, getUserEvents } from '../actions/index';
import JournalPhoto from './journal-photo';
import CircularProgress from 'material-ui/CircularProgress';
import Auth from '../modules/auth';

class Journal extends Component {
  componentWillMount() {
    if (!Auth.isUserAuthenticated()) {
      hashHistory.push('/login');
    }
    let id = this.props.params.userId;
    let user = { id };
    this.props.getUserEvents(user);
  }
  // componentDidMount() {
  //   //GETS USER EVENTS
  //     let id = this.props.userInfo.userInfo;
  //     let user = { id };
  //     this.props.getUserEvents(user);
  // }

  render() {
    const styles = {
      root: {
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'space-around',
      },
      gridList: {
        width: 1000,
        overflowY: 'auto',
      },
    };

    // console.log('PROPS JOURNAL : ', this.props);
    if(this.props.userInfo.pastEvents.length === 0) {
      return (
        <div align='center'>
          <CircularProgress size={60} />
        </div>
      )
    }

    const journalPhotos = this.props.userInfo.pastEvents.map((event, i) => <JournalPhoto {...this.props} key={event.id} i={i} event={event} /> );
    return (
      <div style={styles.root}>
        <GridList
          cols={3}
          cellHeight={250}
          style={styles.gridList}
        >
        {journalPhotos}
        </GridList>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    comments: state.getEventComments,
    userInfo: state.userEvents,
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ removeEvent, getUserEvents }, dispatch);
}


export default connect(mapStateToProps, mapDispatchToProps)(Journal);
