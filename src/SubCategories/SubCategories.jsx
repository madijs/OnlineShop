import React from "react";
import SubsubCategories from "./SubsubCategories";
import style from "./SubsubCategories.module.css"

const SubCategories =(props)=>{
    var style2 ={
        fontSize:'20px',
        fontFamily:'Ubuntu',
        fontWeight:'bold',
        color:'dimgrey',
        cursor:'pointer'
    };
    let child = props.child.map((el,index)=>(
        <SubsubCategories
            key={index}
            title={el.title}
            child={el.child}
        />
    ));
    return(
        <div className={style.grid}>
            {child}
        </div>
    )
}
export default SubCategories;