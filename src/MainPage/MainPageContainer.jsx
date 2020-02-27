import React from "react";
import {connect} from "react-redux";
import MainPage from "./MainPage";
import {
    compareSlugActionCreator,
    setCategoriesDataActionCreator, setCurrentSubCategoryActionCreator,
    setProductsDataActionCreator, setSubCategoriesDataActionCreator,
    setUsersDataActionCreator
} from "../redux/main-reducer";

let mapStateToProps=(state)=>{
    return{
        mainPage:state.mainPage
    }
}
let mapDispatchToProps=(dispatch)=>{
    return{
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

    }
}

const MainPageContainer=connect(mapStateToProps,mapDispatchToProps)(MainPage);

export default MainPageContainer