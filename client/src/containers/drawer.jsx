import React from 'react';
import Drawer from 'material-ui/Drawer';
import MenuItem from 'material-ui/MenuItem';
import RaisedButton from 'material-ui/RaisedButton';
import Account from './account';
import Journal from './journal';
import EventList from './event-list';
import { Link } from 'react-router';

export default class DrawerLeft extends React.Component {

  constructor(props) {
    super(props);
    this.state = {open: true};
  }

  handleToggle = () => this.setState({open: !this.state.open});

  render() {
    return (
      <div>
        <RaisedButton
          label="Toggle Drawer"
          onTouchTap={this.handleToggle}
        />
        <Drawer open={this.state.open}>
          <Link to={"account"}>My Account</Link>
          <Link to={"journal"}>Concert Journal</Link>
        </Drawer>
      </div>
    );
  }
}
