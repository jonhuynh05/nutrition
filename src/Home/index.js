import React, { Component } from 'react'
import {withRouter, Link} from "react-router-dom"
import "./home.css"

class Home extends Component{
    
    render(){
        const dropdown =
            this.props.dropdown.map((query, i) => {
                return(
                    <div key={i} className="search-option">
                        <Link className="search-links" to={`/search/${query}`}>{query}</Link>
                    </div>
                )
            })
        return(
            <div>
                {
                    this.props.isLoggedIn
                    ?
                    null
                    :
                    <Link to="/register">Register</Link>
                }
                <h1>Login</h1>
                <form>
                    <input placeholder="username" onChange={this.props.handleLoginChange} name="username"></input>
                    <input placeholder="password" onChange={this.props.handleLoginChange} name="password"></input>
                    <button type="submit" onClick={this.props.handleLogin}>Login</button>
                </form>
                <br/>
                <form onSubmit={this.props.handleSubmit}>
                    <input placeholder="Search Food" type="text" name="query" value={this.props.query} onChange={this.props.handleChange}/>
                    <button type="submit">Search</button>
                </form>
                <div>
                    {dropdown}
                </div>
                {
                    this.props.error === ""
                    ?
                    null
                    :
                    <div id="search-error">
                        No results. Please try again.
                    </div>
                }
            </div>
        )
    }
}

export default withRouter(Home)