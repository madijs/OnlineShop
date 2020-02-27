import React, {useEffect, useState} from "react";
import style from './BasketItem.module.css'
import Badge from "@material-ui/core/Badge/Badge";
import {withStyles} from "@material-ui/core";
import {AddSummaActionCreator, RemoveSummaActionCreator} from "../redux/basket-reducer";

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

const BasketItem = (props)=>{
    const[quantity,setQuantity]=useState(props.quantity);
    const[price,setPrice]=useState(props.box_quantity*props.quantity*props.price);
    useEffect(()=>{
        setPrice(price);
    });
    let addQuantity=()=>{
        setQuantity(parseInt(quantity)+1);
        let sum=props.box_quantity*1*props.price;
        setPrice(price+sum);
        props.addSumma(sum)
        // props.dispatch(AddSummaActionCreator(sum));

    };
    let removeQuantity=()=>{
        if (quantity!=0 && quantity!='1'){
            setQuantity(parseInt(quantity)-1);
            let sum=props.box_quantity*1*props.price;
            setPrice(price-sum);
            props.removeSumma(sum)
            // props.dispatch(RemoveSummaActionCreator(sum));
        }
    }
    let changeValue=(e)=>{
        let n = e.target.value;
        setQuantity(n);
        let sum= props.box_quantity*e.target.value*props.price;
        setPrice(sum)
        if(e.target.value===''){
            setQuantity(1)
            let sum=props.box_quantity*1*props.price;
            setPrice(sum);
        }
    }

    return(
        <div className={style.container}>
            <div className={style.block}>
            <div className={style.imageDiv}><img className={style.image} src={props.images}/></div>
            <div>{props.category}</div>
            <div>{props.title}</div>
            </div>
            <div className={style.price}>
                <div>{props.price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ")}</div>
            </div>
            <div className={style.box_quantity}>
                <button onClick={removeQuantity}>-</button><div>{quantity}</div><button onClick={addQuantity}>+</button>
            </div>
            <div className={style.summa}>
                <div>{price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ")} тг</div>
            </div>
        </div>
    )
}
export default BasketItem;