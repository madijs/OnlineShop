import React, {Component, useEffect, useState} from 'react'
import { useHistory } from 'react-router-dom';
import { useParams} from "react-router";
import BreadCrumb from "./BreadCrumb";
import Axios from "axios";
import path from "../../settings";
import Gallery from "./Gallery";
import check from '../../images/check.png'
import {setProductDetailsActionCreator,setProductCategoryActionCreator} from "../../redux/productDetails-reducer";
import './PD.css';

import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import Container from "@material-ui/core/Container";
import Specification from "./Specification";
import index from "react-alice-carousel";
import {NavLink} from "react-router-dom";


function TabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
        <Typography
            component="div"
            role="tabpanel"
            hidden={value !== index}
            id={`nav-tabpanel-${index}`}
            aria-labelledby={`nav-tab-${index}`}
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
        id: `nav-tab-${index}`,
        'aria-controls': `nav-tabpanel-${index}`,
    };
}
function LinkTab(props) {
    return (
        <Tab
            component="a"
            onClick={event => {
                event.preventDefault();
            }}
            {...props}
        />
    );
}

const useStyles = makeStyles(theme => ({
    root: {
        flexGrow: 1,
    },
}));

export function NavTabs(props) {
    const classes = useStyles();
    const [value, setValue] = React.useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };
    let specification_elements="";
    try {
        specification_elements = props.specification.map((el,index)=>(
            <Specification
                key={index}
                value={el.value}
                parametr={el.parametr}
            />
        ))
    }catch (e) {
        specification_elements=""
        console.log(e)
    }
    var stil={
        display:'flex',
        flexDirection: 'column',
        width: '80%',
        marginLeft: 'auto',
        marginRight:'auto'
    }

    return (
        <div  className={classes.root}>
            <AppBar className="MuiAppBar-colorPrimary" position="static">
                <Tabs
                    className="MuiTabs-flexContainer"
                    centered={true}
                    variant="fullWidth"
                    value={value}
                    onChange={handleChange}
                    aria-label="nav tabs example"
                >
                    <LinkTab label="Описание" href="/drafts" {...a11yProps(0)} />
                    <LinkTab label="Характеристики" href="/trash" {...a11yProps(1)} />
                    <LinkTab label="Отзывы" href="/spam" {...a11yProps(2)} />
                </Tabs>
            </AppBar>
            <TabPanel value={value} index={0}>
                {props.description}
            </TabPanel>
            <TabPanel value={value} index={1}>
                <div style={stil}>
                {specification_elements}
                </div>
            </TabPanel>
            <TabPanel value={value} index={2}>
                Page Three
            </TabPanel>
        </div>
    );
}


export const ContinueOrNot=()=>{
    var style2={
        display: 'flex',
        justifyContent:'center',
    };
    const history = useHistory();
    let redirectToBasket=()=>{
        let path = '/basket';
        history.push(path)
    };
    return(
        <div>
            <div>Хотите перейти в корзину?</div>
            <div style={style2}>
                <div><button onClick={redirectToBasket}>Перейти</button></div>
                <div><button>Остаться</button></div>
            </div>
        </div>
    )
}



const ProductDetails=(props)=>{
    const media="http://178.62.252.32";
    const[state,setState]=useState({
        data: {
            images:[],
            specifications:[]
        },
    });
    const[kol_vo_el,setKolvo] = useState('');
    const[summa,setSumma] = useState('');
    const[quantity,setQuantity]=useState('');

    const[show,setShow]=useState(false);

    let {productSlug} = useParams();
    const history = useHistory();
    useEffect(()=>{
        Axios.get(path + "/product/" + productSlug).then(res => {
            console.log(res.data);
            props.setProductDetails(res.data);
            // props.dispatch(setProductDetailsActionCreator(res.data));
            let aState = state.data;
            aState.images = res.data.images;
            let temp = {};
            for(let i=0; i<aState.images.length; i++) {
                temp = {
                    "original":  media + aState.images[i].image,
                    "thumbnail": media + aState.images[i].image
                };
                aState.images[i] = temp;
            }
            console.log("velik");
            console.log(aState.images);
            aState.specifications=res.data.specifications;
            setState({
                data: aState
            });
            console.log(res.data);
            props.setProductCategory(res.data.category)
            // props.dispatch(setProductCategoryActionCreator(res.data.category))

        })
    },[]);
    let x = "";
    let y = "";
    try {
        x = props.productDetailsPage.categoryData.parent.title;
        y = props.productDetailsPage.categoryData.parent.parent.title
    } catch (e) {
        x = "";
        y="";
        console.log(e);
    }
    const images = state.data.images;


    let priceCalculate=(e)=>{
        if(e.target.value>0) {
            console.log(e.target.value);
            let kol_vo_box = e.target.value;
            if (kol_vo_box > props.productDetailsPage.productDetailsData.quantity) {
                prompt('Нету столько ты чего)')
            }
            let kol_vo_el = kol_vo_box * props.productDetailsPage.productDetailsData.box_quantity;
            let summa = kol_vo_el * props.productDetailsPage.productDetailsData.price;

            console.log('sdads');
            console.log(summa);
            setKolvo(kol_vo_el);

            summa=summa.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
            setSumma(summa);
            setQuantity(e.target.value)
        }
    };

    let data={
        'quantity':quantity,
        'products':props.productDetailsPage.productDetailsData.id,
    }

    let addToBasket=()=>{
        if (localStorage.getItem('token')) {
            if (quantity != 0) {
                Axios.post(path + '/cart/', data, {
                    headers: {
                        'Authorization': 'Token ' + localStorage.getItem('token')
                    }
                });
                console.log(data);
                setShow(true);
            } else {
                prompt("Пустое не добавляем")
            }
        }else{
            let path='/login';
            history.push(path)
        }
    };

    let blur={
        filter: 'blur(8px)',
        opacity:'0.5',
        webkitFilter:'blur(8px)'
    };
    let stil={
        display:'block'
    };
    let nonFilter={
        filter: 'none',
        webkitFilter: 'none'
    }

    return (
        <div>
            <div style={nonFilter}>
                {show ? <ContinueOrNot/> : null}
            </div>
        <div style={show? blur:stil}>

            <BreadCrumb breadCrumb1={props.productDetailsPage.categoryData.title} breadCrumb2={x} breadCrumb3={y} />
            <div className="row_wrapper">
                <Gallery images={images}/>
                <div className="item_descr">
                    <div className="title">
                        {props.productDetailsPage.productDetailsData.title}
                    </div>
                    <div className="item_code">
                        Код товара: <span className="item_code2">86236</span>
                    </div>
                    <div className="item_maked">
                        Производитель: Philips Company USA
                    </div>
                    <div className="price">
                        <div>
                            <span className="priceBox">Цена за коробку:</span>
                        </div>
                        <div className="oldPrice">
                            50 000 тг
                        </div>
                        <div className="newPrice">
                            {props.productDetailsPage.delimetrPrice} тг
                        </div>
                        <div className="discount">
                            Скидка: 20%
                        </div>
                    </div>
                    <div className="kolvo">
                        <span>Кол-во в коробке: {props.productDetailsPage.productDetailsData.box_quantity}</span>
                    </div>
                    <div className="kolvo">
                        <span>Кол-во коробок: {props.productDetailsPage.productDetailsData.quantity}</span>
                    </div>
                    <div className="exist">
                       <div><img className="logocheck" src={check}/></div>
                        <div className="vnal"><span>В наличии!</span></div>
                    </div>

                    <div className="calcTextdiv">
                        <div><label className="calcText">Кол-во коробок:</label></div>
                        <div><label className="calcText2">Всего:</label></div>
                        <div><label className="calcText3">Сумма:</label></div>
                    </div>

                    <div className="calculator">
                        <div>
                            <input className="input_number" key={3} onChange={priceCalculate} type="number"/>
                        </div>
                        <div className="equal">
                            <span>=</span>
                        </div>
                        <div>
                            <input className="input_number" key={1} defaultValue={kol_vo_el} type="number"/>
                        </div>
                        <div className="equal">
                            <span>=</span>
                        </div>
                        <div>
                            <input className="input_number" key={2} defaultValue={summa} type="text"/>
                        </div>
                    </div>
                    <div>
                        <button onClick={addToBasket} className="vkorzinu"><span className="vkorzinutext">в Корзину</span></button>
                    </div>
                </div>
            </div>
            <NavTabs specification={props.productDetailsPage.productDetailsData.specification} description={props.productDetailsPage.productDetailsData.description}/>
        </div>
        </div>
    )
 };

export default ProductDetails;