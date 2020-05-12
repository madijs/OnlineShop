import Axios from "axios";
import { useHistory } from 'react-router-dom';
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
            state.signUpform=action.data;
            console.log(state.signUpform);
            Axios.post('https://api.jussupov.me/register', state.signUpform).then(res => {
                console.log(res.data);
                alert('Спасибо за регистрацию!Вам на '+state.signUpform.email+
                    " отправлено сообщение!Перейдите по ссылке чтобы подтвердить почту!")
                window.location = 'http://localhost:3000/login'
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