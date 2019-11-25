import React from "react"

const about = (props) => (
    <div className="profile_box_wrapper about">
        <div className="profile_info_right" onClick={() => props.showModal('about')}>
            <div className="profile_edit_img">
                <img className="edit_icon" src={require("../../assets/images/edit.jpg")} alt="edit"/>
            </div>
        </div>
        <div className="about_title">About</div>
        <div className="about_body">
            {props.profile && props.profile.about ? props.profile.about : "Here will be about"}
        </div>
    </div>
);

export default about;