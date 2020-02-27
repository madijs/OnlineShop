import React from "react";
import gilette from '../images/Gillette.png'
import style from './PartnersList.module.css'
const PartnersList = ()=>{
    return(
        <div className={style.partner}>
            <div className={style.div1}><span className={style.text1}>Товары от Партнеров</span></div>
        <div className={style.partnersList}>
            <div><img className={style.gilette} src={gilette}/></div>
            <div><img className={style.gilette} src={gilette}/></div>
            <div><img className={style.gilette} src={gilette}/></div>
            <div><img className={style.gilette} src={gilette}/></div>
        </div>
        </div>
    )
}
export default PartnersList