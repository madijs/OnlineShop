import React from "react";
import {connect} from "react-redux";
import {AddSummaActionCreator, AddToBasketActionCreator, RemoveSummaActionCreator} from "../redux/basket-reducer";
import Basket from "./Basket";


let mapStateToProps=(state)=>{
    return{
        basketPage:state.basketPage
    }
};
let mapDispatchToProps=(dispatch)=>{
    return{
        addToBasket:(data)=>{
            dispatch(AddToBasketActionCreator(data));
        },
        setItogovayaSumma:(sum)=>{
            console.log(sum);
            dispatch(AddSummaActionCreator(sum))
        },
        addSumma:(sum)=>{
            dispatch(AddSummaActionCreator(sum));
        },
        removeSumma:(sum)=>{
            console.log(sum);
            dispatch(RemoveSummaActionCreator(sum));
        }
    }
}

const BasketContainer = connect(mapStateToProps,mapDispatchToProps)(Basket);

export default BasketContainer;