import React from "react"
import moment from "moment";

import Item from "./ContactInfoItem"

import GitHubIcon from '@material-ui/icons/GitHub';
import WebIcon from '@material-ui/icons/Web';
import MailOutlineIcon from '@material-ui/icons/MailOutline';
import PhoneAndroidIcon from '@material-ui/icons/PhoneAndroid';
import CakeOutlinedIcon from '@material-ui/icons/CakeOutlined';
import CheckCircleOutlineIcon from '@material-ui/icons/CheckCircleOutline';

const info = (props) => {

    let contactInfo;

    if (props.done) {
        contactInfo = (
            <div className="success_body">
                <div className="edit_about_head success">Your profile was successfully edited</div>
                <CheckCircleOutlineIcon fontSize="large"/>
            </div>
        );
    } else if (props.editMode) {
        contactInfo = (
            <>
                <div className="contact_info_head">Edit your info</div>
                <Item
                    input
                    icon= {<GitHubIcon/>}
                    label="GitHub"
                    id="gitUrl"
                    defaultValue={props.profile && props.profile.social && props.profile.social.github ? props.profile.social.github :""}
                    placeholder={props.profile && props.profile.social && props.profile.social.github ? "" : "GitHub URL"}
                    onChange={props.onChangeHandler}
                />
                <Item
                    input
                    icon= {<WebIcon/>}
                    id="website"
                    label="Personal Website"
                    defaultValue={props.profile && props.profile.social && props.profile.social.website ? props.profile.social.website :""}
                    placeholder={props.profile && props.profile.social && props.profile.social.website ? "" : "Personal Website"}
                    onChange={props.onChangeHandler}
                />
                <Item
                    icon= {<CakeOutlinedIcon/>}
                    label="Birth Date"
                    data={moment(props.user.birthDate).format('DD/MM/YYYY')}
                />
                <Item
                    icon= {<PhoneAndroidIcon/>}
                    label="Phone Number"
                    data={props.user.phoneNumber}
                />
                <Item
                    icon= {<MailOutlineIcon/>}
                    label="Email"
                    data={props.user.email}
                />
                <div style={{'position':'absolute','bottom':'3%','right':'5%'}}>
                    <button className="contact_info_save_btn" onClick={props.onClickSaveInfoHandler}>Save changes</button>
                </div>
            </>
        )
    } else {
        contactInfo = (
            <>
                <div className="contact_info_edit_img" onClick={props.switchContactInfoMode}>
                    <img className="edit_icon" src={require("../../assets/images/edit.jpg")} alt="edit"/>
                </div>
                <Item
                    icon= {<GitHubIcon/>}
                    label="GitHub"
                    data={props.profile && props.profile.social && props.profile.social.github ? props.profile.social.github : "GitHub"}
                />
                <Item
                    icon= {<WebIcon/>}
                    label="Personal Website"
                    data={props.profile && props.profile.social && props.profile.social.website ? props.profile.social.website : "Personal Website"}
                />
                <Item
                    icon= {<CakeOutlinedIcon/>}
                    label="Birth Date"
                    data={moment(props.user.birthDate).format('DD/MM/YYYY')}
                />
                <Item
                    icon= {<PhoneAndroidIcon/>}
                    label="Phone Number"
                    data={props.user.phoneNumber}
                />
                <Item
                    icon= {<MailOutlineIcon/>}
                    label="Email"
                    data={props.user.email}
                />
            </>
        )
    }

    return (
        <>
            <div className="contact_info_header">
                <div className="contact_info_cancel" onClick={props.closeModal}>
                    <div className="cancel">{props.done ? "Close": "Cancel"}</div>
                </div>
                <div className="contact_info_head">Contact info</div>
            </div>
            <div className="contact_info_body">
                {contactInfo}
            </div>
        </>
    )
};

export default info;