import React from "react";
import Adversting from "../Advertising/Advertising";
import ProductsList from "../ProductsList/ProductsList";

const MainPage=(props)=>{
    // if (!localStorage.getItem('token')){
    //     Axios.get(path+'/auth/users/me',{
    //         headers:{
    //             'ion':'Token ' + localStorage.getItem('token')
    //         }}).then(res=>{
    //             console.log(localStorage.getItem('token'))
    //             console.log(res.data);
    //
    //             props.setUserInfo(res.data);
    //             // setUsersDataActionCreator(res.data);
    //             localStorage.setItem('first_name',res.data.first_name);
    //     })
    // }
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
            {/*<VerticalTabs*/}
            {/*    state={props.mainPage}*/}
            {/*    setValue={props.setValue}*/}
            {/*    //////////////////*/}
            {/*    categories_elements={categories_elements}*/}
            {/*    subCategories_elements={subCategories_elements}*/}
            {/*    //////////////////////////////////////////////*/}
            {/*    categoriesData={props.mainPage.categoriesData}*/}
            {/*    productsData={props.mainPage.productsData}*/}
            {/*    currentSubCategory={props.mainPage.currentSubCategory}*/}
            {/*    ////////////////setters//////////////////*/}
            {/*    addProductsData={props.addProductsData}*/}
            {/*    addCategoriesData={props.addCategoriesData}*/}
            {/*    setCurrentSubCategoryData={props.setCurrentSubCategoryData}*/}
            {/*    setSubCategoriesData={props.setSubCategoriesData}*/}
            {/*    //////////////////*/}
            {/*    compareSlugFunction={props.compareSlugFunction}*/}
            {/*    setCurrentSubCategory={props.setCurrentSubCategory}*/}
            {/*/>*/}
            </div>
            <Adversting/>
            <ProductsList productsData={props.mainPage.productsData}/>
            {/*<PartnersList/>*/}
            {/*<HouseProductsList/>*/}
        </div>
    )
}
export default MainPage;