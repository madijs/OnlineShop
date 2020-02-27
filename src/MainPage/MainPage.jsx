import React from "react";
import Header2 from "../Header/Header2";
import Adversting from "../Advertising/Advertising";
import ProductsList from "../ProductsList/ProductsList";
import PartnersList from "../PartnersProduct/PartnersList";
import HouseProductsList from "../HouseProductList/HouseProductsList";
import Categories from "../Categories/Categories";
import SubCategories from "../SubCategories/SubCategories";
import Axios from "axios";
import path from '../settings'
import {setUsersDataActionCreator} from "../redux/main-reducer";

const MainPage=(props)=>{

    if (!localStorage.getItem('token')){
        Axios.get(path+'/auth/users/me',{
            headers:{
                'Authorization':'Token ' + localStorage.getItem('token')
            }}).then(res=>{
                console.log(localStorage.getItem('token'))
                console.log(res.data);

                props.setUserInfo(res.data);
                // setUsersDataActionCreator(res.data);
                localStorage.setItem('first_name',res.data.first_name);
        })
    }
    console.log(props.mainPage.currentSubCategory)
    let categories_elements= props.mainPage.categoriesData.map((el,index)=>(
        <Categories
            key={index}
            state={props.mainPage}
            title={el.title}
            slug={el.slug}
            // dispatch={props.dispatch}
            compareSlugFunction={props.compareSlugFunction}
            setCurrentSubCategory={props.setCurrentSubCategory}
            setSubCategoriesData={props.setSubCategoriesData}
        />
    ));

    let subCategories_elements = props.mainPage.currentSubCategory.map((el,index)=>(
        <SubCategories
            key={index}
            title={el.title}
            slug={el.slug}
            child={el.child}
        />
    ))
    return(
        <div>
            <Header2
                categories_elements = {categories_elements}
                subCategories_elements={subCategories_elements}
                //////////////////////////////////////////////
                categoriesData={props.mainPage.categoriesData}
                productsData={props.mainPage.productsData}
                currentSubCategory = {props.mainPage.currentSubCategory}
                ////////////////setters//////////////////
                addProductsData={props.addProductsData}
                addCategoriesData={props.addCategoriesData}
                setCurrentSubCategoryData={props.setCurrentSubCategoryData}
                setSubCategoriesData={props.setSubCategoriesData}
            />
            <Adversting/>
            <ProductsList productsData={props.mainPage.productsData}/>
            <PartnersList/>
            <HouseProductsList/>
        </div>
    )
}
export default MainPage;