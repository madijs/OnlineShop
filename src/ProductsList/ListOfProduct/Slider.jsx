import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Slider from '@material-ui/core/Slider';

const useStyles = makeStyles({
    root: {
        width: 200,
        margin:'auto',
    },
});

function valuetext(value) {
    return `${value}°C`;
}

export default function RangeSlider(props) {
    const classes = useStyles();
    const [value, setValue] = React.useState([500, 1000]);

    const handleChange = (event, newValue) => {
        setValue(newValue);
        props.setPriceFilter(newValue)
    };

    return (
        <div className={classes.root}>
            <Slider
                value={value}
                max={props.maxPrice}
                min={props.minPrice}
                onChange={handleChange}
                valueLabelDisplay="auto"
                aria-labelledby="range-slider"
                getAriaValueText={valuetext}
            />
        </div>
    );
}