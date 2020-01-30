import React, { Component } from 'react'
import {withRouter} from "react-router-dom"

class Home extends Component{

    state = {
        query: ""
    }

    getData = async (e) => {
        const dataQuery = await(await fetch(`/api/v1/${this.state.query}`)).json()
        console.log(dataQuery, "data from back")
    }

    handleChange = (e) => {
        this.setState({
            [e.currentTarget.name]: e.currentTarget.value
        })
    }

    handleSubmit = () => {
        this.getData()
    }

    render(){
        return(
            <div>
                this is the home
                <form onSubmit={this.handleSubmit}>
                    <input placeholder="Search Food" type="text" name="query" value={this.state.query} onChange={this.handleChange}/>
                    <button type="submit">Search</button>
                </form>
            </div>
        )
    }
}

export default withRouter(Home)