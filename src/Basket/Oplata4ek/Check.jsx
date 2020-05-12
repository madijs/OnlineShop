import React from "react";
import style from './Oplata.module.css'
import CheckItems from "./CheckItems";
import media from "../../media";

const Check =(props)=>{
    let check_items = props.basketPage.basketData.map((el,index)=>(
        <CheckItems
            id={el.product.id}
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
    return(
        <div>
        <div>
            {check_items}
        </div>
            <div>
                Итого: {props.basketPage.summa}
            </div>
        </div>
    )
};
export default Check