import React, { Component } from 'react'
import {Switch, Route, withRouter} from "react-router-dom"
import Home from "./Home"


class App extends Component {
  render(){
    return (
      <div>
        <Switch>
          <Route exact path="/" render={() =><Home/>}/>
        </Switch>
      </div>
    );
  }
}

export default withRouter(App);
