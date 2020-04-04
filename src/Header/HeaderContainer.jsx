import React from "react";
import {cartCounterActionCreator} from "../redux/users-reducer";
import {connect} from "react-redux";
import PrimarySearchAppBar from "./Header";
import {
    compareSlugActionCreator,
    setCategoriesDataActionCreator, setCurrentSubCategoryActionCreator,
    setProductsDataActionCreator, setSubCategoriesDataActionCreator,
    setTabsVisibleAC,
    setUsersDataActionCreator, setValueAC
} from "../redux/main-reducer";
import {setAllProductsDataActionCreator, setCurrentCategoryActionCreator} from "../redux/list-reducer";

let mapStateToProps=(state)=>{
    return{
        cnt:state.signUpPage.cnt,
        visible:state.mainPage.visible,
        mainPage:state.mainPage,
    }
}
let mapDispatchToProps=(dispatch)=>{
    return{
        setCartCount:(cnt)=>{
            dispatch(cartCounterActionCreator(cnt))
        },
        setVisible:(bool)=>{
            dispatch(setTabsVisibleAC(bool))
        },
        addListOfProduct:(data)=>{
            dispatch(setAllProductsDataActionCreator(data))
        },
        setCurrentCategoryToList:(data)=>{
            dispatch(setCurrentCategoryActionCreator(data))
        },
        setUserInfo:(data)=>{
            dispatch(setUsersDataActionCreator(data))
        },
        ///for 'Header2' component
        addProductsData:(data)=>{
            dispatch(setProductsDataActionCreator(data))
        },
        addCategoriesData:(data)=>{
            dispatch(setCategoriesDataActionCreator(data));
        },
        setCurrentSubCategoryData:(data)=>{
            dispatch(setCurrentSubCategoryActionCreator(data))
        },
        setSubCategoriesData:(data)=>{
            dispatch(setSubCategoriesDataActionCreator(data));  //это есть и на Categories component
        },
        ///for 'Categories' component
        compareSlugFunction:(slug)=>{
            dispatch(compareSlugActionCreator(slug));
        },
        setCurrentSubCategory:(data)=>{
            dispatch(setCurrentSubCategoryActionCreator(data));
        },
        setValue:(value)=>{
            dispatch(setValueAC(value))
        }
    }
}

const HeaderContainer =connect(mapStateToProps,mapDispatchToProps)(PrimarySearchAppBar);
export default HeaderContainer;