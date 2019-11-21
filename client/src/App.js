import React, {Component} from 'react';
import {connect} from "react-redux"
import {BrowserRouter, Route, Switch,Redirect} from "react-router-dom"
import Homepage from "./components/layout/Homepage"
import Login from "./components/layout/Login"
import Logout from "./components/layout/Logout"
import Register from "./components/layout/Register"
import Dashboard from "./components/dashboard/Dashboard"
import Profile from "./components/profile/Profile"

import * as actions from "./store/actions"

import './App.scss';

class App extends Component {

    componentDidMount() {
        this.props.onTryAutoSignup()
    }


  render() {

      let routes = (
          <Switch>
              <Route path="/" exact component={Homepage}/>
              <Route path="/login" component={Login}/>
              <Route path="/register" component={Register}/>
          </Switch>
      );
      if (this.props.isAuthenticated) {
        routes = (
            <Switch>
                <Route path="/" exact component={Homepage}/>
                <Route path="/login" component={Login}/>
                <Route path="/logout" component={Logout}/>
                <Route path="/dashboard" component={Dashboard}/>
                <Route path="/profile" component={Profile}/>
            </Switch>
        )
      }

      return (
          <BrowserRouter>
              {routes}
          </BrowserRouter>
      )
  }
}

const mapStateToProps = state => {
    return {
        isAuthenticated: state.auth.token !== null
    }
};

const mapDispatchToProps = dispatch => {
    return {
        onTryAutoSignup: () => dispatch(actions.authCheckState())
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
