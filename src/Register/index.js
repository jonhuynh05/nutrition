import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'

class Register extends Component{

    render(){
        return(
            <div>
                <h1>Register</h1>
                <form>
                    <input placeholder="first name" onChange={this.props.handleRegisterChange} name="firstName"></input>
                    <input placeholder="last name" onChange={this.props.handleRegisterChange} name="lastName"></input>
                    <input placeholder="username" onChange={this.props.handleRegisterChange} name="username"></input>
                    <input placeholder="email" onChange={this.props.handleRegisterChange} name="email"></input>
                    <input placeholder="password" onChange={this.props.handleRegisterChange} name="password"></input>
                    <button type="submit" onClick={this.props.handleRegister}>Register</button>
                </form>
                {
                    this.props.registerMessage === ""
                    ?
                    null
                    :
                    this.props.registerMessage
                }
            </div>
        )
    }
}

export default withRouter(Register)