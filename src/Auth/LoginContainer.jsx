import React from "react";
import {cartCounterActionCreator} from "../redux/users-reducer";
import {connect} from "react-redux";
import Login from "./Login";
import LoginComponent from "./LoginComponent";

let mapStateToProps = (state)=>{
    return{
        cnt:state.signUpPage.cnt
    }
};

let mapDispatchToProps=(dispatch)=>{
    return{
        setCartCount:(cnt)=>{
            console.log(cnt);
            dispatch(cartCounterActionCreator(cnt))
        }
    }
};

const LoginContainer=connect(mapStateToProps,mapDispatchToProps)(LoginComponent);
export default LoginContainer;