import React from "react";
import style from './Oplata.module.css'
import bus from '../../images/bus.png'
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';

const useStyles = makeStyles(theme => ({
    root: {
        '& > *': {
            marginRight:'10%',
            marginTop:'3%',
            width: '80%',
        },
    },
}));
const Oplata=()=>{
    const classes = useStyles();
    return(
        <div className={style.container}>
            <div className={style.www}>
                 <div className={style.oplatatext}>Оплата</div>
                     <div>
                          <select className={style.custom_select}>
                              <option value="0">Выберите способ доставки</option>
                              <option value="1">Казпочта</option>
                          </select>
                     </div>
                <div>
                    <select className={style.custom_select}>
                        <option value="0">Выберите способ оплаты</option>
                        <option value="1">PayBox</option>
                    </select>
                </div>
                <div>
                    <form className={classes.root} noValidate autoComplete="off">
                        <TextField id="outlined-basic" label="Имя" variant="outlined" />
                        <TextField id="outlined-basic" label="Фамилия" variant="outlined" />
                        <TextField id="outlined-basic" label="Город" variant="outlined" />
                        <TextField id="outlined-basic" label="Улица" variant="outlined" />
                        <TextField id="outlined-basic" label="Телефон" variant="outlined" />
                        <TextField id="outlined-basic" label="E-mail" variant="outlined" />
                    </form>
                </div>
            </div>
            <div className={style.sss}>
                d
            </div>
        </div>
    )
}
export default Oplata