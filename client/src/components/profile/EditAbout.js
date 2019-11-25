import React from "react"

const aboutEdit = (props) => {



    return (
        <div className="edit_about_wrapper">
            <div className="edit_about_head">Edit about</div>
            <textarea
                id="about"
                onChange={props.onChangeHandler}
                className="edit_about_textarea"
                placeholder={props.profile && props.profile.about ? props.profile.about : "Start typing..."}/>
            <button className="edit_about_btn" onClick={props.editAboutHandler}>Save</button>
        </div>
    )
};

export default aboutEdit;