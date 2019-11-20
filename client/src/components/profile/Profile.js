import React, {Component} from "react"
import {connect} from "react-redux"
import Navigation from "../UI/Navigation/Navigation"
import ProfileHeader from "./ProfileHeader"

import "./Profile.scss"

class Profile extends Component{

    render() {
        return (
            <>
            <Navigation />
            <div className="profile_wrapper">
                <ProfileHeader user={this.props.user}/>
            </div>
            </>
        )
    }
}

const mapStateToProps = state => {
    return {
        user: state.auth.user
    }
};

export default connect(mapStateToProps)(Profile)