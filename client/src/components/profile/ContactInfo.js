import React from "react"
import moment from "moment";

const info = (props) => {

    return (
        <div className="contact_info_wrapper">
            <div className="contact_info_header">
                <div className="contact_info_title">{props.user.fullName}</div>
                <div className="contact_info_edit_img">
                    <img className="edit_icon" src={require("../../assets/images/edit.jpg")} alt="edit"/>
                </div>
            </div>
            <div style={{'overflow': 'scroll', 'overflow-x': 'hidden', 'margin-top': '5px'}}>
                <div className="contact_info_group">
                    <div className="contact_info_label">GitHub</div>
                    <label>GitHub</label>
                </div>
                <div className="contact_info_group">
                    <div className="contact_info_label">Personal Website</div>
                    <label>Personal Website</label>
                </div>
                <div className="contact_info_group">
                    <div className="contact_info_label">Birth Date</div>
                    <label>
                        {moment(props.user.birthDate).format('DD/MM/YYYY')}
                    </label>
                </div>
                <div className="contact_info_group">
                    <div className="contact_info_label">Phone Number</div>
                    <label>{props.user.phoneNumber}</label>
                </div>
            </div>
        </div>
    )
};

export default info;