import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Paper from 'material-ui/Paper';
// import { selectEvent } from '../actions/index';
import { getEvents, removeEvent, getUserInfo } from '../actions/index';
import AppBar from '../containers/app-bar';

class Journal extends Component {
  componentWillMount() {
    this.props.getUserInfo();
    this.props.getEvents();
  }

  renderList() {
    let imageDiv = {
      width: '30%',
      float: 'left',
      height: '248px',
    };
    let imageStyle = {
      width: '100%',
    };

    return this.props.events.pastEvents.map((event) => {
      let date = event.date.slice(5, 10) + '-' + event.date.slice(0, 4);
      let time = event.date.slice(11, 16);
      return (
        <div key={event.id}>
          <Paper style={imageDiv} zDepth={2}>
              <img src={event.image} style={imageStyle}/>
              <p><strong>{event.name}</strong></p>
              <span>Date: {date}</span>
          </Paper>
        </div>
      );
    });
  }


  // <figure className='grid-figure'>
  //         <div className='grid-photo-wrap'>
  //           <Link to={`/view/${post.code}`}>
  //             <img src={post.display_src} alt={post.caption} className='grid-photo'/>
  //           </Link>
  //         </div>
  //         <figCaption>
  //           <p>{post.caption}</p>
  //           <div className='control-buttons'>
  //             <button onClick={this.props.increment.bind(null, i)} className='likes'>
  //               &hearts; {post.likes}
  //             </button>
  //             <Link to={`/view/${post.code}`} className='button'>
  //               <span className='speech-bubble'></span>
  //               {comments[post.code] ? comments[post.code].length : 0}
  //             </Link>
  //           </div>
  //         </figCaption>
  //       </figure>

  render() {
    console.log('THESE ARE THE EVENTS IN RENDER:', this.props.events.pastEvents);
    return (
      <div>
        <h1>Concert Journal</h1>
        <ul className="list-group col-sm-16">
          {this.renderList()}
        </ul>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    events: state.getEvents,
    userInfo: state.getUserInfo,
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ removeEvent, getEvents, getUserInfo }, dispatch);
}


export default connect(mapStateToProps, mapDispatchToProps)(Journal);
