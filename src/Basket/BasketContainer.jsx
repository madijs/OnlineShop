import React from "react";
import {connect} from "react-redux";
import {
    AddSummaActionCreator,
    AddToBasketActionCreator,
    ChangeQuantityActionCreator, RemoveItemFromBasketActionCreator,
    RemoveSummaActionCreator, SetRegionsActionCreator
} from "../redux/basket-reducer";
import Basket from "./Basket";
import {cartCounterActionCreator} from "../redux/users-reducer";


let mapStateToProps=(state)=>{
    return{
        basketPage:state.basketPage,
        cnt:state.signUpPage.cnt
    }
};
let mapDispatchToProps=(dispatch)=>{
    return{
        // removeFromBasket:(id)=>{
        //     dispatch(RemoveItemFromBasketActionCreator(id))
        // },
        setCartCount:(cnt)=>{
            dispatch(cartCounterActionCreator(cnt))
        },
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
        },
        changeQuantity:(id,quantity)=>{
            dispatch(ChangeQuantityActionCreator(id,quantity))
        },
        setRegions:(data)=>{
            dispatch(SetRegionsActionCreator(data))
        }
    }
}

const BasketContainer = connect(mapStateToProps,mapDispatchToProps)(Basket);

export default BasketContainer;