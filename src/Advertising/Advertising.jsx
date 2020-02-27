import React from "react";
import style from "./Advertising.module.css"
import im1 from "../images/im1.png"
import wetki from "../images/wetki.png"
import britva from "../images/britva.png"

const Adversting = ()=>{
    return(
        <div className={style.gridContainer}>
            <div className={style.gridItem1}>
                <div className={style.adv1}>
                    <span className={style.aaa}>Большой Выбор</span><br/>
                    <span className={style.aaa}>Товаров Для Дома</span>
                    <hr className={style.line}></hr>
                    <img className={style.im1} src={im1}/>
                </div>
            </div>
            <div className={style.gridContainer2}>
                <div className={style.gridItem2}>
                    <div className={style.adv2}>
                        <div>
                            <img className={style.wetka1} src={wetki}/>
                            <img className={style.wetka2} src={wetki}/>
                        </div>

                        <span className={style.adv2_text1}>НОВОЕ</span><br/>
                        <span className={style.adv2_text2}>Зубные Щетки для Всех</span>
                    </div>
                </div>
                <div className={style.gridItem3}>
                    <div className={style.adv3}>
                        <div><img className={style.britva} src={britva}/></div>
                        <span className={style.adv3_text1}>Скидки</span><br/>
                        <span className={style.adv3_text2}>- 20% на все товары</span><br/>
                        <span className={style.adv3_text3}>от бритв до ручек</span>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default Adversting;