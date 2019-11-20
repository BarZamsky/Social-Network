import React from "react"

const header = (props) => {

    const userName = props.user.fullName.split(" ");
    const name = userName[0].substring(0,1).toUpperCase() + userName[1].substring(0,1).toUpperCase();
    return (
        <div className="profile_header_wrapper">
            <img className="profile_image" src={require("../../assets/images/background.jpg")} alt="profile"/>
            <div className="profile_name_circle">
                <div className="circle_name">{name}</div>
            </div>
            <div className="profile_info">
                <div className="profile_info_right">
                    <div className="info_name edit">Edit profile</div>
                    <img className="edit_icon" src={require("../../assets/images/edit.png")} alt="edit"/>
                </div>
                <div className="profile_info_left">
                    <div className="info_name">{props.user.fullName}</div>
                    <div className="info_title">Here will be job title</div>
                </div>
            </div>
        </div>
    )
};

export default header;