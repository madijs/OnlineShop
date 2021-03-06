import React, {useEffect} from 'react';
import { useParams} from "react-router";
import './App.css';
import {NavLink, Route} from "react-router-dom";
import Footer from "./Footer/Footer";
import BasketContainer from "./Basket/BasketContainer";
import MainPageContainer from "./MainPage/MainPageContainer";
import ProductsContainer from "./ProductsList/ProductsContainer";
import SignUpContainer from "./Auth/SignUpContainer";
import ListOfProductContainer from "./ProductsList/ListOfProduct/listOfProductContainer";
import User from "./User/User";
import LoginContainer from "./Auth/LoginContainer";
import HeaderContainer from "./Header/HeaderContainer";
import Paperbase from "./AdminPanel/Paperbase";
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
      {/*<Route exact path="/products/:categorySlug"  render={({match,location})=> {*/}
      {/*    console.log(match);*/}
      {/*    console.log(location.search);*/}
      {/*    return <ListOfProductContainer match={match} location={location.search}/>*/}
      {/*}}/>*/}
        <Route exact path="/products/:categorySlug?/:ordering?"  render={({match,location})=> {
            console.log(match);
            console.log(location.search);
            return <ListOfProductContainer match={match} location={location.search}/>
        }}/>

      <Route exact path="/userDetails" render={()=><User/>}/>
      <Route path="/admin" render={()=><Paperbase/>}/>
      <Footer/>
    </div>
  );
}

export default App;
