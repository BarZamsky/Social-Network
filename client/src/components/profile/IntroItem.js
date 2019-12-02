import React from "react"
import Input from '@material-ui/core/Input';

const styles = {
    resize:{
        fontSize:12
    }
};

const introItem = (props) => (
    <div className="intro_item">
        <Input
            id={props.id}
            label={props.label}
            defaultValue={props.defaultValue}
            placeholder={props.placeholder}
            onChange={props.onChange}
            className="edit_intro_item"
            inputProps={{ 'aria-label': 'description', style: {fontSize: 15} }}/>
    </div>
);

export default introItem;