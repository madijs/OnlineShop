import React from "react";
import right from '../images/right.png'
import style from './Categories.module.css'
import path from '../settings'
import Axios from "axios";
import {compareSlugActionCreator,
    setCurrentSubCategoryActionCreator,setSubCategoriesDataActionCreator} from "../redux/main-reducer";

const Categories =(props)=>{
    var style2={
        cursor:'pointer',
        paddingLeft:'30%',
        paddingTop:'20px',
        paddingBottom:'13px',
        fontSize:'18px',
        textAlign:'start',
        fontWeight:'bold',
        fontFamily:'Ubuntu',
        color:'#4F5D75'
    }
    var style3={
        width:'20px',
        height:'20px'
    }
    const getSlug=()=>{
        props.state.isExist=true;
        props.compareSlugFunction(props.slug);
        console.log(props.state);
        // props.dispatch(compareSlugActionCreator(props.slug)); //compareSlugFunction
        console.log(props.state.isExist);
        if(props.state.isExist) {
            Axios.get(path + '/category/' + props.slug).then(res => {
                console.log("REQUEST");
                props.setCurrentSubCategory(res.data);  //приходят из mapDispatchToProps
                props.setSubCategoriesData(res.data);
                // props.dispatch(setCurrentSubCategoryActionCreator(res.data));
                // props.dispatch(setSubCategoriesDataActionCreator(res.data))
            })
        }
    };

    return(
        <div onMouseEnter={getSlug} style={style2}>
        <div>
            <div>{props.title}</div>
        </div>
            <div className={style.strelka}><img style={style3} src={right}/></div>
        </div>
    )
}
export default Categories;