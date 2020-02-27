import React, {useEffect, useState} from "react";
import style from './Header2.module.css'
import category from "../images/Icon material-menu.png";
import famous from "../images/Icon material-present-to-all.png";
import star from "../images/Icon material-star.png";
import Axios from "axios"
import path from "../settings";
import {setCategoriesDataActionCreator,setCurrentSubCategoryActionCreator
    ,setProductsDataActionCreator,setSubCategoriesDataActionCreator} from "../redux/main-reducer";


const Header2 = (props)=>{
    const[state,setState]=useState(false);

    useEffect( ()=>{
        Axios(path+"/product/").then(res=>{
            console.log("gogogo");
            console.log(res.data);
            props.addProductsData(res.data)
            // props.dispatch(setProductsDataActionCreator(res.data))
        });
        if (props.categoriesData.length===0) {
             Axios.get(path + "/category/").then(
                res => {
                    props.addCategoriesData(res.data);
                    // props.dispatch(setCategoriesDataActionCreator(res.data));
                    console.log(res.data)
                }
            );

             Axios.get(path + "/category/" + "krasota-zdorove",{headers:{'Origin':'*'}}).then(res => {
                 console.log("subcategory");
                 console.log(res.data);
                 props.setSubCategoriesData(res.data);
                 props.setCurrentSubCategoryData(res.data);
                // props.dispatch(setSubCategoriesDataActionCreator(res.data));
                 // props.dispatch(setCurrentSubCategoryActionCreator(res.data))
            });
        }

    },[]);

    if (props.productsData.length===0){

    }
    var style2 = {
        display: 'none',
        color:'black',
        textAlign:'center',
    };
    var style3 = {
        display: 'block',
        color:'black',
        textAlign:'center'
    };



    const openCity =(num,bool)=> {
        if (state) {
            setState(false);
        }
        else {
            setState(true);

        }
    };

    return(
        <div>
            <div className={style.header2}>
                <div className={style.navbar}>
                    <div onClick={openCity} className={state ? `${style.active} ${style.podnav}` : `${style.podnav}`}>
                        <div><img className={style.png} src={category}/></div>
                        <div>Категории</div>
                    </div>

                    <div className={style.podnav}>
                        <div><img className={style.png} src={famous}/></div>
                        <div>Популярное</div>
                    </div>
                    <div className={style.podnav}>
                        <div><img className={style.png} src={star}/></div>
                        <div>Рекомендованное</div>
                    </div>
                </div>
            </div>

            <div style={state ? style3 : style2}>
                     <div className={style.categories}>
                         {props.categories_elements}
                     </div>
                <div className={style.elements}>
                    {props.subCategories_elements}
                </div>
                </div>
        </div>
    )
}
export default Header2;