import React from "react"

const header = (props) => {

    const userName = props.user.fullName.split(" ");
    const name = userName[0].substring(0,1).toUpperCase() + userName[1].substring(0,1).toUpperCase();

    let headerBody;
    if (props.profile) {
        headerBody = (
            <div className="profile_info_left">
                <div className="info_name">{props.user.fullName}</div>
                <div className="info_data">{props.profile.title}</div>
                <div className="info_data">{props.profile.companyName} | {props.profile.city} | {props.profile.country}</div>
            </div>
        )
    } else {
        headerBody = (
            <div className="profile_info_left">
                <div className="info_name">{props.user.fullName}</div>
                <div className="info_data">Edit your profile intro to add more info</div>
            </div>
        )
    }
    return (
        <div className="profile_box_wrapper">
            <img className="profile_image" src={require("../../assets/images/background.jpg")} alt="profile"/>
            <input id="avatar" type="file" className="circle_avatar upload" alt=""/>
            <img
                className="circle_avatar"
                src={require("../../assets/images/default-avatar.png")}/>

            <div className="profile_info">
                <div className="profile_info_right">
                    <div className="profile_edit_img" onClick={() => props.showModal('intro')}>
                        <img className="edit_icon" src={require("../../assets/images/edit.jpg")} alt="edit"/>
                    </div>
                    <div className="contact_info" onClick={() => props.showModal('contact')}>Contact Info</div>
                </div>
                {headerBody}
            </div>
        </div>
    )
};

export default header;