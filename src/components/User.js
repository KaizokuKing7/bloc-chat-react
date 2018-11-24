import React, { Component } from 'react';

class User extends Component {
    
    handleSignIn(){
        const provider = new this.props.firebase.auth.GoogleAuthProvider();
        this.props.firebase.auth().signInWithPopup( provider );
        console.log(this.props.user)
    }

    handleSignOut(){
        this.props.firebase.auth().signOut();
        console.log(this.props.user)
    }
    componentDidMount(){
        this.props.firebase.auth().onAuthStateChanged( user => {
            this.props.setUser(user);
            
        });
    }
    login(){
        if (this.props.user && this.props.user.isAnonymous === true){
            return('Hello Guest');
        }else if (this.props.user){
            return(`Hello ${this.props.user.displayName}`)
        }else{
            return('Please sign in')
        }
    }

   
    render(){
        return(
            <div className='sign-in'>
                {this.login()}
            <br></br>
            <button onClick={()=>this.handleSignIn()}>Sign-in</button>
            <button onClick={()=>this.handleSignOut()}>Sign-out</button>
            </div>
        )
    } 
}

export default User;