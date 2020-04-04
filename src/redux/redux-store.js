import {combineReducers, createStore} from "redux"
import mainReducer from "./main-reducer";
import productDetailsReducer from "./productDetails-reducer";
import basketReducer from "./basket-reducer";
import usersReducer from "./users-reducer";
import listReducer from "./list-reducer";

let reducers = combineReducers({
    mainPage:mainReducer,
    productDetailsPage:productDetailsReducer,
    basketPage:basketReducer,
    signUpPage:usersReducer,
    listProductsPage:listReducer,
});

let store = createStore(reducers);

export default store;

