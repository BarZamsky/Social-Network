import React, {Component} from "react"
import {connect} from "react-redux"
import Navigation from "../UI/Navigation/Navigation"
import ProfileHeader from "./ProfileHeader"
import Modal from "../UI/Modal/Modal"
import ContactInfo from "./ContactInfo"
import About from "./About"

import "./Profile.scss"

class Profile extends Component{

    state = {
        showModal: false
    };

    onClickEditHandler = () => {

    };

    onClickContactInfo = () => {this.setState({showModal: true})};

    onCloseModal = () => {this.setState({showModal: false})};

    onClickSave = () => {};

    editAboutHandler = () => {

    };

    render() {
        return (
            <>
            <Navigation />
            <div className="profile_wrapper">
                <ProfileHeader
                    user={this.props.user}
                    onClickEditHandler={this.onClickEditHandler}
                    onClickContactInfo = {this.onClickContactInfo}/>
                <About
                    editAboutHandler={this.editAboutHandler}/>
            </div>

            {this.state.showModal ?
                <Modal show onCloseModal={this.onCloseModal}>
                    <ContactInfo
                        user={this.props.user}
                        onClickSave={this.onClickSave}/>
                </Modal> : null}
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