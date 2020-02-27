import React from "react";
import style from './Footer.module.css'
import youtube from '../images/youtube.png'
import instagram from '../images/instagram.png'
import facebook from '../images/facebook.png'
const Footer =()=>{
    return(
        <div className={style.footer}>
            <div>
                <div className={style.title}>Компания</div>
                    <div className={style.contacts}>
                        <div>Контакты</div>
                        <div>Контакты</div>
                        <div>Контакты</div>
                 </div>
            </div>
            <div>
                <div className={style.title}>Каталог</div>
                <div className={style.contacts}>
                    <div>Контакты</div>
                    <div>Контакты</div>
                    <div>Контакты</div>
                </div>
            </div>
            <div>
                <div className={style.title}>Информация</div>
                <div className={style.contacts}>
                    <div>Контакты</div>
                    <div>Контакты</div>
                    <div>Контакты</div>
                </div>
            </div>

           <div className={style.contacts2}>
            <div className={style.contacts22}>
                <div className={style.telephone}>Телефон</div>
                <div className={style.text}>Контакты</div>
            </div>
            <div className={style.contacts22}>
                <div className={style.email}>Email</div>
                <div className={style.text}>Контакты</div>
            </div>
           </div>

            <div className={style.social}>
                <div><img className={style.socialImg} src={instagram}/></div>
                <div><img className={style.socialImg} src={facebook}/></div>
                <div><img className={style.socialImg} src={youtube}/></div>
            </div>

        </div>
    )
}
export default Footer;