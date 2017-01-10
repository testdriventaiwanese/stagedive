import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { hashHistory } from 'react-router';
import Paper from 'material-ui/Paper';
import {GridList, GridTile} from 'material-ui/GridList';
import { removeEvent, getUserEvents, refreshEventComments } from '../actions/index';
import JournalPhoto from './journal-photo';
import CircularProgress from 'material-ui/CircularProgress';
import Auth from '../modules/auth';
import LinearProgress from 'material-ui/LinearProgress';

class Journal extends Component {
  componentWillMount() {
    if (!Auth.isUserAuthenticated()) {
      hashHistory.push('/login');
    }
    const id = this.props.params.userId;
    const user = { id };
    this.props.getUserEvents(user);
    this.props.refreshEventComments();
  }

  render() {
    const styles = {
      root: {
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'space-around',
        marginTop: '10px',
      },
      gridList: {
        width: 1000,
        overflowY: 'auto',
      },
      loadBar: {
        width: '100%',
        left: '0',
      }
    };

    if (!this.props.userInfo.pastEvents) {
      return (
        <div align='center' style={styles.loadBar}>
          <LinearProgress mode="indeterminate" />
        </div>
      )
    }

    const journalPhotos = this.props.userInfo.pastEvents.map((event, i) => <JournalPhoto {...this.props} key={event.id} i={i} event={event} /> );
    return (
      <div style={styles.root}>
        <GridList
          cols={3}
          cellHeight={250}
          padding={20}
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
  return bindActionCreators({ removeEvent, getUserEvents, refreshEventComments }, dispatch);
}


export default connect(mapStateToProps, mapDispatchToProps)(Journal);
