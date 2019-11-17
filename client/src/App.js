import React, {Component} from 'react';
import {connect} from "react-redux"
import {BrowserRouter, Route, Switch,Redirect} from "react-router-dom"
import Homepage from "./components/layout/Homepage"
import Login from "./components/layout/Login"
import Logout from "./components/layout/Logout"
import Register from "./components/layout/Register"

import * as actions from "./store/actions"

import './App.scss';

class App extends Component {

    componentDidMount() {
        this.props.onTryAutoSignup()
    }


  render() {

      let routes = (
          <Switch>
              <Route path="/login" component={Login}/>
              <Route path="/register" component={Register}/>
              <Redirect to='/login'/>
          </Switch>
      )
      if (this.props.isAuthenticated) {
        routes = (
            <Switch>
                <Route path="/" exact component={Homepage}/>
                <Route path="/login" component={Login}/>
                <Route path="/logout" component={Logout}/>
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
