import React, {useState} from 'react'
import {NavLink} from "react-router-dom";
import Badge from '@material-ui/core/Badge';
import { useHistory } from 'react-router-dom';
import { withStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import path from "../settings";
import Axios from "axios";
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import { fade, makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import InputBase from '@material-ui/core/InputBase';
import MenuIcon from '@material-ui/icons/Menu';
import SearchIcon from '@material-ui/icons/Search';
import AccountCircle from '@material-ui/icons/AccountCircle';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import MoreIcon from '@material-ui/icons/MoreVert';
import VerticalTabs from "./VerticalTabs";

const useStyles = makeStyles((theme) => ({
    grow: {
        flexGrow: 1,
    },
    menuButton: {
        marginLeft: theme.spacing(2),
        color:'#00AEC8'
    },
    title: {
        display: 'none',
        fontFamily:'Ubuntu',
        color:'#00AEC8',
        fontWeight:'lighter',
        [theme.breakpoints.up('sm')]: {
            display: 'block',
        },
    },
    search: {
        position: 'relative',
        borderRadius: theme.shape.borderRadius,
        backgroundColor: fade(theme.palette.common.white, 0.15),
        '&:hover': {
            backgroundColor: fade(theme.palette.common.white, 0.25),
        },
        marginRight: theme.spacing(2),
        marginLeft: 0,
        width: '100%',
        [theme.breakpoints.up('sm')]: {
            marginLeft: theme.spacing(3),
            width: 'auto',
        },
    },
    searchIcon: {
        padding: theme.spacing(0, 2),
        height: '100%',
        position: 'absolute',
        pointerEvents: 'none',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    inputRoot: {
        color: 'inherit',
    },
    inputInput: {
        padding: theme.spacing(1, 1, 1, 0),
        // vertical padding + font size from searchIcon
        paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
        transition: theme.transitions.create('width'),
        width: '100%',
        [theme.breakpoints.up('md')]: {
            width: '20ch',
        },
    },
    sectionDesktop: {
        display: 'none',
        [theme.breakpoints.up('md')]: {
            display: 'flex',
        },
    },
    sectionMobile: {
        display: 'flex',
        [theme.breakpoints.up('md')]: {
            display: 'none',
        },
    },
}));

const StyledMenu = withStyles({
    list:{
        display: 'grid',
    }
})(Menu)


function PrimarySearchAppBar(props) {
    const[token,setToken]=useState('');
   // const[visible,setVisible] = useState(false)
    const history = useHistory();
    console.log(props.cnt)
    const classes = useStyles();
    const [anchorEl, setAnchorEl] = React.useState(null);
    const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);

    const isMenuOpen = Boolean(anchorEl);
    const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

    const handleProfileMenuOpen = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleMobileMenuClose = () => {
        setMobileMoreAnchorEl(null);
    };

    const handleMenuClose = (e) => {
        console.log(e.target.value)
        setAnchorEl(null);
        handleMobileMenuClose();
    };

    const handleMobileMenuOpen = (event) => {
        setMobileMoreAnchorEl(event.currentTarget);
    };

    const menuId = 'primary-search-account-menu';
    const renderMenu = (
        <div>
            {localStorage.getItem('token') &&
            <StyledMenu
                anchorEl={anchorEl}
                anchorOrigin={{vertical: 'top', horizontal: 'right'}}
                id={menuId}
                keepMounted
                transformOrigin={{vertical: 'top', horizontal: 'right'}}
                open={isMenuOpen}
                onClose={handleMenuClose}
            >
                <NavLink style={{textDecoration:'none'}}  to={'/userDetails'}><MenuItem style={{color:'#00AEC8'}}  onClick={handleMenuClose}>Личный кабинет</MenuItem></NavLink>
                <MenuItem style={{color:'#00AEC8'}}  onClick={handleMenuClose}>Мои заказы</MenuItem>
                <MenuItem style={{color:'#00AEC8'}} onClick={() => {
                    Axios.post(path + '/auth/logout', {}, {
                        headers: {
                            Authorization: 'Baerer ' + localStorage.getItem('token')
                        }
                    });
                    localStorage.clear();
                    setAnchorEl(null);
                    handleMobileMenuClose();
                }}>Выход</MenuItem>
            </StyledMenu>
            }
            {!localStorage.getItem('token') &&
            <StyledMenu
                anchorEl={anchorEl}
                anchorOrigin={{vertical: 'top', horizontal: 'right'}}
                id={menuId}
                keepMounted
                transformOrigin={{vertical: 'top', horizontal: 'right'}}
                open={isMenuOpen}
                onClose={handleMenuClose}
            >
                <NavLink to={'/login'}><MenuItem style={{color:'#00AEC8'}} onClick={handleMenuClose}>Войти</MenuItem></NavLink>
                <NavLink to={'/register'}><MenuItem style={{color:'#00AEC8'}}  onClick={handleMenuClose}>Регистрация</MenuItem></NavLink>
            </StyledMenu>
            }
        </div>
    );

    const mobileMenuId = 'primary-search-account-menu-mobile';
    const renderMobileMenu = (
        <Menu
            anchorEl={mobileMoreAnchorEl}
            style={{color:"#000 !important"}}
            anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
            id={mobileMenuId}
            keepMounted
            transformOrigin={{ vertical: 'top', horizontal: 'right' }}
            open={isMobileMenuOpen}
            onClose={handleMobileMenuClose}
        >
            {/*<MenuItem>*/}
            {/*    <IconButton aria-label="show 4 new mails" color="inherit">*/}
            {/*        <Badge badgeContent={4} color="secondary">*/}
            {/*            <MailIcon />*/}
            {/*        </Badge>*/}
            {/*    </IconButton>*/}
            {/*    <p>Messages</p>*/}
            {/*</MenuItem>*/}
            <MenuItem>
                <IconButton aria-label="show 11 new notifications" color="inherit">
                    <Badge badgeContent={11} color="secondary">
                        <ShoppingCartIcon/>
                    </Badge>
                </IconButton>
                <p>Корзина</p>
            </MenuItem>

            <MenuItem onClick={handleProfileMenuOpen}>
                <IconButton
                    aria-label="account of current user"
                    aria-controls="primary-search-account-menu"
                    aria-haspopup="true"
                    color="inherit"
                >
                    <AccountCircle />
                </IconButton>
                <p>Личный кабинет</p>
            </MenuItem>
        </Menu>
    );

    return (
        <div className={classes.grow}>
            <AppBar style={{backgroundColor:"#fff"}} position="static">
                <Toolbar>
                    <IconButton
                        edge="start"
                        className={classes.menuButton}
                        color="inherit"
                        aria-label="open drawer"
                        onClick={()=>props.setVisible(!props.visible)}
                    >
                        <MenuIcon />
                    </IconButton>
                    <Typography style={{cursor:"pointer"}} onClick={()=>{
                        history.push('/')
                    }} className={classes.title} variant="h6" noWrap>
                        Каталог
                    </Typography>
                    <div style={{
                        borderLeft:"1px solid #ccc",
                        height:'60px',
                        marginRight:'10px',
                        marginLeft:'10px'
                    }}></div>
                    <Typography style={{cursor:"pointer"}} onClick={()=>{
                        history.push('/')
                    }} className={classes.title} variant="h6" noWrap>
                        Optovichok
                    </Typography>
                    <div style={{border:'1px solid #00AEC8'}} className={classes.search}>
                        <div style={{color:'#00AEC8'}} className={classes.searchIcon}>
                            <SearchIcon />
                        </div>
                        <InputBase
                            style={{color:'#00AEC8'}}
                            onChange={(e)=>{
                                console.log(e.target.value)
                            }}
                            placeholder="Search…"
                            classes={{
                                root: classes.inputRoot,
                                input: classes.inputInput,
                            }}
                            inputProps={{ 'aria-label': 'search' }}
                        />
                    </div>
                    <div className={classes.grow} />
                    <div className={classes.sectionDesktop}>
                        {/*<IconButton aria-label="show 4 new mails" color="inherit">*/}
                        {/*    <Badge badgeContent={4} color="secondary">*/}
                        {/*        <MailIcon />*/}
                        {/*    </Badge>*/}
                        {/*</IconButton>*/}
                        <IconButton onClick={()=>history.push('/basket')} aria-label="show 17 new notifications" color="inherit">
                            <Badge style={{color:'#00AEC8'}} badgeContent={localStorage.getItem('count')} color="secondary">
                                <ShoppingCartIcon />
                            </Badge>
                        </IconButton>
                        <IconButton
                            style={{color:'#00AEC8'}}
                            edge="end"
                            aria-label="account of current user"
                            aria-controls={menuId}
                            aria-haspopup="true"
                            onClick={handleProfileMenuOpen}
                            color="inherit"
                        >
                            <AccountCircle />
                        </IconButton>
                    </div>
                    <div className={classes.sectionMobile}>
                        <IconButton
                            aria-label="show more"
                            aria-controls={mobileMenuId}
                            aria-haspopup="true"
                            onClick={handleMobileMenuOpen}
                            color="inherit"
                        >
                            <MoreIcon />
                        </IconButton>
                    </div>
                </Toolbar>
            </AppBar>
            {renderMobileMenu}
            {renderMenu}
            <div style={{display:props.visible? "block":"none"}}>
                <VerticalTabs
                    state={props.mainPage}
                    setValue={props.setValue}
                    //////////////////
                    //////////////////////////////////////////////
                    categoriesData={props.mainPage.categoriesData}
                    productsData={props.mainPage.productsData}
                    currentSubCategory={props.mainPage.currentSubCategory}
                    ////////////////setters//////////////////
                    addProductsData={props.addProductsData}
                    addCategoriesData={props.addCategoriesData}
                    setCurrentSubCategoryData={props.setCurrentSubCategoryData}
                    setSubCategoriesData={props.setSubCategoriesData}
                    //////////////////
                    compareSlugFunction={props.compareSlugFunction}
                    setCurrentSubCategory={props.setCurrentSubCategory}
                />
            </div>
        </div>
    );
}

export default PrimarySearchAppBar
// export default Header