import React, { Component } from 'react'
import {withRouter} from "react-router-dom"

class Food extends Component {
    async componentDidMount() {
        console.log(this.props.match.params.query)
    }

    render(){
        return(
            <div>
                this is the query page
                {this.props.match.params.query}
            </div>
        )
    }
}

export default withRouter(Food)