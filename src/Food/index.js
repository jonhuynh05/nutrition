import React, { Component } from 'react'
import {withRouter} from "react-router-dom"

class Food extends Component {
    async componentDidMount() {
        const item = await (await fetch(`/api/v1/search/${this.props.match.params.query}`)).json()
        console.log(this.props.match.params.query)
        console.log(item)
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