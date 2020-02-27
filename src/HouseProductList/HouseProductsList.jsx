import React from "react";
import style from "./HouseProductsList.module.css";
import left from "../images/left.png";
import right from "../images/right.png";
import Product from "../ProductsList/Product";

const HouseProductsList = () =>{
    var style2={
        backgroundColor: '#00D1FF',
        color: '#00D1FF',
        height: '2px',
        width:'86%'
    };
    var style3={
        width: '20px',
        height: '25px'
    }

    return(
        <div>
            <div className={style.text1div}>
                <span className={style.text1}>Для Дома</span>
                <span className={style.text2}>Смотреть все</span>
                <div className={style.pagination}>
                    <div><img style={style3} src={left}/></div>
                    <div><img style={style3} src={right}/></div>
                </div>
            </div>
            <div>
                <hr style={style2}>
                </hr>
                <div className={style.productsList}>
                    <Product/>
                    <Product/>
                    <Product/>
                    <Product/>
                </div>
            </div>
        </div>
    )
}
export default HouseProductsList;