import React, {useEffect, useState} from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import { createMuiTheme } from '@material-ui/core/styles';
import TextField from "@material-ui/core/TextField";
import FormControl from "@material-ui/core/FormControl";
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormLabel from '@material-ui/core/FormLabel';
import { useHistory } from 'react-router-dom';
import {KeyboardDatePicker, MuiPickersUtilsProvider} from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";
import Axios from "axios";
import path from "../settings";

export function MaterialUIPickers(props) {
    // The first commit of Material-UI
    const [selectedDate, setSelectedDate] = React.useState(new Date(localStorage.getItem('birth_day')));

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
            console.log("month "+(date.getMonth()+1));
            console.log("day "+date.getDate());
            localStorage.setItem('birth_day',date.getFullYear()+ '-' + fillDate((date.getMonth()+1)) + '-' + fillDate(date.getDate()))
           // props.setBirthDate(date.getFullYear() + '-' + fillDate(date.getMonth()) + '-' + fillDate(date.getDay()))
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
                    label="yyyy/MM/dd"
                    format="yyyy/MM/dd"
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

export function RadioButtonsGroup() {
    const [value, setValue] = React.useState(localStorage.getItem('gender'));

    const handleChange = (event) => {
        localStorage.setItem('gender',event.target.value)
        setValue(event.target.value);
    };

    return (
        <FormControl component="fieldset">
            <RadioGroup row aria-label="gender" name="gender1" value={value} onChange={handleChange}>
                <FormControlLabel value="М" control={<Radio />} label="Мужчина" />
                <FormControlLabel value="Ж" control={<Radio />} label="Женщина" />
            </RadioGroup>
        </FormControl>
    );
}

function TabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
        <Typography
            component="div"
            role="tabpanel"
            hidden={value !== index}
            id={`vertical-tabpanel-${index}`}
            aria-labelledby={`vertical-tab-${index}`}
            {...other}
        >
            {value === index && <Box p={3}>{children}</Box>}
        </Typography>
    );
}

TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.any.isRequired,
    value: PropTypes.any.isRequired,
};

function a11yProps(index) {
    return {
        id: `vertical-tab-${index}`,
        'aria-controls': `vertical-tabpanel-${index}`,
    };
}

const StyledTabs = withStyles(theme=>({
    root:{
        textAlign:'center',
        width: '400px',
        minHeight:'100%',
        backgroundColor: "#fff"
    },
    flexContainer:{
        margin:'auto'
    }
}))(Tabs);

const StyledTab = withStyles(theme=>({
    root:{
        minWidth:'100%',
        fontSize:'0.8em',
    },
    selected:{
        color:'red',
        backgroundColor:'white',
    }
}))(Tab);

const useStyles = makeStyles(theme => ({
    root: {
        flexGrow: 1,
        backgroundColor: 'theme.palette.background.paper',
        display: 'flex',
        height: 550,

    },
    tabs: {
        borderRight: `1px solid ${theme.palette.divider}`,
    },
    btnDiv:{
        '& > *': {
            margin: theme.spacing(1),
        },
    },
}));

const StyledButton = withStyles(theme=>({
    color:'red',
    "&:hover":{
        color: 'red'
},
}))(Button);

const theme = createMuiTheme({
    palette: {
        primary: {
            // light: will be calculated from palette.primary.main,
            main: '#ff4400',
            // dark: will be calculated from palette.primary.main,
            // contrastText: will be calculated to contrast with palette.primary.main
        },
        secondary: {
            light: '#0066ff',
            main: '#0044ff',
            // dark: will be calculated from palette.secondary.main,
            contrastText: '#ffcc00',
        },
        // Used by `getContrastText()` to maximize the contrast between
        // the background and the text.
        contrastThreshold: 3,
        // Used by the functions below to shift a color's luminance by approximately
        // two indexes within its tonal palette.
        // E.g., shift from Red 500 to Red 300 or Red 700.
        tonalOffset: 0.2,
    },
});

const User = ()=>{
    const classes = useStyles();
    const [change,setChange]=useState(true);
    const [value, setValue] = React.useState(0);

    const history = useHistory();
    useEffect(()=>{
        if(!localStorage.getItem('token')){
            history.push('/login')
        }
    },[])
    const handleChange = (event, newValue) => {
        setValue(newValue);
    };
    return(
        <div>
            {localStorage.getItem('token') &&
            <div className={classes.root}>
                <StyledTabs
                    orientation="vertical"
                    value={value}
                    onChange={handleChange}
                    aria-label="Vertical tabs example"
                    className={classes.tabs}
                >
                    <StyledTab style={{marginTop: '5%'}} label="Учетная запись" {...a11yProps(0)} />
                    <StyledTab label="Мои заказы" {...a11yProps(1)} />
                    <div style={{marginTop: '10%', marginBottom: '2%', fontWeight: "bold"}}>Персональная
                        информация
                    </div>
                    <StyledTab label="Изменить данные" {...a11yProps(2)} />
                    <StyledTab label="Изменить номер телефона" {...a11yProps(3)} />
                    <StyledTab label="Адреса" {...a11yProps(4)} />
                    <StyledTab label="Мои отзывы о товарах" {...a11yProps(5)} />
                    <StyledTab label="Привязать карту" {...a11yProps(6)} />
                </StyledTabs>
                <TabPanel style={{width: "100%"}} value={value} index={0}>
                    <div style={{
                        textAlign: "left",
                        fontFamily: 'Ubuntu',
                        fontSize: '23px',
                        color: '#4F5D75'
                    }}>Учетаная запись
                    </div>
                    <div>
                        <div style={{marginTop: '1%', textAlign: "left"}}>
                        <span style={{fontFamily: 'Ubuntu', fontSize: '20px', color: '#4F5D75'}}>
                        Данные учетной записи
                        </span>
                        </div>
                        <Grid direction="column"
                              style={{marginTop: "2%", padding: "3%", border: '1px solid black', width: '90%'}}>
                            <Grid direction="row" container spacing={3}>
                                <Grid item xs={6}>Почта</Grid>
                                <Grid item xs={6}>{localStorage.getItem('email')}</Grid>
                            </Grid>
                            <Grid direction="row" container spacing={3}>
                                <Grid item xs={6}>Имя</Grid>
                                {change &&
                                <Grid item xs={6}>{localStorage.getItem('first_name')}</Grid>
                                }{
                                !change &&
                                <Grid item xs={6}>
                                    <div><TextField onChange={(e) => localStorage.setItem('first_name', e.target.value)}
                                                    size={"small"} id="outlined-basic" label="Имя"
                                                    defaultValue={localStorage.getItem('first_name')}
                                                    variant="outlined"/></div>
                                </Grid>
                            }
                            </Grid>
                            <Grid direction="row" container spacing={3}>
                                <Grid item xs={6}>Фамилия</Grid>
                                {change &&
                                <Grid item xs={6}>{localStorage.getItem('last_name')}</Grid>
                                }{
                                !change &&
                                <Grid item xs={6}>
                                    <div><TextField onChange={(e) => localStorage.setItem('last_name', e.target.value)}
                                                    size={"small"} id="outlined-basic" label="Фамилия"
                                                    defaultValue={localStorage.getItem('last_name')}
                                                    variant="outlined"/></div>
                                </Grid>
                            }
                            </Grid>
                            <Grid direction="row" container spacing={3}>
                                <Grid item xs={6}>Год рождения</Grid>
                                {change &&
                                <Grid item xs={6}>{localStorage.getItem('birth_day')}</Grid>
                                }
                                {!change &&
                                <Grid item xs={6}>
                                    <MaterialUIPickers/>
                                </Grid>
                                }
                            </Grid>
                            <Grid direction="row" container spacing={3}>
                                <Grid item xs={6}>Пол</Grid>
                                {change &&
                                <Grid item xs={6}>{localStorage.getItem('gender')}</Grid>
                                }
                                {!change &&
                                <Grid item xs={6}>
                                    <RadioButtonsGroup/>
                                </Grid>
                                }
                            </Grid>
                        </Grid>
                        <div className={classes.btnDiv}>
                            <StyledButton onClick={() => {
                                if (!localStorage.getItem('token')) {
                                    history.push('/login')
                                } else {
                                    setChange(false)
                                }
                            }} variant={"outlined"} color="secondary">Изменить данные</StyledButton>
                            <Button disabled={change ? true : false} onClick={() => {
                                if (!localStorage.getItem('token')) {
                                    history.push('/login')
                                } else {
                                    Axios.patch(path + '/auth/users/me/', {
                                        first_name: localStorage.getItem('first_name'),
                                        last_name: localStorage.getItem('last_name'),
                                        gender: localStorage.getItem('gender'),
                                        birth_day: localStorage.getItem('birth_day')
                                    }, {
                                        headers: {
                                            'Authorization': 'Baerer ' + localStorage.getItem('token')
                                        }
                                    }).then(res => {
                                        console.log(res)
                                    })
                                    setChange(true)
                                }
                            }
                            } variant={"outlined"} color={"primary"}>Сохранить</Button>
                        </div>
                    </div>
                </TabPanel>
                <TabPanel style={{width: "100%"}} value={value} index={1}>
                    Item Two
                </TabPanel>
                <TabPanel style={{width: "100%"}} value={value} index={2}>
                    Item Three
                </TabPanel>
                <TabPanel style={{width: "100%"}} value={value} index={3}>
                    Item Four
                </TabPanel>
                <TabPanel style={{width: "100%"}} value={value} index={4}>
                    Item Five
                </TabPanel>
                <TabPanel style={{width: "100%"}} value={value} index={5}>
                    Item Six
                </TabPanel>
                <TabPanel style={{width: "100%"}} value={value} index={6}>
                    Item Seven
                </TabPanel>
                <TabPanel style={{width: "100%"}} value={value} index={7}>
                    Item Eight
                </TabPanel>
            </div>
            }
            </div>
                )
};

export default User;