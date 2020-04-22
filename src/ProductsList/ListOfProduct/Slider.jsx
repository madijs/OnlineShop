import React, {useEffect} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import style from './listOfProduct.module.css'
import Typography from '@material-ui/core/Typography';
import Slider from '@material-ui/core/Slider';

const useStyles = makeStyles({
    root: {
        width: 200,
        margin:'auto',
        display:'flex',
    },
});

function valuetext(value) {
    return `${value}°C`;
}

export default function RangeSlider(props) {
    const classes = useStyles();
    const [value, setValue] = React.useState([100, 500]);

    const handleChange = (event, newValue) => {
        setValue(newValue);
        props.setPriceFilter(newValue)
    };
    const handleChange2 = (event) => {
        if(event.target.value!="") {
            if (value[0] == '0') {
                value[0] = event.target.value.substring(1,2);
                let newValue = [];
                newValue[0] = value[0];
                props.setMinPrice(newValue[0])
            } else {
                value[0] = event.target.value;
                let newValue = [];
                newValue[0] = value[0];
                props.setMinPrice(newValue[0])
            }
        }else{
            value[0]=0;
            let newValue = [];
            newValue[0] = value[0];
            props.setMinPrice(event.target.value)
        }
    };
    const handleChange3 = (event) => {
        if(event.target.value!="") {
            if (value[1] == '0') {
                value[1] = event.target.value.substring(1,2);
                let newValue = [];
                newValue[1] = value[1];
                props.setMinPrice(newValue[1])
            } else {
                value[1] = event.target.value;
                let newValue = [];
                newValue[1] = value[1];
                props.setMinPrice(newValue[1])
            }
        }else{
            value[1]=0;
            let newValue = [];
            newValue[1] = value[1];
            props.setMinPrice(event.target.value)
        }
    };

    return (
        <div>
            <div style={{display:"flex",justifyContent:"space-evenly"}}>
            <div className={style.inputDiv}>
                <input className={style.inputFilter} type="number" value={value[0]} onChange={handleChange2}/>
            </div>
                <div><span>-</span></div>
            <div className={style.inputDiv}>
                <input className={style.inputFilter} type="number" value={value[1]} onChange={handleChange3}/>
            </div>
            </div>
        <div className={classes.root}>
            <div style={{marginRight:"5%"}}>{props.minPrice}</div>
            <Slider
                value={value}
                max={props.maxPrice}
                min={props.minPrice}
                onChange={handleChange}
                valueLabelDisplay="auto"
                aria-labelledby="range-slider"
                getAriaValueText={valuetext}
            />
            <div style={{marginLeft:"5%"}}>{props.maxPrice}</div>
        </div>
        </div>
    );
}