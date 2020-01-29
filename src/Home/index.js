import React, { Component } from 'react'
import {withRouter} from "react-router-dom"

class Home extends Component{

    state = {
        query: ""
    }

    async componentDidMount (){
        console.log("this is mounted")
        const backend = await(await fetch("/api/v1/")).json()
        console.log(backend, "got it from the back")
    }

    handleChange = (e) => {
        this.setState({
            [e.currentTarget.name]: e.currentTarget.value
        })
    }


    render(){
        return(
            <div>
                this is the home
                <form>
                    <input placeholder="Search Food" type="text" name="query" value={this.state.query} onChange={this.handleChange}/>
                    <button type="submit">Search</button>
                </form>
            </div>
        )
    }
}

export default withRouter(Home)