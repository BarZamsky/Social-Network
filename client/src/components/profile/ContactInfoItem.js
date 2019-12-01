import React from "react"
import moment from "moment";

const item = (props) => (
    <div className="contact_info_group">
        <div className="contact_info_row">
            {props.icon}
            <div className="contact_info_label">{props.label}</div>
        </div>
        {props.input ?
            <input
                id={props.id}
                className="contact_info_input"
                defaultValue={props.defaultValue}
                placeholder={props.placeholder}
                onChange={props.onChange}/>
            : <div className="contact_info_data"> {props.data} </div>}
    </div>
);

export default item;
