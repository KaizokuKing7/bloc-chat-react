import React, { Component } from 'react';

class MessageList extends Component {
    constructor(props){
        super(props);
        this.state ={
            messages:[]
        }
        this.messsagesRef = this.props.firebase.database().ref('Messages')
    }
    componentDidMount(){
        this.messsagesRef.on('child_added', snapshot => {
            const message = snapshot.val();
            message.key = snapshot.key;
            this.setState({messages: this.state.messages.concat( message) } )
        })
    }

    render(){
        
        return(
            <div>
                {this.state.messages
                    .filter(message => message.roomId === this.props.activeRoom)
                    .map(message=>
                        <div>    
                            <li>{message.content}</li>
                            <li>{message.username}</li>
                            <li>{message.sentAt}</li>
                            <li>{message.roomId}</li>
                        </div>
                    )
                }    
            </div>
            
            
        
        )}
}

export default MessageList;