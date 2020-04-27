import React, {useState} from "react";
import style from "./RegisterComponent.module.css"
import { useHistory } from 'react-router-dom';
const RegisterComponent=(props)=>{
    const [email,setEmail]=useState('');
    const [password,setPassword]=useState('');
    const [name,setName]=useState('');
    const [surname,setSurname]=useState('');
    const [gender,setGender]=useState('');
    const [date,setDate]=useState('');

    let emailChanged=(e)=>{
        setEmail(e.target.value)
    };
    let passwordChanged=(e)=>{
        setPassword(e.target.value)
    };
    let nameChanged=(e)=>{
        setName(e.target.value)
    };
    let surnameChanged=(e)=>{
        setSurname(e.target.value)
    };
    let genderChanged=(e)=>{
        setGender(e.target.value)
    };
    let dateChanged=(e)=>{
        setDate(e.target.value)
    };
    let submitForm=()=>{
        var data={
            birth_day:date,
            gender:gender,
            first_name:name,
            last_name:surname,
            email:email,
            password:password
        }
        props.setFormsData(data)
    };
    const history=useHistory();
    return(
        <div>
            <div className={style.register_form_container}>
                <div className={style.register_form_label}>
                    <div className={style.label1}>Регистрация</div>
                    <div onClick={()=>{history.push('/login')}} className={style.label2}>Войти</div>
                </div>
                <div>
                    <div><input onChange={nameChanged} className={style.register_form}  type="text" placeholder="И м я"/></div>
                    <div><input onChange={surnameChanged} className={style.register_form}  type="text" placeholder="Ф а м и л и я"/></div>
                    <div><input onChange={dateChanged} className={style.register_form}  type="date" placeholder="Д е н ь р о ж д е н и я"/></div>

                    <div className={style.gender}>
                    <div>
                        <input onChange={genderChanged} className={style.gender_radio} type="radio" id="male" name="gender" value="М"/>
                        <span className={style.gender_text}>Мужчина</span>
                    </div>
                        <div>
                            <input onChange={genderChanged} className={style.gender_radio} type="radio" id="female" name="gender" value="Ж"/>
                            <span className={style.gender_text}>Женщина</span>
                        </div>
                    </div>

                    <div><input onChange={emailChanged}  className={style.register_form}  type="email" placeholder="E m a i l"/></div>
                    <div><input onChange={passwordChanged}  className={style.register_form} type="password" placeholder="П а р о л ь" /></div>
                    <div className={style.register_buttons}>
                        <button onClick={submitForm} className={style.sign_up_button} type="submit" value="Войти">Зарегистрироваться</button>
                    </div>
                </div>
            </div>
        </div>
    )
};
export default RegisterComponent;