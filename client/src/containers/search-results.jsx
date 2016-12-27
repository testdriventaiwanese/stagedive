import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { browserHistory } from 'react-router';
import { saveResult } from '../actions/index';
import SearchBar from './searchbar';

class SearchResults extends Component {
  renderList() {
    let imageDiv = {
      width: '35%',
      float: 'left',
      height: '248px',
    };
    let imageStyle = {
      width: '100%',
    };

    if(this.props.results.length === 0) {
      return <div>No Results Found</div>
    }
    else {
      return this.props.results.map((result) => {
        let city = ()=> {
          return result._embedded.venues[0].city.name ? result._embedded.venues[0].city.name : '';
        };
        let cityValue = city();
        // let country = '';
        let country = () => (result._embedded.venues[0].country.name ? result._embedded.venues[0].country.name : '');
        let countryValue = country();
        let mid = () => (result._embedded.venues[0].country.name ? ', ' : '');
        let midValue = mid();

        return (
          <li key={result.id}
            onClick={() => this.props.saveResult(result)}
            className="list-group-item">

            <div>{result.name}</div>
            <div>{cityValue}{midValue}{countryValue}</div>
            <div>{result.dates.start.localDate}</div>
          </li>
        );
      });
    }
  }

  // <div style={imageDiv}>
  //   <img src={image} style={imageStyle}/>
  // </div>
  // <button onClick={browserHistory.push('/')}>Back</button>
  render() {
    return (<div>
      <button onClick={browserHistory.goBack}>Back</button>
      <SearchBar />
      <h1>Search Results</h1>
      <ul>
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
    results: state.searchEvents,
  };
}

// Anything returned from this function will end up as props
// on the BookList container
function mapDispatchToProps(dispatch) {
  // Whenever selectBook is called, the result shoudl be passed
  // to all of our reducers
  return bindActionCreators({ saveResult: saveResult }, dispatch);
}

// Promote BookList from a component to a container - it needs to know
// about this new dispatch method, selectBook. Make it available
// as a prop.
export default connect(mapStateToProps, mapDispatchToProps)(SearchResults);
