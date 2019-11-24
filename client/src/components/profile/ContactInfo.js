import React from "react"
import moment from "moment";

const info = (props) => {

    let contactInfo;

    if (props.editMode) {
        contactInfo = (
            <div>
                <div className="contact_info_cancel" onClick={props.switchContactInfoMode}>
                    <div className="cancel">Cancel</div>
                </div>
                <div className="contact_info_head">Edit your info</div>
                <div className="contact_info_group">
                    <div className="contact_info_label">GitHub</div>
                    <input id="gitUrl" className="contact_info_input" placeholder="GitHub URL" onChange={props.onChangeHandler}/>
                </div>
                <div className="contact_info_group">
                    <div className="contact_info_label">Personal Website</div>
                    <input id="website" className="contact_info_input" placeholder="Personal Website" onChange={props.onChangeHandler}/>
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
                <div className="contact_info_group">
                    <div className="contact_info_label">Email</div>
                    <label>{props.user.email}</label>
                </div>
                <div style={{'position':'absolute','bottom':'3%','right':'3%'}}>
                    <button className="contact_info_save_btn" onClick={props.onClickSaveInfoHandler}>Save changes</button>
                </div>
            </div>
        )
    } else {
        contactInfo = (
            <div style={{'overflow': 'scroll', 'overflowX': 'hidden', 'marginTop': '5px'}}>
                <div className="contact_info_edit_img" onClick={props.switchContactInfoMode}>
                    <img className="edit_icon" src={require("../../assets/images/edit.jpg")} alt="edit"/>
                </div>
                <div className="contact_info_head">Contact info</div>
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
                <div className="contact_info_group">
                    <div className="contact_info_label">Email</div>
                    <label>{props.user.email}</label>
                </div>
            </div>
        )
    }

    return (
        <div className="contact_info_wrapper">
            <div className="contact_info_header">
                <div className="contact_info_title">{props.user.fullName}</div>
            </div>
            {contactInfo}
        </div>
    )
};

export default info;