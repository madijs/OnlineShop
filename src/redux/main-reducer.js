const SET_CATEGORIES_DATA = 'SET-CATEGORIES-DATA';
const SET_SUBCATEGORIES_DATA = 'SET-SUBCATEGORIES-DATA';
const SET_CURRENT_SUBCATEGORY = 'SET-CURRENT-SUBCATEGORY';
const SET_PRODUCTS_DATA = 'SET-PRODUCTS-DATA';
const COMPARE_CATEGORY_SLUG ='COMPARE-CATEGORY-SLUG';
const SET_USERS_DATA='SET-USERS-DATA';
const SET_VALUE='SET-VALUE';
const SET_TABS_VISIBLE='SET-TABS-VISIBLE';


let initialState = {
    categoriesData:[],
    subCategoriesData:[],
    currentSubCategory:[],
    productsData:[],
    isCategoryActive:[],
    usersData:{},
    isExist:true,
    value:0,
    visible:false
};

const mainReducer =(state=initialState,action)=>{
    switch (action.type) {
        case SET_CATEGORIES_DATA: {
            // let stateCopy = {...state};
            // stateCopy.categoriesData=[...state.categoriesData];
            state.categoriesData = action.data;
            return state;
        }

        case SET_SUBCATEGORIES_DATA: {
            console.log(action.data)
            return{
                ...state,
                subCategoriesData:[...state.subCategoriesData,action.data]
            };
            // stateCopy.subCategoriesData = [...state.subCategoriesData];
            // stateCopy.subCategoriesData.push(action.data);
            // return stateCopy;
        }

        case COMPARE_CATEGORY_SLUG: {
            console.log(action.slug)
            let stateCopy={...state};
            stateCopy.subCategoriesData=[...state.subCategoriesData];
            stateCopy.currentSubCategory=[...state.currentSubCategory];

            for (let i = 0; i < stateCopy.subCategoriesData.length; i++) {
                if (!stateCopy.subCategoriesData[i][0].slug.localeCompare(action.slug)) {
                    stateCopy.currentSubCategory = state.subCategoriesData[i];
                    state.isExist = false;
                    break
                }
            }
            return stateCopy;
        }

        case SET_CURRENT_SUBCATEGORY: {
            let stateCopy = {...state};
            stateCopy.currentSubCategory = [...state.currentSubCategory];
            stateCopy.currentSubCategory = action.data;
            return stateCopy;
        }

        case SET_PRODUCTS_DATA: {
            let stateCopy = {...state};
            stateCopy.productsData = [...state.productsData];
            stateCopy.productsData = action.data.results;
            return stateCopy;
        }
        case SET_USERS_DATA: {
            let stateCopy = {...state};
            stateCopy.usersData={...state.usersData};
            stateCopy.usersData = action.data;
            return stateCopy;
        }
        case SET_VALUE:{
            let stateCopy = {...state};
            stateCopy.value=action.value
            return stateCopy
        }
        case SET_TABS_VISIBLE:{
            console.log(action.bool)
            let stateCopy = {...state};
            stateCopy.visible=action.bool
            return stateCopy
        }

        default:
            return state;
    }
};
export const setCategoriesDataActionCreator=(data)=>({type:SET_CATEGORIES_DATA,data:data});

export const setSubCategoriesDataActionCreator=(data)=>({type:SET_SUBCATEGORIES_DATA, data:data});

export const setCurrentSubCategoryActionCreator=(data)=>({type:SET_CURRENT_SUBCATEGORY,data:data});

export const setProductsDataActionCreator=(data)=>({type:SET_PRODUCTS_DATA,data:data});

export const compareSlugActionCreator=(slug)=>({type:COMPARE_CATEGORY_SLUG,slug:slug});

export const setUsersDataActionCreator = (data)=>({type:SET_USERS_DATA,data:data});

export const setValueAC =(value)=>({type:SET_VALUE,value:value});

export const setTabsVisibleAC=(bool)=>({type:SET_TABS_VISIBLE,bool:bool})

export default mainReducer;