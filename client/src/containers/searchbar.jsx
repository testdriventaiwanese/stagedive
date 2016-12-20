import React, { Component } from 'react';

export default class SearchBar extends Component {
  onInputChange(event) {
    console.log(event.target.value);
  }

  render() {
    return (
      <form className="input-group">
        <input
          placeholder='Search for events'

          onChange={this.onInputChange} />
        <span className="input-group-btn">
          <button type="submit" className='btn btn-secondary'>Submit</button>
        </span>
      </form>
    )
  };
}
