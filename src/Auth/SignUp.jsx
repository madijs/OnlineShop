import React, {useEffect, useState} from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import style2 from './Auth.module.css'
import Axios from "axios";
import path from "../settings";
import 'date-fns';
import DateFnsUtils from '@date-io/date-fns';
import {
    MuiPickersUtilsProvider,
    KeyboardTimePicker,
    KeyboardDatePicker,
} from '@material-ui/pickers';

import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import {signUpDataBirthDateActionCreator} from "../redux/users-reducer";

export function MaterialUIPickers(props) {
    // The first commit of Material-UI
    const [selectedDate, setSelectedDate] = React.useState(new Date('2014-08-18T21:11:54'));

    const fillDate=(date)=>{
        let temp= date + "";

        if(temp.length===1){
            console.log('0'+temp);
            return '0' + temp;
        }

        return temp;
    };

    const handleDateChange = date => {

        
        setSelectedDate(date);

        try {
            console.log(date);
            props.setBirthDate(date.getFullYear()+ '-' + fillDate((date.getMonth()+1)) + '-' + fillDate(date.getDate()))
            console.log(date.getFullYear()+ '-' + fillDate((date.getMonth()+1)) + '-' + fillDate(date.getDate()))
        }catch (e) {

        }
    };

    return (
        <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <Grid container justify="space-around">
                <KeyboardDatePicker
                    minDate='01-01-1000'
                    inputVariant="outlined"
                    margin="normal"
                    id="date-picker-dialog"
                    label="Date picker dialog"
                    format="dd/MM/yyyy"
                    value={selectedDate}
                    onChange={handleDateChange}
                    KeyboardButtonProps={{
                        'aria-label': 'change date',
                    }}
                />
            </Grid>
        </MuiPickersUtilsProvider>
    );
}



function Copyright() {
    return (
        <Typography variant="body2" color="textSecondary" align="center">
            {'Copyright © '}
            <Link color="inherit" href="https://material-ui.com/">
                Your Website
            </Link>{' '}
            {new Date().getFullYear()}
            {'.'}
        </Typography>
    );
}


const useStyles = makeStyles(theme => ({
    paper: {
        marginTop: theme.spacing(8),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.secondary.main,
    },
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(3),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
    // formControl: {
    //     margin: theme.spacing(1),
    //     minWidth: 150,
    // },
    // selectEmpty: {
    //     marginTop: theme.spacing(2),
    // },
}));


export function NativeSelects(props) {
    const classes = useStyles();
    const [state, setState] = React.useState({
        gender: '',
        name: 'hai',
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
        props.setGender(event.target.value)
    };

    return (
        <div>
            <FormControl variant="outlined" className={classes.formControl}>
                <InputLabel ref={inputLabel} htmlFor="outlined-age-native-simple">
                    Пол
                </InputLabel>
                <Select
                    native
                    value={state.gender}
                    onChange={handleChange('gender')}
                    labelWidth={labelWidth}
                    inputProps={{
                        name: 'gender',
                        id: 'outlined-age-native-simple',
                    }}
                >
                    <option value="" />
                    <option value={'М'}>Мужчина</option>
                    <option value={'Ж'}>Женщина</option>
                </Select>
            </FormControl>
        </div>
    );
}



export default function SignUp(props) {
    /*const [email,setEmail] = useState("");
    const [password,setPassword] = useState("");
    const [token,setToken] = useState("");*/

    const submitForm=(event)=> {
        let email='';
        let password='';
        let firstName='';
        let surName='';
        event.preventDefault();
        email=event.target.email.value;
        password=event.target.password.value;
        firstName=event.target.firstName.value;
        surName=event.target.lastName.value;
        console.log(email);

        let data = {
            'email':email,
            'password':password,
            'first_name':firstName,
            'last_name':surName,
        };
        props.setFormsData(data);

        // Axios.post(path+'/api/register', data).then(res => {
        //     console.log(res.data);
        //     // localStorage.setItem('token', res.data.key);
        // }).catch(err => {
        //     console.log(err.message)
        // });
    };



    const classes = useStyles();
    return (
        <Container component="main" maxWidth="xs">
            <CssBaseline />
            <div className={classes.paper}>
                <Avatar className={classes.avatar}>
                    <LockOutlinedIcon />
                </Avatar>
                <Typography component="h1" variant="h5">
                    <div className={style2.text}>
                    Sign up
                    </div>
                </Typography>
                <form onSubmit={submitForm} className={classes.form} noValidate>
                    <Grid container spacing={2}>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                autoComplete="fname"
                                name="firstName"
                                variant="outlined"
                                required
                                fullWidth
                                id="firstName"
                                label="First Name"
                                autoFocus
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                variant="outlined"
                                required
                                fullWidth
                                id="lastName"
                                label="Last Name"
                                name="lastName"
                                autoComplete="lname"
                            />
                        </Grid>
                        <Grid container spacing={1}>
                               <MaterialUIPickers setBirthDate={props.setBirthDate}/>
                        </Grid>
                        <Grid item xs={12}>
                            <NativeSelects setGender={props.setGender}/>
                        </Grid>

                        <Grid item xs={12}>
                            <TextField
                                variant="outlined"
                                required
                                fullWidth
                                id="email"
                                label="Email Address"
                                name="email"
                                autoComplete="email"
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                variant="outlined"
                                required
                                fullWidth
                                name="password"
                                label="Password"
                                type="password"
                                id="password"
                                autoComplete="current-password"
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <FormControlLabel
                                control={<Checkbox value="allowExtraEmails" color="primary" />}
                                label="I want to receive inspiration, marketing promotions and updates via email."
                            />
                        </Grid>
                    </Grid>
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                        className={classes.submit}
                    >
                        Sign Up
                    </Button>
                    <Grid container justify="flex-end">
                        <Grid item>
                            <Link href="#" variant="body2">
                                Already have an account? Sign in
                            </Link>
                        </Grid>
                    </Grid>
                </form>
            </div>
            <Box mt={5}>
                <Copyright />
            </Box>
        </Container>
    );
}