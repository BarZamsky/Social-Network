import React from "react"
import { makeStyles } from '@material-ui/core/styles';
import Chip from '@material-ui/core/Chip';
import TagFacesIcon from '@material-ui/icons/TagFaces';



const skills = () => {

    const chipData = [
        { key: 0, label: 'Angular' },
        { key: 1, label: 'jQuery' },
        { key: 2, label: 'Polymer' },
        { key: 3, label: 'React' },
        { key: 4, label: 'Vue.js' }
    ];

    const handleDelete = chipToDelete => () => {
        // setChipData(chips => chips.filter(chip => chip.key !== chipToDelete.key));
    };

    return (
        <div className="profile_box_wrapper about">
            <div className="about_title">Skills</div>
            {chipData.map(data => {
                let icon;

                if (data.label === 'React') {
                    icon = <TagFacesIcon />;
                }

                return (
                    <Chip
                        key={data.key}
                        icon={icon}
                        label={data.label}
                        onDelete={data.label === 'React' ? undefined : handleDelete(data)}

                    />
                );
            })}
        </div>
    );
}

export default skills;
