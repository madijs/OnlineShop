import React from "react";
import style from './Specification.module.css'
const Specification=(props)=>{
    return(
        <div className={style.specificationContainer}>
            <div className={style.parametr}>
                <div className={style.parametr2}>
                {props.parametr}
                </div>
            </div>
        <div className={style.value}>
            <div className={style.value2}>
            {props.value}
            </div>
        </div>
        </div>
    )
}
export default Specification;