import React, { Component } from 'react'
import {withRouter} from "react-router-dom"

class Home extends Component{
    async componentDidMount (){
        console.log("this is mounted")
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