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
        let data = {
            'region': event.target.value
        };
    };

    const history = useHistory();


    return(
        <div className={style.container}>
            <div onClick={()=>{
                history.push('/')
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
                                 <option value={1}>Актобе</option>
                                 <option value={2}>Алматы</option>
                             </Select>
                         </FormControl>
                     </div>
                <div>
                    <form className={classes.root} noValidate autoComplete="off">
                        <TextField id="outlined-basic" label="Улица" variant="outlined" />
                        <TextField id="outlined-basic" label="Телефон" variant="outlined" />
                    </form>
                </div>
            </div>
            <div className={style.sss}>
                <Check basketPage={props.basketPage}/>
            </div>
        </div>
    )
}
export default Oplata