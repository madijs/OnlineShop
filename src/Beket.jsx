import React, {useEffect, useState} from "react";
import Axios from "axios";
import BeketItems from "./BeketItems";
import style from './Beket.module.css'

const Beket =()=>{
    const[state,setState]=useState([]);
    useEffect(()=>{
        let aState = state.data;
        Axios.get('http://192.168.0.20:5000/api/products/').then(res=>{
            setState(res.data)
        }).catch(err=>{
            console.log(err)
        })
        console.log(state)
    },[]);

    let elements = state.map(el=>(
        <BeketItems
            id={el.id}
            price={el.price}
            category_id={el.category_id}
            count={el.count}
            name={el.name}
            description={el.description}
        />
    ))


    return(
        <div className={style.container}>
            {elements}
        </div>
    )
}
export default Beket;