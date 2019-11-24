import React from "react"

const editIntro = (props) => {

    return (
      <div className="edit_intro_wrapper">
          <div className="edit_intro_header">
            <div className="edit_intro_head">Edit profile</div>
              <div className="edit_intro_header_left">
                  <div className="edit_intro_option" onClick={props.onClickEditIntroHandler}>Save</div>
                  <div className="edit_intro_option" onClick={props.closeModal}>Cancel</div>
              </div>
          </div>

          <div style={{'overflow':'scroll', 'overflowX':'hidden','marginTop':'13px'}}>
              <div className="edit_general">
                  <div className="edit_group_label">General information</div>
                  <div className="edit_intro_group">
                      <div className="edit_intro_label">User Name</div>
                      <input
                          className="edit_intro_item"
                          id="userName"
                          placeholder={props.userName ? props.userName : "User Name"}
                          autoComplete="off"
                          onChange={props.onChangeHandler}/>
                  </div>
              </div>

              <div className="edit_group_label">Current job information</div>
              <div className="edit_intro_group">
                  <div className="edit_intro_label">Title</div>
                  <input
                      className="edit_intro_item"
                      id="title"
                      placeholder={props.title ? props.title : "Job Title"}
                      autoComplete="off"
                      onChange={props.onChangeHandler}/>
              </div>
              <div className="edit_intro_group">
                  <div className="edit_intro_label">Company Name</div>
                  <input
                      className="edit_intro_item"
                      id="companyName"
                      placeholder={props.companyName ? props.companyName : "Company Name"}
                      autoComplete="off"
                      onChange={props.onChangeHandler}/>
              </div>
              <div className="edit_intro_group">
                  <div className="edit_intro_label">Country</div>
                  <input
                      className="edit_intro_item"
                      id="companyName"
                      placeholder={props.country ? props.country : "Country"}
                      autoComplete="off"
                      onChange={props.onChangeHandler}/>
              </div>
              <div className="edit_intro_group">
                  <div className="edit_intro_label">City</div>
                  <input
                      className="edit_intro_item"
                      id="city"
                      placeholder={props.city ? props.city : "City"}
                      autoComplete="off"
                      onChange={props.onChangeHandler}/>
              </div>
          </div>
      </div>
    )
};

export default editIntro;