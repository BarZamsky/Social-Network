import React from "react"
import Spinner from "../UI/Spinner/Spinner"

const aboutEdit = (props) => {

    let body = (
        <>
        <div className="edit_about_head">Edit about</div>
         <textarea
             id="about"
             onChange={props.onChangeHandler}
             className="edit_about_textarea"
             placeholder={props.profile && props.profile.about ? props.profile.about : "Start typing..."}/>
        <button className="edit_about_btn" onClick={props.editAboutHandler}>Save</button>
        </>
    );

    if (props.loading) {
        body = <Spinner/>
    }

    if (props.done && !props.loading) {
        body = (
            <>
                <div className="edit_about_head success">Your profile was successfully edited</div>
                <img className="success_img" src={require("../../assets/images/success.svg")} alt="success"/>
            </>
        )
    }

    return (
        <div className="edit_about_wrapper">
            {body}
        </div>
    )
};

export default aboutEdit;