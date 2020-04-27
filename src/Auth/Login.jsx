import React, {useEffect, useState} from 'react';
import * as jwt_decode from 'jwt-decode';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Paper from '@material-ui/core/Paper';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Axios from "axios";
import path from "../settings";
import style2 from "./Auth.module.css"

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
    root: {
        height: '92vh',
    },
    image: {
        backgroundColor:
            theme.palette.type === 'dark' ? theme.palette.grey[900] : theme.palette.grey[50],
    },
    paper: {
        margin: theme.spacing(8, 4),
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
        marginTop: theme.spacing(1),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
}));

const Login = (props) => {
    const classes = useStyles();
    /*let [email,setEmail] = useState("");
    let [password,setPassword] = useState("");
    let [token,setToken] = useState("");*/
    const [token,setToken]=useState('');


    let submitForm=(event)=> {
        let email='';
        let password='';
        let token='';
        email=event.target.email.value;
        password=event.target.password.value;
        event.preventDefault();
        var data = {
            'email':email,
            'password':password
        };
        console.log(data);

        Axios.post(path+'/token', data).then(res => {
            console.log(res.data.access);
            var decoded = jwt_decode(res.data.access);
            console.log(decoded);
            localStorage.setItem('token', res.data.access);
            localStorage.setItem('count',decoded.count);
            props.setCartCount(localStorage.getItem('count'))
            localStorage.setItem('birth_day',decoded.birth_day);
            localStorage.setItem('first_name',decoded.first_name);
            localStorage.setItem('last_name',decoded.last_name);
            localStorage.setItem('id',decoded.id);
            localStorage.setItem('gender',decoded.gender);
            setToken(res.data.access);
            localStorage.setItem('email', decoded.email);
            console.log(token);

            if (localStorage.getItem('token')){
                window.location.href='/'
            }
        }).catch(err => {
            console.log(err.response)
        });
    };
    const handleLogout=(event)=>{
        event.preventDefault();
       // setToken("");
        localStorage.removeItem('token');
    };
    const isAuthenticated = () => {
        const token = localStorage.getItem('token');
        return token && token.length > 10;
    };
    const isAlreadyAuthenticated = isAuthenticated();

    return (
        <div>
            {!isAlreadyAuthenticated &&
            <Grid container component="main" className={classes.root}>
                <CssBaseline/>
                <Grid item xs={false} sm={4} md={7} className={`${style2.image2} ${classes.image}`}/>
                <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
                    <div className={classes.paper}>
                        <Avatar className={classes.avatar}>
                            <LockOutlinedIcon/>
                        </Avatar>
                        <Typography component="h1" variant="h5">
                            Sign in
                        </Typography>
                        <form onSubmit={submitForm} className={classes.form} noValidate>
                            <TextField
                                variant="outlined"
                                margin="normal"
                                required
                                fullWidth
                                id="email"
                                label="Email Address"
                                name="email"
                                autoComplete="email"
                                autoFocus
                            />
                            <TextField
                                variant="outlined"
                                margin="normal"
                                required
                                fullWidth
                                name="password"
                                label="Password"
                                type="password"
                                id="password"
                                autoComplete="current-password"
                            />
                            <FormControlLabel
                                control={<Checkbox value="remember" color="primary"/>}
                                label="Remember me"
                            />
                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                color="primary"
                                className={classes.submit}
                            >
                                Sign In
                            </Button>
                            <Grid container>
                                <Grid item xs>
                                    <Link href="#" variant="body2">
                                        Forgot password?
                                    </Link>
                                </Grid>
                                <Grid item>
                                    <Link href="#" variant="body2">
                                        {"Don't have an account? Sign Up"}
                                    </Link>
                                </Grid>
                            </Grid>
                            <Box mt={5}>
                                <Copyright/>
                            </Box>
                        </form>
                    </div>
                </Grid>
            </Grid>
            }
        </div>
    );
}
export default Login;