import React from "react";
import style from "./listOfProduct.module.css";
import {NavLink} from "react-router-dom";


const Item =(props)=>{
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
export default Item;