// import mainReducer from "./main-reducer";
//
// let store={
//     state:{
//         mainPage:{
//             categoriesData:[],
//             subCategoriesData:[],
//             currentSubCategory:[],
//             productsData:[],
//             isCategoryActive:[],
//             isExist:true
//         }
//     },
//     getState(){
//         return this.state;
//     },
//     _callSubscriber(){
//         console.log('was changed')
//     },
//     subscribe(observer){
//         this._callSubscriber = observer;
//     },
//     dispatch(action){
//         this.state.mainPage = mainReducer(this.state.mainPage,action);
//         // console.log(this.state.mainPage);
//
//
//         // if (action.type===SET_CATEGORIES_DATA){
//         //     this.state.mainPage.categoriesData=action.data;
//         //     console.log(action.data);
//         //     this._callSubscriber(this.state)
//         // }else if(action.type===SET_SUBCATEGORIES_DATA){
//         //     this.state.mainPage.subCategoriesData.push(action.data);
//         //     console.log(this.state.mainPage.subCategoriesData);
//         //     this._callSubscriber(this.state)
//         // }else if(action.type===COMPARE_CATEGORY_SLUG){
//         //     for(let i = 0; i < this.state.mainPage.subCategoriesData.length; i++){
//         //         if(!this.state.mainPage.subCategoriesData[i][0].slug.localeCompare(action.slug)){
//         //             this.dispatch({type:SET_CURRENT_SUBCATEGORY,data:this.state.mainPage.subCategoriesData[i]});
//         //             return false;
//         //         }
//         //     }
//         //     return true;
//         //     this._callSubscriber(this.state);
//         // }else if(action.type===SET_CURRENT_SUBCATEGORY){
//         //     this.state.mainPage.currentSubCategory=action.data;
//         //     console.log(this.state.mainPage.currentSubCategory);
//         //     this._callSubscriber(this.state)
//         // }else if(action.type===SET_PRODUCTS_DATA){
//         //     this.state.mainPage.productsData=action.data.results;
//         //     console.log(action.data.results);
//         //     this._callSubscriber(this.state)
//         // }
//         // return this.state;
//         this._callSubscriber(this.state)
//
//     }
// };
//
// // export const setCategoriesDataActionCreator=(data)=>({type:SET_CATEGORIES_DATA,data:data});
// //
// // export const setSubCategoriesDataActionCreator=(data)=>({type:SET_SUBCATEGORIES_DATA, data:data});
// //
// // export const setCurrentSubCategoryActionCreator=(data)=>({type:SET_CURRENT_SUBCATEGORY,data:data});
// //
// // export const setProductsDataActionCreator=(data)=>({type:SET_PRODUCTS_DATA,data:data});
// //
// // export const compareSlugActionCreator=(slug)=>({type:COMPARE_CATEGORY_SLUG,slug:slug});
//
//
// export default store;
// window.store=store;