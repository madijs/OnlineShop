import React from "react";
import Sub3Categories from "./Sub3Categories";
import style from "./SubsubCategories.module.css"

const SubsubCategories = (props)=>{
    let child = props.child.map((el,index)=>(
        <Sub3Categories
            addListOfProduct={props.addListOfProduct}
            key={index}
            slug={el.slug}
            title={el.title}
            setCurrentCategoryToList={props.setCurrentCategoryToList}
        />
    ))
    return(
        <div className={style.gridChild}>
            <span className={style.title}>{props.title}</span>
            <div className={style.child}><span>{child}</span></div>
        </div>
    )
}
export default SubsubCategories;