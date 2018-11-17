import React, { Component } from 'react';

class RoomList extends Component {
    constructor(props){
        super(props);
        this.state ={
            rooms:[],
            newroom:''
        }
        this.roomsRef = this.props.firebase.database().ref('rooms');
    }
    componentDidMount(){
        this.roomsRef.on('child_added', snapshot => {
            const room = snapshot.val();
            room.key = snapshot.key;
            this.setState({ rooms: this.state.rooms.concat( room ) })
        });
    }

    createRoom(e){
        e.preventDefault();
        
        if (document.getElementById("newRoom").value !== ''){
        this.roomsRef.push({
            name: document.getElementById("newRoom").value
        })} else {
            alert('Invalid name try again');
        };
        this.setState({newroom: ''})
    }
    handleChange(e){
        this.setState({newroom: e.target.value})
    }
    
    render(){
        return(
            <div className='roomList'>
                {this.state.rooms.map((room)=>
                    <li key={room.key} onClick={()=> this.props.setRoom(room)}>
                        {room.name}
                    </li>
                )}
                <br></br>
                <form onSubmit={ (e)=>this.createRoom(e)}>
                    <input placeholder='Room Name' id='newRoom' type='text' value={this.state.newroom} onChange={(e)=> this.handleChange(e)}></input>
                    <input type='submit' value='Create Room'></input>
                </form>
                
    
            </div>
        )
    }
}

export default RoomList;