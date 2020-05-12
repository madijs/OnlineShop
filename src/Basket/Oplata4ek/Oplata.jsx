import React from "react";
import style from './Oplata.module.css'
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Check from "./Check";
import exitIcon from "../../images/exit.png"
import { useHistory } from 'react-router-dom';
import Axios from "axios";
import path from "../../settings";



const useStyles = makeStyles(theme => ({
    root: {
        '& > *': {
            marginRight:'10%',
            marginTop:'2%',
            width: '80%',
        },
    },
    formControl: {
        margin: theme.spacing(1),
        minWidth: '80%',
        marginRight:'11%',
        marginTop:'3%',
    },
}));
const Oplata=(props)=>{
    const classes = useStyles();
    const [state, setState] = React.useState({
        region:''
    });
    const[region,setRegion] = React.useState('');
    const[adress,setAdress]=React.useState('');
    const inputLabel = React.useRef(null);
    const [labelWidth, setLabelWidth] = React.useState(0);
    React.useEffect(() => {
        setLabelWidth(inputLabel.current.offsetWidth);
    }, []);

    const handleChange = name => event => {
        setState({
            ...state,
            [name]: event.target.value,
        });
        setRegion(event.target.value)
    };

    const setAdressChange=(e)=>{
        setAdress(e.target.value)
    };

    const paymentOrder=()=>{
        if(localStorage.getItem('token')) {
            var data = {
                'address': adress,
                'city': region
            };
            console.log(data)
            Axios.post(path + '/order/', data, {
                headers: {
                    'Authorization': 'Bearer ' + localStorage.getItem('token')
                }
            }).then(res => {
                window.location = res.data.payment_page_url
            })
        }else {
            history.push('/login')
        }
    };

    const history = useHistory();


    return(
        <div className={style.container}>
            <div onClick={()=>{
                history.push('/');
            }} className={style.exit}><img className={style.exitImg} src={exitIcon}/></div>
            <div className={style.www}>
                 <div className={style.oplatatext}>Оплата</div>
                     <div>
                         <FormControl variant="outlined" className={classes.formControl}>
                             <InputLabel ref={inputLabel} htmlFor="outlined-age-native-simple">
                                 Регион
                             </InputLabel>
                             <Select
                                 native
                                 value={state.region}
                                 onChange={handleChange('region')}
                                 labelWidth={labelWidth}
                                 inputProps={{
                                     name: 'age',
                                     id: 'outlined-age-native-simple',
                                 }}
                             >
                                 <option value="" />
                                 {props.basketPage.regionsData.map(el=>(
                                     <option value={el.id}>{el.title}</option>
                                     ))
                                 }
                             </Select
>
                         </FormControl>
                     </div>
                <div>
                    <form className={classes.root} noValidate autoComplete="off">
                        <TextField onChange={setAdressChange} id="outlined-basic" label="Адрес" variant="outlined" />
                    </form>
                </div>
                <div><button onClick={paymentOrder} className={style.oplataButton}>Оплатить</button></div>
            </div>
            <div className={style.sss}>
                <Check basketPage={props.basketPage}/>
            </div>
        </div>
    )
}
export default Oplata