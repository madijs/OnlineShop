import React from "react";
import {connect} from "react-redux";
import ProductDetails from "./ProductDetails/ProductDetails";
import {setProductCategoryActionCreator, setProductDetailsActionCreator} from "../redux/productDetails-reducer";

let mapStateToProps = (state) =>{
    return{
        productDetailsPage:state.productDetailsPage
    }
};

let mapDispatchToProps=(dispatch)=>{
    return{
        setProductDetails:(data)=>{
            dispatch(setProductDetailsActionCreator(data));
        },
        setProductCategory:(data)=>{
            dispatch(setProductCategoryActionCreator(data))
        }
    }
};

const ProductsContainer = connect(mapStateToProps,mapDispatchToProps)(ProductDetails);

export default ProductsContainer;