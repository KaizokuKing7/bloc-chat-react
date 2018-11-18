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
    have(){
        if (this.props.user == null){
            return("Need to Sign in")
        }else if (this.props.user.isAnonymous === false){
            return(this.props.user.displayName)
        }else{
            return('Guest')
        }
    }

   
    render(){
        return(
            <div>
                {this.have()}
            <button onClick={()=>this.handleSignIn()}>Sign-in</button>
            <button onClick={()=>this.handleSignOut()}>Sign-out</button>
            </div>
        )
    } 
}

export default User;