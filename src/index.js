import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import store from "./redux/redux-store";
import * as serviceWorker from './serviceWorker';
import {BrowserRouter} from "react-router-dom";
import {Provider} from "react-redux";
// export let rerender=(state)=> {
    ReactDOM.render(
        <BrowserRouter>
            <Provider store={store}>
        <App/>
            </Provider>
        </BrowserRouter>, document.getElementById('root'));
// }
// rerender(store.getState());
// store.subscribe(()=>{
//     let state = store.getState()
//     rerender(state)
// });

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
