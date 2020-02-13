import React, { Component } from 'react'
import {withRouter} from "react-router-dom"

class Food extends Component {
    render(){
        return(
            <div>
                this is the query page
            </div>
        )
    }
}

export default withRouter(Food)