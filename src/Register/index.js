import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'

class Register extends Component{
    state = {
        firstName: "",
        lasName: "",
        username: "",
        email: "",
        password: "",
    }
    render(){
        return(
            <div>
                <h1>Register</h1>
                <form>
                    <input placeholder="first name"></input>
                    <input placeholder="last name"></input>
                    <input placeholder="username"></input>
                    <input placeholder="email"></input>
                    <input placeholder="password"></input>
                    <button type="submit">Register</button>
                </form>
            </div>
        )
    }
}

export default withRouter(Register)