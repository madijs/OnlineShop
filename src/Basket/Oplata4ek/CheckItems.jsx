import React from "react";
import style from "./Oplata.module.css";

const CheckItems = (props)=>{
    return(
        <div className={style.containerCheck}>
            <div className={style.imgDiv}>
                <img className={style.checkImg} src={props.images}/>
            </div>
            <div>
                <div className={style.checkTitle}>
                    {props.title}
                </div>
                <div>
                   Цена:{props.price}
                </div>
                <div>
                   Количество: {props.quantity}
                </div>
            </div>
        </div>
    )
};
export default CheckItems