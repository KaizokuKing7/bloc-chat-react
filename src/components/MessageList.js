import React, { Component } from 'react';

class Messagelist extends Component {
    constructor(props){
        super(props);
        this.state ={
            messages:[],
            newMessage: ''
        }
        this.messagesRef = this.props.firebase.database().ref('Messages');
    }
    componentDidMount(){
        this.messagesRef.on('child_added', snapshot => {
            const message = snapshot.val();
            message.key = snapshot.key;
            this.setState({messages: this.state.messages.concat(message) } )
        })
    }

    createMessage(e){
        e.preventDefault();
        if(document.getElementById("newMessage").value !== '' && this.props.activeRoom !== null){
        this.messagesRef.push({
            content: document.getElementById("newMessage").value,
            roomId: this.props.activeRoom.key,
            username: this.props.user ? this.props.user.displayName: 'guest' ,
            sentAt: new Date().toLocaleTimeString()
        })}else{
            alert('Type a message first')
        };
    }
    handleChange(e){
        this.setState({newMessage: e.target.value})
    }

    render(){
        
        return(
            <div className='right-column'>
            <h2>{this.props.activeRoom.name}</h2>
            <div className='messagelist'>{this.state.messages
                // eslint-disable-next-line
                    .filter(message => message.roomId == this.props.activeRoom.key)
                    .map(message=>
                        <div className='message' key={message.key}>    
                            <span className='left-message'>{message.username}</span>
                            <span className='right-message'>{message.sentAt}</span>
                            <span className='left-message'>{message.content}</span>
                        </div>
                    )
                }
            </div>
            <form onSubmit={(e)=>this.createMessage(e)}>
                <input type='text'placeholder='Type message here' id='newMessage' onChange={(e)=> this.handleChange(e)} value={this.state.newMessage} ></input>
                <input type='submit' value='Send'></input>
            </form>

            </div>
            
            
        
        )}
}

export default Messagelist;