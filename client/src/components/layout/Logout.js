import React, {Component} from "react"
import {Redirect} from "react-router-dom"
import {connect} from "react-redux"
import * as actions from "../../store/actions"

class Logout extends Component{

    componentDidMount() {
        this.props.onLogout();
        this.props.onLogoutProfile()
    }

    render() {
        return <Redirect to={"/login"}/>
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onLogout: () => dispatch(actions.logout()),
        onLogoutProfile: () => dispatch(actions.clearProfile())
    }
};

export default connect(null, mapDispatchToProps)(Logout)