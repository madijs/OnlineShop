import React from "react";
import {connect} from "react-redux";
import ListOfProduct from "./listOfProduct";
import {
    setAllProductsDataActionCreator,
    setCurrentProductsActionCreator,
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
        }
    }
}

const ListOfProductContainer=connect(mapStateToProps,mapDispatchToProps)(ListOfProduct);
export default ListOfProductContainer;
