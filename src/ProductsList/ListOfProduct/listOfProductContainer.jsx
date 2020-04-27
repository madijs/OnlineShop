import React from "react";
import {connect} from "react-redux";
import ListOfProduct from "./listOfProduct";
import {
    setAllProductsDataActionCreator, setCurrentPageAC,
    setCurrentProductsActionCreator, setMaxPriceAC, setMinPriceAC,
    setPriceFilterActionCreator
} from "../../redux/list-reducer";

let mapStateToProps =(state)=> {
    return{
        listProductsPage:state.listProductsPage
    }
}

let mapDispatchToProps=(dispatch)=>{
    return{
        addListOfProduct:(data)=>{
            console.log(data)
            dispatch(setAllProductsDataActionCreator(data))
        },
        setPriceFilter:(data)=>{
            dispatch(setPriceFilterActionCreator(data))
        },
        setCurrentProducts:(data)=>{
            dispatch(setCurrentProductsActionCreator(data))
        },
        setMinPrice:(price)=>{
            dispatch(setMinPriceAC(price))
        },
        setMaxPrice:(price)=>{
            dispatch(setMaxPriceAC(price))
        },
        setCurrentPage:(data)=>{
            dispatch(setCurrentPageAC(data))
        }
    }
}

const ListOfProductContainer=connect(mapStateToProps,mapDispatchToProps)(ListOfProduct);
export default ListOfProductContainer;
