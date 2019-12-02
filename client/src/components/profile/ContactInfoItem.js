import React from "react"
import Input from '@material-ui/core/Input';

const contactInfoItem = (props) => (
    <div className="contact_info_group">
        <div className="contact_info_row">
            {props.icon}
            <div className="contact_info_label">{props.label}</div>
        </div>
        {props.input ?
            <Input
                id={props.id}
                defaultValue={props.defaultValue}
                placeholder={props.placeholder}
                onChange={props.onChange}
                className="contact_info_input"
                inputProps={{ 'aria-label': 'description' }} />
            : <div className="contact_info_data"> {props.data} </div>}
    </div>
);

export default contactInfoItem;
