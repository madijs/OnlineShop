import Axios from "axios";
import path from "../settings";

const SIGN_UP_DATA_BIRTHDATE='SIGN-UP-DATA-BIRTHDATE';
const SIGN_UP_DATA_GENDER='SIGN-UP-DATA-GENDER';
const SIGN_UP_DATA='SIGN-UP-DATA';
const CART_COUNT = 'CART-COUNT';

let initialState={
    signUpform:{
        birth_day:'',
        gender:'',
        first_name:'',
        last_name:'',
        email:'',
        password:''
    },
    cnt:0
};

const usersReducer = (state=initialState,action)=>{
    switch (action.type) {
        case SIGN_UP_DATA_BIRTHDATE:
            console.log(action.data);
            state.signUpform.birth_day=action.data;
            return state;
        case SIGN_UP_DATA_GENDER:
            console.log(action.data);
            state.signUpform.gender=action.data;
            return state;
        case SIGN_UP_DATA:
            state.signUpform.first_name=action.data.first_name;
            state.signUpform.last_name=action.data.last_name;
            state.signUpform.email=action.data.email;
            state.signUpform.password=action.data.password;
            console.log(state.signUpform);
            Axios.post(path+'/auth/users/', state.signUpform).then(res => {
                console.log(res.data);
                // localStorage.setItem('token', res.data.key);
            }).catch((err) => {
                console.log(err.response)
            });
            return state;
        case CART_COUNT: {
            let stateCopy ={...state}
            console.log(action.cnt)
            stateCopy.cnt = action.cnt;
            return stateCopy;
        }
        default:
            return state;
    }
};

export const signUpDataBirthDateActionCreator =(data)=>({type:SIGN_UP_DATA_BIRTHDATE,data:data});
export const signUpDataGenderActionCreator =(data)=>({type:SIGN_UP_DATA_GENDER,data:data});
export const signUpDataActionCreator =(data)=>({type:SIGN_UP_DATA,data:data});
export const cartCounterActionCreator=(cnt)=>({type:CART_COUNT,cnt:cnt});

export default usersReducer;