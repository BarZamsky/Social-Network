import React, {Component} from "react"
import {connect} from "react-redux"
import {Redirect} from "react-router-dom"
import Navigation from "../UI/Navigation/Navigation"
import ProfileHeader from "./ProfileHeader"
import Modal from "../UI/Modal/Modal"
import Spinner from "../UI/Spinner/Spinner"
import ContactInfo from "./ContactInfo"
import About from "./About"
import EditIntro from "./EditIntro"

import "./Profile.scss"
import * as actions from "../../store/actions";

class Profile extends Component{

    state = {
        modalMode: null,
        showModal: false,
        editIntro: false,
        editContact: false,

        // social
        gitUrl: null,
        website: null,

        // intro
        title: null,
        country: null,
        city: null,
        companyName: null,
        userName: null,

        avatar: null
    };

    componentDidMount() {
        this.props.getProfile();
    }

    onChangeFileHandler = (e) => {this.setState({avatar: e.target.files[0]})};

    onSubmitAvatar = () => {
        const formData = new FormData();
        formData.append('myImage',this.state.avatar);
        const config = {
            headers: {
                'content-type': 'multipart/form-data'
            }
        };
    };

    onClickEditIntroHandler = () => {
        const body = {
            title: this.state.title || "",
            country: this.state.country || "",
            city: this.state.city || "",
            companyName: this.state.companyName || "",
            userName: this.state.userName || ""
        };

        this.props.editProfileIntro(body);
    };

    switchContactInfoMode = () => {
        this.setState(prevState => ({
            editContact: !prevState.editContact
        }))
    };

    onClickSaveInfoHandler = () => {};

    onChangeHandler = (e) => {this.setState({ [e.target.id]: e.target.value })};

    editAboutHandler = () => {

    };

    showModal = (mode) => {this.setState({showModal: true, modalMode: mode});};

    closeModal = () => {this.setState({showModal: false, modalMode: "", editContact: false})};

    render() {
        let body ;

        if (this.props.loading) {
            body = (
                <Spinner/>
            )
        } else {
            body = (
                <>
                <ProfileHeader
                    profile={this.props.profile}
                    user={this.props.user}
                    showModal={this.showModal}/>
                <About
                    profile={this.props.profile}
                    editAboutHandler={this.editAboutHandler}/>
                </>
            )
        }

        return (
            <>
            <Navigation />
            <div className="profile_wrapper">
                {body}
            </div>

            {this.state.showModal && this.state.modalMode === 'contact' ?
                <Modal show onCloseModal={this.closeModal} className="contactInfo">
                    <ContactInfo
                        profile={this.props.profile}
                        user={this.props.user}
                        onClickSaveInfoHandler={this.onClickSaveInfoHandler}
                        switchContactInfoMode={this.switchContactInfoMode}
                        onChangeHandler={this.onChangeHandler}
                        editMode={this.state.editContact}/>
                </Modal> : null}

                {this.state.showModal && this.state.modalMode === 'intro' ?
                    <Modal show onCloseModal={this.closeModal} className="editIntro">
                        <EditIntro
                            onClickEditIntroHandler={this.onClickEditIntroHandler}
                            profile={this.props.profile}
                            closeModal={this.closeModal}
                            onChangeHandler={this.onChangeHandler}/>
                    </Modal> : null}
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
        getProfile: () => dispatch(actions.getProfile()),
        editProfileIntro: (body) => dispatch(actions.editProfileIntro(body))
    }
};

export default connect(mapStateToProps,mapDispatchToProps)(Profile)