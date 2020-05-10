import React, {useEffect} from "react";
import Adversting from "../Advertising/Advertising";
import ProductsList from "../ProductsList/ProductsList";
import { useHistory } from 'react-router-dom';


const MainPage=(props)=>{
    useEffect(()=>{
        localStorage.setItem('admin','0');

    },[])
    function a11yProps(index) {
        return {
            id: `vertical-tab-${index}`,
            'aria-controls': `vertical-tabpanel-${index}`,
        };
    }

    console.log(props.mainPage.currentSubCategory)

    return(
        <div>
            <div style={{display:props.mainPage.visible? "block":"none"}}>
            </div>
            <Adversting/>
            <ProductsList productsData={props.mainPage.productsData}/>
        </div>
    )
}
export default MainPage;