import {combineReducers, createStore} from "redux"
import mainReducer from "./main-reducer";
import productDetailsReducer from "./productDetails-reducer";
import basketReducer from "./basket-reducer";

let reducers = combineReducers({
    mainPage:mainReducer,
    productDetailsPage:productDetailsReducer,
    basketPage:basketReducer
});

let store = createStore(reducers);

export default store;

