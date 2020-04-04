import React from "react";
import style from "./SubsubCategories.module.css"
import Axios from "axios";
import {NavLink, useHistory} from 'react-router-dom';
import path from "../settings";

const Sub3Categories = (props) =>{
    const history=useHistory();
    let gotoList=()=>{
        Axios.get(path+'/product/?category='+props.slug).then(res=>{
            props.addListOfProduct(res.data);
            props.setCurrentCategoryToList(props.slug)
            console.log(res.data)
            // history.push('/products/?category='+props.slug)
        })

    }
    return(
        <NavLink to={"/products/"+props.slug}>
        <div>
            <span onClick={gotoList} className={style.subcategory}>{props.title}</span>
        </div>
        </NavLink>
    )
}
export default Sub3Categories;