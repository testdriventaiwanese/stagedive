import React, {Component} from 'react';
import { Link, hashHistory } from 'react-router';
import Paper from 'material-ui/Paper';
import RaisedButton from 'material-ui/RaisedButton';
import IconMenu from 'material-ui/IconMenu';
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import MenuItem from 'material-ui/MenuItem';
import IconButton from 'material-ui/IconButton';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';
import Avatar from 'material-ui/Avatar';
import {Tabs, Tab} from 'material-ui/Tabs';



export default class About extends React.Component{
  renderAbout() {
    const cardStyle ={
      width: '30%',
      height: '100%',
    }

    return(
      <div>
        <h1>
          <strong>Concert Wallet is the best way to make your concert going experience awesome</strong>
        </h1>
        <Card>
          <h2>Tech Stack</h2>
          <img src={`http://i.imgur.com/iK6B8hl.png`} />
        </Card>
      </div>
    )
  }
  renderTeam() {
    const cardStyle ={
      width: '30%',
      height: '100%',
    }
    const avatarStyle = {
      width: '200px',
      marginLeft: '68px',
      marginTop: '20px',
      marginBottom: '20px',
      borderRadius: '70%',
      border: '1px solid #5f6063',
      backgroundSize: 'cover',
      backgroundRepeat: 'no-repeat',
      backgroundPosition: '50% 50%',
    };
    const aboutStyle = {
      margin: '10px',
    }
    const gitHub = {
      marginRight: '30px',
      height:'30px',
      width:'30px',
    }
    const linkedIn = {
      height: '35px',
      width: '35px',
    }

    return(
      <div>
        <h1>Meet the Team</h1>
        <p style={aboutStyle}>Three avid concert-goers teaming up and producing the most streamlined web-app that will make your concert experience easy</p>
        <div>
            <Card style = {cardStyle, {float:'right', width: '30%'}} zDepth={1}>
              <img style= {avatarStyle} src={`http://i.imgur.com/71zox3t.jpg`} />
              <h2 style={{textAlign:'center',marginBottom: '20px'}}>Sean Ho</h2>
              <div style={aboutStyle}>
                <p>Sean is a lover of music.</p>
                <p><strong>Favorite Artists:</strong> Ed Sheeran, Yellowcard, blink-182</p>
                <p><strong>Most Memorable Concert:</strong> Yellowcard's Final World Tour</p>
                <a href={`https://www.linkedin.com/in/seanho10`}><img style={linkedIn} src={`http://i.imgur.com/mZQpO34.png`}></img></a>
                <a href={`http://github.com/seansinflipflops`}><img style={gitHub} src={`http://i.imgur.com/GP6otU2.png`} /></a>
              </div>
            </Card>
          </div>
        <div>
          <Card style = {cardStyle, {float: 'left', width: '30%'}} zDepth={1}>
            <img style= {avatarStyle} src={`http://i.imgur.com/F8BmZi3.jpg`} />
            <h2 style={{textAlign:'center', marginBottom: '20px'}}>Adam Wang</h2>
            <div style={aboutStyle}>
              <p>Adam is a lover of music.</p>
              <p><strong>Favorite Artists:</strong> Matt Zo, Above and Beyond, Music </p>
              <p><strong>Most Memorable Concert:</strong> Above and Beyond ABGT100</p>
              <a href={`https://www.linkedin.com/in/adamawang`}><img style={linkedIn} src={`http://i.imgur.com/mZQpO34.png`}></img></a>
              <a href={`http://github.com/adamawang`}><img style={gitHub} src={`http://i.imgur.com/GP6otU2.png`} /></a>
            </div>
          </Card>
          </div>
          <div>
            <Card style = {cardStyle, {margin: '0 auto', width: '30%', height: '100%'}} zDepth={1}>
              <img style= {avatarStyle} src={`http://i.imgur.com/yMyJdpD.jpg`} />
              <h2 style={{textAlign:'center', marginBottom: '20px'}}>Timothy Yin</h2>
              <div style={aboutStyle}>
                <p>Tim is a lover of music.</p>
                <p><strong>Favorite Artists:</strong> Porter Robinson, Oh Wonder, ODESZA</p>
                <p><strong>Most Memorable Concert:</strong> Porter Robinson's Worlds</p>
                <a href={`https://www.linkedin.com/in/tim-yin`}><img style={linkedIn, { margin: '0 auto', height: '35px', width: '35px'}} src={`http://i.imgur.com/mZQpO34.png`}></img></a>
                <a href={`http://github.com/yimothy`}><img style={gitHub, { margin: '0 auto', height: '35px', width: '35px'}}src={`http://i.imgur.com/GP6otU2.png`} /></a>
              </div>
            </Card>
          </div>
      </div>
    )
  }
  render() {
    const tabsStyle = {
      boxShadow: '0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24)',
      borderRadius: '2px',
    }
    const tabStyle = {
      backgroundColor: 'white',
      color: 'black',
    }
    return (
        <Tabs style={tabsStyle}>
          <Tab style={tabStyle} label="About" value="About" >
            {this.renderAbout()}
          </Tab>
          <Tab style={tabStyle} label="Meet The Team" value="meetTheTeam">
            {this.renderTeam()}
          </Tab>
        </Tabs>
    );
  }

}
