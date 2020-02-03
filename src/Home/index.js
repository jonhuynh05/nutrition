import React, { Component } from 'react'
import {withRouter} from "react-router-dom"

class Home extends Component{

    state = {
        query: "",
        foodName: "",
        foodId: "",
        foodImg: "",
        error: ""
    }

    getData = async () => {
        console.log("this hits")
        this.setState({
            error: "",
            foodImg: ""
        })
        const dataQuery = await(await fetch(`/api/v1/${this.state.query}`)).json()
        console.log(dataQuery, "data from back")
        if (dataQuery === "No results."){
            this.setState({
                error: dataQuery
            })
        }
        else{
            this.setState({
                foodName: dataQuery.food_name,
                foodId: dataQuery.tag_id,
                foodImg: dataQuery.photo.thumb
            })
        }
    }

    handleChange = (e) => {
        this.setState({
            [e.currentTarget.name]: e.currentTarget.value
        })
    }

    handleSubmit = (e) => {
        e.preventDefault()
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
                {
                    this.state.error === ""
                    ?
                    null
                    :
                    <div id="search-error">
                        No results. Please try again.
                    </div>
                }
                {
                    this.state.foodImg === ""
                    ?
                    null
                    :
                    <img src={this.state.foodImg}/>
                }
            </div>
        )
    }
}

export default withRouter(Home)