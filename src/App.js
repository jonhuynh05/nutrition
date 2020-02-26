import React, { Component } from 'react'
import {Switch, Route, withRouter} from "react-router-dom"
import Home from "./Home"
import Food from "./Food"
import Login from "./Login"


class App extends Component {
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
    return (
      <div>
        <Switch>
          <Route exact path="/" render={() =><Home dropdown={this.state.dropdown} error={this.state.error} query={this.state.query} getData={this.getData} handleChange={this.handleChange} handleSubmit={this.handleSubmit} handleSearchResults={this.handleSearchResults}/>}/>
          <Route exact path="/search/:query" render={() =><Food/>}/>
          <Route exact path="/login" render={() => <Login/>}/>
        </Switch>
      </div>
    );
  }
}

export default withRouter(App);
