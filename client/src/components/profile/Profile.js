import React, {Component} from "react"
import Navigation from "../UI/Navigation/Navigation"
import ProfileHeader from "./ProfileHeader"

import classes from "./Profile.scss"

class Profile extends Component{

    render() {
        return (
            <>
            <Navigation />
            <div className="profile_wrapper">
                <ProfileHeader/>
            </div>
            </>
        )
    }
}

export default Profile