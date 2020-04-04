import React, {useState} from 'react';
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
import SignUpContainer from "./Auth/SignUpContainer";
import ListOfProductContainer from "./ProductsList/ListOfProduct/listOfProductContainer";
import User from "./User/User";
import LoginContainer from "./Auth/LoginContainer";
import HeaderContainer from "./Header/HeaderContainer";
import Beket from "./Beket";
function App(props) {
  return (
    <div className="App">
      <HeaderContainer/>
      <Route exact path="/" render={()=><MainPageContainer/>} />
      <Route exact path="/register" render={()=><SignUpContainer/>} />
      <Route exact path="/login" render={()=><LoginContainer/>} />
      <Route exact path="/basket" render={()=><BasketContainer/>}/>
      <Route exact path="/product/:productSlug" render={(match)=>{
          console.log(match);
          return <ProductsContainer/>
      }} />
      <Route exact path="/products/:categorySlug"  render={({match,location})=> {
          console.log(match);
          console.log(location.search);
          return <ListOfProductContainer location={location.search}/>
      }}/>
      {/*<Route exact path="/products/" render={()=>{*/}
      {/*    return <div>404</div>*/}
      {/*}}/>*/}
      <Route exact path="/userDetails" render={()=><User/>}/>
      {/*  <Beket/>*/}
      <Footer/>
    </div>
  );
}

export default App;
