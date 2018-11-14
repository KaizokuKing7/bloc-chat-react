import React, { Component } from 'react';
import './App.css';
import * as firebase from 'firebase';
import RoomList from './components/RoomList.js';
import MessageList from './components/MessageList';


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
      activeRoom: ''
    };
    this.setRoom = this.setRoom.bind(this);
  }

  setRoom(room){
    this.setState({activeRoom: room.key})
  }

  render() {
    return (
      <div className="App">
      <header>
        <h1>Bloc Chat</h1>
      </header>
      <main>
        <RoomList
          firebase={firebase} 
          setRoom={(room) => this.setRoom(room)} />
        <MessageList
          firebase={firebase} 
          activeRoom={this.state.activeRoom} />
        
      </main>
      </div>
    );
  }
}

export default App;
