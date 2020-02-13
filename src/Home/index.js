import React, { Component } from 'react'
import {withRouter, Link} from "react-router-dom"
import "./home.css"

class Home extends Component{

    state = {
        query: "",
        foodName: "",
        foodId: "",
        foodImg: "",
        dropdown: [],
        error: ""
    }

    getData = async () => {
        console.log("this hits")
        this.setState({
            error: "",
            foodImg: "",
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
                foodName: dataQuery.results.food_name,
                foodId: dataQuery.results.tag_id,
                foodImg: dataQuery.results.photo.thumb,
                dropdown: dataQuery.dropdown
            })
        }
    }

    handleChange = (e) => {
        this.setState({
            [e.currentTarget.name]: e.currentTarget.value
        })
        this.handleSearchResults()
    }

    handleSubmit = (e) => {
        e.preventDefault()
        this.getData()
    }

    handleSearchResults = async () => {
        const dataQuery = await(await fetch(`/api/v1/${this.state.query}`)).json()
        console.log(dataQuery, "data from back")
        if (dataQuery === "No results."){
            this.setState({
                error: dataQuery
            })
        }
        else if (this.state.query === ""){
            this.setState({
                foodName: "",
                foodId: "",
                foodImg: "",
                dropdown: []
            })
        }
        else{
            this.setState({
                foodName: dataQuery.results.food_name,
                foodId: dataQuery.results.tag_id,
                foodImg: dataQuery.results.photo.thumb,
                dropdown: dataQuery.dropdown
            })
        }
    }

    render(){
        const dropdown =
            this.state.dropdown.map((query, i) => {
                return(
                    <div key={i} className="search-option">
                        <Link to={`/${query}`}>{query}</Link>
                    </div>
                )
            })
        return(
            <div>
                <form onSubmit={this.handleSubmit}>
                    <input placeholder="Search Food" type="text" name="query" value={this.state.query} onChange={this.handleChange}/>
                    <button type="submit">Search</button>
                </form>
                <div>
                    {dropdown}
                </div>
                {
                    this.state.error === ""
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