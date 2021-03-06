import React from "react";
import {connect} from "react-redux";
import MainPage from "./MainPage";
import {
    compareSlugActionCreator,
    setCategoriesDataActionCreator, setCurrentSubCategoryActionCreator,
    setProductsDataActionCreator, setSubCategoriesDataActionCreator,
    setUsersDataActionCreator, setValueAC
} from "../redux/main-reducer";
import {setAllProductsDataActionCreator, setCurrentCategoryActionCreator} from "../redux/list-reducer";

let mapStateToProps=(state)=>{
    return{
        mainPage:state.mainPage,
    }
}
let mapDispatchToProps=(dispatch)=>{
    return{
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

const MainPageContainer=connect(mapStateToProps,mapDispatchToProps)(MainPage);

export default MainPageContainer