import React, { Component } from 'react'
import {Switch, Route, withRouter} from "react-router-dom"
import Home from "./Home"
import Food from "./Food"
import Profile from "./Profile"
import Register from "./Register"


class App extends Component {
    state = {
      query: "",
      foodName: "",
      foodId: "",
      foodImg: "",
      dropdown: [],
      error: "",
      isLoggedIn: false,
      firstName: "",
      lastName: "",
      username: "",
      email: "",
      password: "",
      registerMessage: "",
      loginMessage: ""
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

  handleLogin = async (e) => {
    try{
      e.preventDefault()
      console.log("abc")
      await fetch (`/user/login`, {
        method: "POST",
        credentials: "include",
        body: JSON.stringify(this.state),
        headers: {
          "Content-Type": "application/json"
        }
      })
        .then(async res => {
          const response = await res.json()
          if(response.firstName){
            this.setState({
              firstName: response.firstName,
              username: response.username,
              isLoggedIn: true
            })
          }
          else{
            this.setState({
              loginMessage: response.message
            })
          }
          console.log(response)
        })
    }
    catch(err){
      console.log(err)
    }
  }

  handleRegisterChange = (e) => {
    this.setState({
      [e.currentTarget.name]: e.currentTarget.value
    })
  }

  handleRegister = async (e) => {
    try{
      e.preventDefault()
      await fetch(`/user/register`, {
        method: "POST",
        credentials: "include",
        body: JSON.stringify(this.state),
        headers: {
          "Content-Type": "application/json"
        }
      })
        .then(async res => {
          const response = await res.json()
          console.log(response)
          if(response.message === "Email already exists."){
            this.setState({
              registerMessage: response.message
            })
          }
          else if(response.message === "Username already exists."){
            this.setState({
              registerMessage: response.message
            })
          }
          else{
            this.setState({
              registerMessage: "",
              password: "",
              email: ""
            })
          }
        })
    }
    catch(err){
      console.log(err)
    }
  }

  render(){
    return (
      <div>
        <Switch>
          <Route exact path="/" render={() =><Home dropdown={this.state.dropdown} error={this.state.error} query={this.state.query} getData={this.getData} handleChange={this.handleChange} handleSubmit={this.handleSubmit} handleSearchResults={this.handleSearchResults} isLoggedIn={this.state.isLoggedIn} handleLogin={this.handleLogin} handleLoginChange={this.handleRegisterChange} email={this.state.email} password={this.state.password} loginMessage={this.state.loginMessage}/>}/>
          <Route exact path="/search/:query" render={() =><Food isLoggedIn={this.state.isLoggedIn}/>}/>
          <Route exact path="/profile" render={() => <Profile isLoggedIn={this.state.isLoggedIn}/>}/>
          <Route exact path="/register" render={() => <Register handleRegister={this.handleRegister} handleRegisterChange={this.handleRegisterChange} firstName={this.state.firstName} lastName={this.state.lastName} username={this.state.username} email={this.state.email} password={this.state.password} registerMessage={this.state.registerMessage}/>}/>
        </Switch>
      </div>
    );
  }
}

export default withRouter(App);
