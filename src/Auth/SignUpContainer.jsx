import React from "react";
import {connect} from "react-redux";
import {
    signUpDataActionCreator,
    signUpDataBirthDateActionCreator,
    signUpDataGenderActionCreator
} from "../redux/users-reducer";
import RegisterComponent from "./RegisterComponent";

let mapStateToProps=(state)=>{
    return{
        signUpPage:state.signUpPage
    }
}
let mapDispatchToProps=(dispatch)=>{
    return{
        setBirthDate:(date)=>{
            dispatch(signUpDataBirthDateActionCreator(date))
        },
        setGender:(gender)=>{
            dispatch(signUpDataGenderActionCreator(gender))
        },
        setFormsData:(data)=>{
            dispatch(signUpDataActionCreator(data))
        }
    }
}

const SignUpContainer = connect(mapStateToProps,mapDispatchToProps)(RegisterComponent)
export default SignUpContainer;