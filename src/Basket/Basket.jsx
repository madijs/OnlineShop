import React, {useEffect, useState} from "react";
import Axios from 'axios'
import path from "../settings";
import {AddSummaActionCreator, AddToBasketActionCreator} from "../redux/basket-reducer";
import BasketItem from "./BasketItem";
import style from './BasketItem.module.css'
const Basket =(props)=>{
    const media="http://178.62.252.32";
    const[state,setState]=useState(false);
    useEffect(()=>{
        Axios.get(path+'/cart/',
            {headers:{
                    'Authorization':'Token ' + localStorage.getItem('token')
                }}).then(res=>{
            console.log(res.data);
            props.addToBasket(res.data);
            // props.dispatch(AddToBasketActionCreator(res.data)); //addToBasket

            let sum=0;
            for (let i=0;i<props.basketPage.basketData.length;i++){
                sum+=props.basketPage.basketData[i].product.box_quantity*props.basketPage.basketData[i].quantity*props.basketPage.basketData[i].product.price
            }
            console.log(props.basketPage.basketData);
            props.setItogovayaSumma(sum);
            // props.dispatch(AddSummaActionCreator(sum))
        });
    },[]);
    let basket_items = props.basketPage.basketData.map((el,index)=>(
        <BasketItem
            id={el.id}
            key={index}
            // dispatch={props.dispatch} //vmesto dispatch kidayu s containera
            addSumma={props.addSumma}
            removeSumma={props.removeSumma}
            title={el.product.title}
            price={el.product.price}
            images={media+el.product.images[0].image}
            category={el.product.category}
            box_quantity={el.product.box_quantity}
            quantity={el.quantity}
            cart={el.cart}
        />
    ));
    let style2={
        display:'none'
    }
    let style3={
        display: 'block'
    };
    let blur={
        filter: 'blur(8px)',
        opacity:'0.5',
        webkitFilter:'blur(8px)'
    }
    return(
        <div>
        {/*<div style={state? style3:style2}>*/}
        {/*    <Oplata/>*/}
        {/*</div>*/}
        <div style={state? blur:style3}>
            <div className={style.basket_list}>
            <div className={style.basketText}>Корзина</div>
            <div className={style.titles}>
                <div>Название</div>
                <div>Цена за коробку</div>
                <div>Кол-во коробок</div>
                <div>Сумма</div>
            </div>
        <div>
            {basket_items}
        </div>
            </div>
            <div className={style.dostavka}>
                <div className={style.endText1}>
                    Доставка:
                </div>
                <div className={style.dostavkaPrice}>
                    1 200тг
                </div>
            </div>
            <div className={style.itogo}>
                <div className={style.endText2}>Итого: </div>
                <div className={style.endPrice}>{props.basketPage.summa.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ")}</div>
            </div>
            <div className={style.btnList}>
                <div><button onClick={()=>setState(true)} className={style.oplataButton}>Оплатить</button></div>
                <div><button className={style.continueBtn}>Продолжить покупки</button></div>
            </div>
        </div>
        </div>
    )
};
export default Basket