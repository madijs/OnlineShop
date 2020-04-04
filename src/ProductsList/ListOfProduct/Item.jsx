import React from "react";
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import style from "./listOfProduct.module.css";
import IconButton from "@material-ui/core/IconButton";
import basketIcon from "../../images/basket2.png";
import {NavLink} from "react-router-dom";


const Item =(props)=>{
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
export default Item;