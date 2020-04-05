import React from "react";
import style from './Product.module.css'
import IconButton from "@material-ui/core/IconButton";
import basketIcon from "../images/basket2.png";
import {withStyles} from "@material-ui/core";
import Badge from "@material-ui/core/Badge/Badge";
import {NavLink} from "react-router-dom";

const StyledBadge = withStyles(theme => ({
    badge: {
        width:'40px',
        height:'40px',
        borderRadius:'50%',
        right: 5,
        top: 19,
        border: `2px solid ${theme.palette.background.paper}`,
        padding: '0 4px',
    },
}))(Badge);

const Product = (props)=>{
    return(
        <NavLink to={"/product/"+props.slug}>
        <div className={style.product}>
            <div><img className={style.wetka} src={props.images}/></div>
            <div><span className={style.title}></span>{props.category}</div>
            <div className={style.descriptionDiv}><span className={style.description}>{props.title}</span></div>
            <div className={style.buy}>
            <div className={style.price}>{props.price}тг</div>
            </div>
        </div>
        </NavLink>
    )
}
export default Product