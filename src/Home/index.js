import React, { Component } from 'react'
import {withRouter, Link} from "react-router-dom"
import "./home.css"

class Home extends Component{

    render(){
        const dropdown =
            this.props.dropdown.map((query, i) => {
                return(
                    <div key={i} className="search-option">
                        <Link className="search-links" to={`/${query}`}>{query}</Link>
                    </div>
                )
            })
        return(
            <div>
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
                {/* {
                    this.state.foodImg === ""
                    ?
                    null
                    :
                    <img src={this.state.foodImg}/>
                } */}
            </div>
        )
    }
}

export default withRouter(Home)