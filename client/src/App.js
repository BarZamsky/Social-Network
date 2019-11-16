import React, {Component} from 'react';
import {Router, Route, Switch} from "react-router-dom"
import Homepage from "./components/layout/Homepage"
import history from "./history"
import './App.css';

class App extends Component {
  render() {
      return (
          <Router basename="/" history={history}>
              <Switch>
                  <Route path="/" exact component={Homepage}/>
              </Switch>
          </Router>
      )
  }

}

export default App;
