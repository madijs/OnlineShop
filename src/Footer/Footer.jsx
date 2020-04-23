import React from "react";
import style from './Footer.module.css'
import youtube from '../images/youtube.png'
import instagram from '../images/instagram.png'
import facebook from '../images/facebook.png'
const Footer =()=>{
    return(
        <div className={style.footer}>
           <div>Компания</div>
            <div>Контакты</div>
            <div>Социальные сети</div>
        </div>
    )
}
export default Footer;