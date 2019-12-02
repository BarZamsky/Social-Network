import React from "react"
import InfoOutlinedIcon from '@material-ui/icons/InfoOutlined';
import IntroItem from "./IntroItem";
import WorkOutlineOutlinedIcon from '@material-ui/icons/WorkOutlineOutlined';

const editIntro = (props) => {

    return (
      <>
          <div className="edit_intro_header">
            <div className="edit_intro_head">Edit profile</div>
              <div className="edit_intro_header_left">
                  <div className="edit_intro_option" onClick={props.onClickEditIntroHandler}>Save</div>
                  <div className="edit_intro_option" onClick={props.closeModal}>Cancel</div>
              </div>
          </div>

          <div className="edit_intro_body">
              <div className="contact_info_row">
                  <InfoOutlinedIcon/>
                  <div className="edit_group_label">General information</div>
              </div>
              <IntroItem
                  label="User Name"
                  id="userName"
                  placeholder={props.profile && props.profile.userName ? props.profile.userName : "User Name"}
                  autoComplete="off"
                  onChange={props.onChangeHandler}/>
              <IntroItem
                  label="Job Title"
                  id="title"
                  placeholder={props.profile && props.profile.title ? props.profile.title : "Job Title"}
                  autoComplete="off"
                  onChange={props.onChangeHandler}/>

              <div className="contact_info_row">
                  <WorkOutlineOutlinedIcon/>
                  <div className="edit_group_label">Current job information</div>
              </div>
              <IntroItem
                  label="Company Name"
                  id="companyName"
                  placeholder={props.profile && props.profile.companyName ? props.profile.companyName : "Company Name"}
                  autoComplete="off"
                  onChange={props.onChangeHandler}/>
              <IntroItem
                  label="Country"
                  id="country"
                  placeholder={props.profile && props.profile.country ? props.profile.country : "Country"}
                  autoComplete="off"
                  onChange={props.onChangeHandler}/>
              <IntroItem
                  label="City"
                  id="city"
                  placeholder={props.profile && props.profile.city ? props.profile.city : "City"}
                  autoComplete="off"
                  onChange={props.onChangeHandler}/>
          </div>
      </>
    )
};

export default editIntro;