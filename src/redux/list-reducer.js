const SET_PRODUCTS_DATA2='SET-PRODUCTS-DATA2';
const SET_PRICE_FILTER='SET-PRICE-FILTER';
const SET_CURRENT_PRODUCTS='SET-CURRENT-PRODUCTS';
const SET_CURRENT_CATEGORY='SET-CURRENT-CATEGORY';

let initialState = {
    allProductsData:{},
    productsData:[],
    maxPrice:'',
    minPrice:'',
    currentCategory:''
};

const listReducer=(state=initialState,action)=>{
    switch (action.type) {
        case SET_PRODUCTS_DATA2: {
            let stateCopy = {...state};
            stateCopy.allProductsData=action.data;
            stateCopy.productsData=action.data.results;
            return stateCopy
        }
        case SET_PRICE_FILTER:{
            let stateCopy = {...state};
            stateCopy.maxPrice=action.data[1];
            stateCopy.minPrice=action.data[0];
            return stateCopy;
        }
        case SET_CURRENT_PRODUCTS:{
            let stateCopy = {...state};
            stateCopy.productsData=action.data.results;
            return stateCopy;
        }
        case SET_CURRENT_CATEGORY:{
            let stateCopy = {...state};
            stateCopy.currentCategory=action.data;
            return stateCopy;
        }
        default:
            return state;

    }
};

export const setAllProductsDataActionCreator=(data)=>({type:SET_PRODUCTS_DATA2,data:data});
export const setPriceFilterActionCreator=(data)=>({type:SET_PRICE_FILTER,data:data});
export const setCurrentProductsActionCreator=(data)=>({type:SET_CURRENT_PRODUCTS,data:data});
export const setCurrentCategoryActionCreator=(data)=>({type:SET_CURRENT_CATEGORY,data:data});
export default listReducer;