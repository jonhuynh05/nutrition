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
    handleChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }
    render(){
        return(
            <div>
                <h1>Register</h1>
                <form>
                    <input placeholder="first name" onChange={this.handleChange} name="firstName"></input>
                    <input placeholder="last name" onChange={this.handleChange} name="lastName"></input>
                    <input placeholder="username" onChange={this.handleChange} name="username"></input>
                    <input placeholder="email" onChange={this.handleChange} name="email"></input>
                    <input placeholder="password" onChange={this.handleChange} name="password"></input>
                    <button type="submit" onClick={this.props.handleRegister}>Register</button>
                </form>
            </div>
        )
    }
}

export default withRouter(Register)