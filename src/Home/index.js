import React, { Component } from 'react'
import {withRouter} from "react-router-dom"

class Home extends Component{
    async componentDidMount (){
        console.log("this is mounted")
        const backend = await fetch("/api/v1/")
        console.log(backend, "got it from the back")
    }
    render(){
        return(
            <div>
                this is the home
            </div>
        )
    }
}

export default withRouter(Home)