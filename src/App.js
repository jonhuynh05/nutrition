import React, { Component } from 'react'
import {Switch, Route, withRouter} from "react-router-dom"
import Home from "./Home"
import Food from "./Food"


class App extends Component {
  render(){
    return (
      <div>
        <Switch>
          <Route exact path="/" render={() =><Home/>}/>
          <Route exact path="/:query" render={() =><Food/>}/>
        </Switch>
      </div>
    );
  }
}

export default withRouter(App);
