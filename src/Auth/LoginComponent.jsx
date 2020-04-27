import React, {useState} from "react";
import * as jwt_decode from 'jwt-decode';
import { useHistory } from 'react-router-dom';
import style from './LoginComponent.module.css'
import Axios from "axios";
import path from "../settings";

const LoginComponent =(props)=>{
    const [email,setEmail]=useState('');
    const [password,setPassword]=useState('');
    const history = useHistory();
    let emailChanged=(e)=>{
        setEmail(e.target.value)
    };
    let passwordChanged=(e)=>{
        setPassword(e.target.value)
    }

    let submitForm=(e)=>{
        var data={
            'email':email,
            'password':password
        }
        Axios.post(path+'/token', data).then(res => {
            console.log(res.data);
            console.log(res.data.access)
            var decoded = jwt_decode(res.data.access);
            localStorage.setItem('token', res.data.access);
            localStorage.setItem('count',decoded.count);
            props.setCartCount(localStorage.getItem('count'));
            localStorage.setItem('birth_day',decoded.birth_day);
            localStorage.setItem('first_name',decoded.first_name);
            localStorage.setItem('last_name',decoded.last_name);
            localStorage.setItem('id',decoded.id);
            localStorage.setItem('gender',decoded.gender);
            localStorage.setItem('email', decoded.email);
            if (localStorage.getItem('token')){
                window.location.href='/'
            }
        }).catch(err => {
            console.log(err.response)
        });
    }

    return(
        <div>
            <div className={style.login_form_container}>
                <div className={style.login_form_label}>
                    <div className={style.label1}>Вход</div>
                    <div onClick={()=>{history.push('/register')}} className={style.label2}>Создать аккаунт</div>
                </div>
            <div>
                <div><input className={style.login_form} onChange={emailChanged} type="email" placeholder="E m a i l"/></div>
                <div><input className={style.login_form} onChange={passwordChanged} type="password" placeholder="П а р о л ь" /></div>

                <div className={style.login_buttons}>
                    <button onClick={submitForm} className={style.sign_in_button} type="submit" value="Войти">Войти</button>
                    <div className={style.reset_pass_button}>Забыли пароль?</div>
                </div>
            </div>
            </div>
        </div>
    )
};
export default LoginComponent;