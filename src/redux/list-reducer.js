const SET_PRODUCTS_DATA2='SET-PRODUCTS-DATA2';
const SET_PRICE_FILTER='SET-PRICE-FILTER';
const SET_CURRENT_PRODUCTS='SET-CURRENT-PRODUCTS';
const SET_CURRENT_CATEGORY='SET-CURRENT-CATEGORY';
const SET_MIN_PRICE='SET-MIN-PRICE';
const SET_MAX_PRICE='SET-MAX-PRICE';
const SET_CURRENT_PAGE='SET-CURRENT-PAGE';

let initialState = {
    allProductsData:{},
    productsData:[],
    maxPrice:'',
    minPrice:'',
    currentCategory:'',
    pageArray:[],
    pageSize:2,
    currentPage:2,
    totalCount:0
};

const listReducer=(state=initialState,action)=>{
    switch (action.type) {
        case SET_PRODUCTS_DATA2: {
            let stateCopy = {...state};
            stateCopy.pageArray=[];
            stateCopy.allProductsData=action.data;
            stateCopy.productsData=action.data.results;
            stateCopy.totalCount = action.data.count;

            let n = Math.ceil(stateCopy.totalCount/stateCopy.pageSize);

            for (let i=1;i<=n;i++){
                stateCopy.pageArray.push(i);
            }
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
        case SET_MIN_PRICE:{
            let stateCopy = {...state};
            stateCopy.minPrice=action.price;
            return stateCopy;
        }
        case SET_MAX_PRICE:{
            let stateCopy = {...state};
            stateCopy.maxPrice=action.price;
            return stateCopy;
        }
        case SET_CURRENT_PAGE:{
            let stateCopy ={...state};
            stateCopy.currentPage=action.data;
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
export const setMinPriceAC =(price) =>({type:SET_MIN_PRICE,price:price});
export const setMaxPriceAC=(price)=>({type:SET_MAX_PRICE,price:price});
export const setCurrentPageAC=(data)=>({type:SET_CURRENT_PAGE,data:data});
export default listReducer;