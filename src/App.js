import React from 'react';
import {Switch, Route, withRouter} from "react-router-dom"
import Home from "./Home"


function App() {
  return (
    <div>
      <Switch>
        <Route exact path="/" render={() =><Home/>}/>
      </Switch>
    </div>
  );
}

export default withRouter(App);
