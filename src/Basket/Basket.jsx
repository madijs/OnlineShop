import React, {useEffect, useState} from "react";
import { useHistory } from 'react-router-dom';
import Axios from 'axios'
import path from "../settings";
import BasketItem from "./BasketItem";
import style from './BasketItem.module.css'
import Oplata from "./Oplata4ek/Oplata";
import media from "../media";
const Basket =(props)=>{
    const[state,setState]=useState(false);
    const history = useHistory();
    useEffect(()=>{
        if(localStorage.getItem('token')){
        Axios.get(path+'/cart/',
            {headers:{
                    'Authorization':'Bearer ' + localStorage.getItem('token')
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
        }else {
            let path ='/login'
            history.push(path)
        }
    },[]);
    let basket_items = props.basketPage.basketData.map((el,index)=>(
        <BasketItem
            setCartCount={props.setCartCount}
            id={el.product.id}
            prosto_id={el.id}
            key={index}
            addSumma={props.addSumma}
            removeSumma={props.removeSumma}
            changeQuantity={props.changeQuantity}
            title={el.product.title}
            price={el.product.price}
            images={media+el.product.image}
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
    };

    let paymentOrder=()=>{
        if(localStorage.getItem('token')) {
            console.log(props.basketPage.quantity)
            Axios.post(path + '/cart/bulk/', props.basketPage.quantity, {
                headers: {
                    'Authorization': 'Bearer ' + localStorage.getItem('token'),
                    'Content-Type': 'application/json'
                }
            }).then(res => {
                console.log(res.data)
                Axios.get(path + '/city').then(res => {
                    console.log(res.data);
                    props.setRegions(res.data);
                })
                // window.location = res.data.payment_page_url
            });
            setState(true);
        }else {
            history.push('/login')
        }
    };

    return(
        <div>
        <div style={state? style3:style2}>
            <Oplata basketPage={props.basketPage}/>
        </div>
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
                <div><button onClick={paymentOrder} className={style.oplataButton}>Оплатить</button></div>
                <div><button onClick={()=>history.push('/')} className={style.continueBtn}>Продолжить покупки</button></div>
            </div>
        </div>
        </div>
    )
};
export default Basket