const SET_PRODUCTDETAILS_DATA = "SET-PRODUCTDETAILS-DATA";
const SET_CATEGORY_DATA = "SET-CATEGORY-DATA";
const SET_COMMENTS_DATA="SET-COMMENTS-DATA";

let initialState = {
    productDetailsData:[],
    categoryData:{},
    delimetrPrice:'',
    oldDelimetrPrice:'',
    commentsData:[]
};

const productDetailsReducer = (state=initialState,action)=>{
    switch (action.type) {
        case SET_PRODUCTDETAILS_DATA: {
            let stateCopy={
                ...state,
                delimetrPrice:action.data.price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " "),
            };
            stateCopy.productDetailsData = action.data;
            // stateCopy.delimetrPrice = action.data.price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
            return stateCopy;
        }
        case SET_CATEGORY_DATA: {
            let stateCopy={...state};
            stateCopy.categoryData = action.data;
            console.log(stateCopy);
            return stateCopy;
        }
        case SET_COMMENTS_DATA:{
            let stateCopy={...state};
            stateCopy.commentsData=action.data;
            return stateCopy;
        }
        default:
            return state
    }
};

export const setProductDetailsActionCreator=(data)=>({type:SET_PRODUCTDETAILS_DATA,data:data});
export const setProductCategoryActionCreator=(data)=>({type:SET_CATEGORY_DATA,data:data});
export const setCommentsDataActionCreator=(data)=>({type:SET_COMMENTS_DATA,data:data});
export default productDetailsReducer