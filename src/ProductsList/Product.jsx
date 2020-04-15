import React from "react";
import style from './Product.module.css'
import IconButton from "@material-ui/core/IconButton";
import basketIcon from "../images/basket2.png";
import {withStyles} from "@material-ui/core";
import Badge from "@material-ui/core/Badge/Badge";
import {NavLink} from "react-router-dom";


const Product = (props)=>{
    var stil={
        textDecoration:'none'
    };
    return(
        <NavLink style={stil}  to={"/product/"+props.slug}>
        <div className={style.product}>
            <div className={style.wetka}><img className={style.wetka_img} src={props.images}/></div>
            <div className={style.title}>{props.category}</div>
            <div className={style.descriptionDiv}>{props.title}</div>
            <div className={style.price}>{props.price}тг/шт</div>
            <div className={style.posmotret}>Посмотреть</div>
        </div>
        </NavLink>
    )
}
export default Product