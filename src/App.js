import React, { Component } from 'react';
import './App.css';
import * as firebase from 'firebase';
import RoomList from './components/RoomList.js';
import MessageList from './components/MessageList';
import User from './components/User';


// Initialize Firebase
var config = {
  apiKey: "AIzaSyC4KPna8akgrREfm1GPKW6u2CJX-56ctKE",
  authDomain: "bloc-chat-react-7443c.firebaseapp.com",
  databaseURL: "https://bloc-chat-react-7443c.firebaseio.com",
  projectId: "bloc-chat-react-7443c",
  storageBucket: "bloc-chat-react-7443c.appspot.com",
  messagingSenderId: "827320899701"
};
firebase.initializeApp(config);

class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      activeRoom: {},
      user:null
    };
    this.setRoom = this.setRoom.bind(this);
  }

  setRoom(room){
    this.setState({activeRoom: room})
  }

  setUser(user){
    this.setState({user :user})
  }


  render() {
    return (
      <div className="App">
      <div className='left-column'>
        <h1>Bloc Chat</h1>
      <User
        firebase={firebase}
        setUser={(user)=>this.setUser(user)}
        user={this.state.user} />
        <RoomList
          firebase={firebase} 
          setRoom={(room) => this.setRoom(room)} />
      </div>
        <MessageList
          firebase={firebase} 
          activeRoom={this.state.activeRoom}
          user={this.state.user} />
      </div>
    );
  }
}

export default App;
