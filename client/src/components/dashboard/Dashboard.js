import React, {Component} from "react"
import {Redirect} from "react-router-dom"
import Navigation from "../UI/Navigation/Navigation"
import * as actions from "../../store/actions";
import {connect} from "react-redux";

class Dashboard extends Component{

    componentDidMount() {
        this.props.getProfile(this.props.user["_id"])
    }

    render() {
        let error = null;
        if (this.props.error)
            error = <Redirect to='/' />;

        return (
            <>
            {error}
            <Navigation />
                </>
        )
    }
}

const mapStateToProps = state => {
    return {
        user: state.auth.user,
        loading: state.profile.loading,
        profile: state.profile.profile,
        error: state.profile.error
    }
};

const mapDispatchToProps = dispatch => {
    return {
        getProfile: (userId) => dispatch(actions.getProfile(userId))
    }
};

export default connect(mapStateToProps,mapDispatchToProps)(Dashboard)
