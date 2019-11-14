import React, {Component} from 'react';
import {Route, Switch, withRouter, Redirect} from "react-router-dom"
import {Homepage} from "./components/layout/Homepage"

import './App.css';

class App extends Component {
  render() {
      return (
          <Switch>
              <Route path="/" exact component={Homepage}/>
          </Switch>
      )
  }

}

export default App;
