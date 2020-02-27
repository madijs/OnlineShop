import React from 'react'
import style from './Header.module.css'
import {NavLink} from "react-router-dom";
import phoneIcon from '../images/phoneIcon.png'
import Badge from '@material-ui/core/Badge';
import { withStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import basketIcon from '../images/basket.png'
import logo from '../images/logo_shop_blue.png'


const StyledBadge = withStyles(theme => ({
    badge: {
        width:'30px',
        height:'30px',
        borderRadius:'50%',
        right: 5,
        top: 19,
        border: `2px solid ${theme.palette.background.paper}`,
        padding: '0 4px',
    },
}))(Badge);



const Header =(props)=>{

    return(
        <div>
        <div className={style.header1}>
            <ul>
                <div className={style.first}>
                <li>
                    <NavLink to='/about' activeClassName={`${style.item} ${style.active}`}>
                        О магазине
                    </NavLink>
                </li>
                <li>
                    <NavLink to='/dostavka' activeClassName={`${style.item} ${style.active}`}>
                        Доставка
                    </NavLink>
                </li>
                <li>
                    <NavLink to='/contacts' activeClassName={`${style.item} ${style.active}`}>
                        Контакты
                    </NavLink>
                </li>
                </div>


                <div className={style.auth}>
                    {localStorage.getItem('token') &&
                    <div>{localStorage.getItem('first_name')}</div>
                    }
                    {!localStorage.getItem('token') &&
                    <li>
                        <NavLink to='/login' activeClassName={`${style.item} ${style.active}`}>
                            <span className={style.login}>Вход</span>
                        </NavLink>
                    </li>
                    }
                <li>
                    <NavLink to='/register' activeClassName={`${style.item} ${style.active}`}>
                        <span className={style.register}>Регистрация</span>
                    </NavLink>
                </li>
                </div>
            </ul>
        </div>
            <div className={style.mid}>
                <div className={style.logo}>
                    <img className={style.logo_image} src={logo}/>
                </div>
                <div>
                    <form>
                        <input type="text" className={style.input} name="search" placeholder="Введите название"/>
                    </form>
                </div>
                <div className={style.contacts}>
                    <div><img src={phoneIcon}/></div>
                    <div className={style.podcontacts}>
                        <div><span className={style.phone}>8 (700) 123-45-67</span></div>
                        <div><span className={style.mail}>mail@gmail.com</span></div>
                    </div>
                </div>
                <div className={style.basket}>
                    <NavLink to="/basket">
                    <IconButton>
                        <StyledBadge badgeContent={0} color="primary">
                            <img className={style.basket_image} src={basketIcon}/>
                        </StyledBadge>
                    </IconButton>
                    </NavLink>
                </div>
            </div>
        </div>
    )
}
export default Header