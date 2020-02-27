import React from 'react';
import './App.css';
import Header from "./Header/Header";
import { BrowserRouter, Route } from "react-router-dom";
import Footer from "./Footer/Footer";
import MainPage from "./MainPage/MainPage"
import ProductDetails from "./ProductsList/ProductDetails/ProductDetails";
import SignUp from "./Auth/SignUp";
import Login from "./Auth/Login";
import BasketContainer from "./Basket/BasketContainer";
import MainPageContainer from "./MainPage/MainPageContainer";
import ProductsContainer from "./ProductsList/ProductsContainer";
function App(props) {
  return (
    <div className="App">
      <Header/>
      <Route exact path="/" render={()=><MainPageContainer/>} />
      <Route exact path="/product/:productSlug" render={()=><ProductsContainer/>} />
      <Route exact path="/register" render={()=><SignUp/>} />
      <Route exact path="/login" render={()=><Login/>} />
      <Route exact path="/basket" render={()=><BasketContainer/>}/>
      <Footer/>
    </div>
  );
}

export default App;
