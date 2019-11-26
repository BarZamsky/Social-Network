import React, {Component} from "react"
import {connect} from "react-redux"
import {Redirect} from "react-router-dom"
import Navigation from "../UI/Navigation/Navigation"
import ProfileHeader from "./ProfileHeader"
import Modal from "../UI/Modal/Modal"
import Spinner from "../UI/Spinner/Spinner"
import ContactInfo from "./ContactInfo"
import About from "./About"
import EditAbout from "./EditAbout"
import EditIntro from "./EditIntro"
import axios from "axios"

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

        // about
        about: null,

        avatar: require("../../assets/images/default-avatar.png"),
        error: false,
        done: false
    };

    async componentDidMount() {
        await this.props.getProfile();
        this.setState({avatar: this.props.profile && this.props.profile.avatar.imageData ? process.env.REACT_APP_BACKEND_SERVER+this.props.profile.avatar.imageData : require("../../assets/images/default-avatar.png")})
    }

    uploadImage = async e => {
        const imageData = e.target.files[0];
        this.setState({avatar: URL.createObjectURL(imageData)});

        const formData = new FormData();
        formData.append('imageName',"upload-"+Date.now());
        formData.append('imageData', imageData);
        const response = await axios({
            method: 'POST',
            url: process.env.REACT_APP_BACKEND_SERVER+'/avatar',
            data: formData,
            headers: {
                withCredentials: true,
                'Content-Type': 'multipart/form-data',
                'x-auth': this.props.token
            }
        });

        if (response.data.status_code !== 0)
            this.setState({error: true});
        else
            this.props.getProfile();
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
        this.setState({done: true})
    };

    switchContactInfoMode = () => {
        this.setState(prevState => ({
            editContact: !prevState.editContact
        }))
    };

    onClickSaveInfoHandler = () => {
        const body = {
            github: this.state.gitUrl,
            website: this.state.website
        };

        this.props.editSocialSection(body);
        this.setState({done: true})
    };

    editAboutHandler = () => {
        const body = {
            about: this.state.about
        };

        this.props.editAboutSection(body);
        this.setState({done: true})
    };

    onChangeHandler = (e) => {this.setState({ [e.target.id]: e.target.value })};

    showModal = (mode) => {this.setState({showModal: true, modalMode: mode});};

    closeModal = () => {this.setState({showModal: false, modalMode: "", editContact: false, done: false})};

    render() {
        let body ;

        if (this.state.error || this.props.error) {
            body = (<div>Unexpected error.. try again</div>)
        } else if (this.props.loading) {
            body = (
                <Spinner/>
            )
        } else {
            body = (
                <>
                <ProfileHeader
                    profile={this.props.profile}
                    user={this.props.user}
                    showModal={this.showModal}
                    uploadImage={this.uploadImage}
                    avatar={this.state.avatar}/>
                <About
                    showModal={this.showModal}
                    profile={this.props.profile}/>
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

                {this.state.showModal && this.state.modalMode === 'about' ?
                    <Modal show onCloseModal={this.closeModal} className="editAbout">
                        <EditAbout
                            done={this.state.done}
                            loading={this.props.loading}
                            editAboutHandler={this.editAboutHandler}
                            profile={this.props.profile}
                            closeModal={this.closeModal}
                            onChangeHandler={this.onChangeHandler}/>
                    </Modal> : null }
            </>
        )
    }
}

const mapStateToProps = state => {
    return {
        token: state.auth.token,
        user: state.auth.user,
        loading: state.profile.loading,
        profile: state.profile.profile,
        error: state.profile.error
    }
};

const mapDispatchToProps = dispatch => {
    return {
        getProfile: () => dispatch(actions.getProfile()),
        editProfileIntro: (body) => dispatch(actions.editProfileIntro(body)),
        editAboutSection: (about) => dispatch(actions.editAboutSection(about)),
        editSocialSection: (body) => dispatch(actions.editSocialSection(body))
    }
};

export default connect(mapStateToProps,mapDispatchToProps)(Profile)