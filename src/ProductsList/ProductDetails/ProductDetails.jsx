import React, { useEffect, useState} from 'react'
import { useHistory } from 'react-router-dom';
import { useParams} from "react-router";
import Fab from '@material-ui/core/Fab';
import EditIcon from '@material-ui/icons/Edit';
import BreadCrumb from "./BreadCrumb";
import Axios from "axios";
import path from "../../settings";
import Gallery from "./Gallery";
import './PD.css';
import PropTypes from 'prop-types';
import {makeStyles, withStyles} from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import Specification from "./Specification";
import Snackbar from '@material-ui/core/Snackbar';
import media from "../../media";
import notfound from "../../images/izo.png"
import Menu from "@material-ui/core/Menu";


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

const StyledTab = withStyles({
    selected:{
        backgroundColor:"#00AEC8 !important",
        color:"#fff"
    },
    root:{
        fontWeight:"bold",
        backgroundColor:"#b1e0e8"
    }
})(Tab);

function LinkTab(props) {
    return (
        <StyledTab
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
        marginLeft:"8%",
        marginRight: "8%",
        backgroundColor: "#fff",
        marginBottom:"5%",
        height:"auto",
    },
}));

export function NavTabs(props) {
    const classes = useStyles();
    let history = useHistory();
    let {productSlug} = useParams();
    const [value, setValue] = React.useState(0);
    const[show2,setShow2] = useState(false);
    const [commentsData,setComments]=useState([]);
    const handleChange = (event, newValue) => {
        setValue(newValue);
    };
    let specification_elements="";
    try {
        specification_elements = props.specification.map((el,index)=>(
            <Specification
                key={index}
                value={el.value}
                parameter={el.parameter}
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
    };
    let nonFilter={
        filter: 'none',
        webkitFilter: 'none',
        width:"100%",
    };
    const CommentsEditor=()=>{
        const[comment,setComment]=useState('');
        let commentBody=(e)=>{
            setComment(e.target.value);
        };
        let postComment=()=>{
            var data = {
                'body':comment
            };
            let fakedata={
                'user':localStorage.getItem('email'),
                'body':comment
            }

            console.log(localStorage.getItem('token'))
            Axios.post(path+"/product/comment/?product="+productSlug,data,{headers:{
                    'Authorization':'Bearer ' + localStorage.getItem('token')
                }}).then(res=>{
                    console.log(res.data)
                    commentsData.push(fakedata)
                setShow2(false)
            }).catch((err)=>{
                alert("Вы не авторизованы!");
                history.push('/login');
                console.log(err.response)
            })
        };
        return(
            <React.Fragment>
                <textarea onChange={commentBody} className="textarea" id="subject" name="subject" placeholder="Введите что нибудь..." style={{height:"200px"}}></textarea>
                <div className="comment_but_divs">
                    <div className="comment_but_div2">
                        <button onClick={()=>setShow2(false)} className="comment_but2">Назад</button>
                    </div>
                    <div className="comment_but_div1">
                        <button onClick={postComment} className="comment_but1">Отправить</button>
                    </div>
                </div>
            </React.Fragment>
        )
    };
    const getComments=()=>{
            Axios.get(path+"/product/comments/?product="+productSlug).then(res=>{
                console.log("HELLLLLO")
                setComments(res.data);
                console.log(res.data)
            })
    }

    return (
        <div className={classes.root}>
            <AppBar className="MuiAppBar-colorPrimary" position="static">
                <Tabs
                    className="MuiTabs-flexContainer"
                    variant="fullWidth"
                    value={value}
                    onChange={handleChange}
                    indicatorColor={"transparent"}
                    aria-label="nav tabs example"
                >
                    <LinkTab style={{backgroundColor:"#b1e0e8",color:""}} label="Описание" href="/drafts" {...a11yProps(0)} />
                    <LinkTab style={{backgroundColor:"#b1e0e8"}} label="Характеристики" href="/trash" {...a11yProps(1)} />
                    <LinkTab style={{backgroundColor:"#b1e0e8"}} onClick={getComments} label="Отзывы" {...a11yProps(2)} />
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
            <TabPanel style={{backgroundColor:"#EBEBEB",overflow:"scroll",height:"400px",position:"relative"}} value={value} index={2}>

                <div style={nonFilter}>
                    {show2 ? <CommentsEditor/> : null }
                </div>
                { !show2 &&
                    <div>
                        <div className="comment_write_div">
                            <Fab onClick={() => setShow2(true)} className="comment_write_but" color="secondary" aria-label="edit">
                                <EditIcon/>
                            </Fab>
                        </div>
                        {commentsData.map(el=>(
                            <div style={{marginBottom: "3%"}}>
                                <div className="comment_div">
                                     <div className="comment_email">{el.user}</div>
                                     <div className="comment_body">
                                         {el.body}
                                     </div>
                            </div>
                                {el.answer &&
                                    <div className="admin_commit">
                                        <div className="admin_title">Optovichok</div>
                                        <div className="admin_commits_body">{el.answer}</div>
                                    </div>
                                }
                            </div>
                        ))}

                    </div>
                }
            </TabPanel>
        </div>
    );
}


export const ContinueOrNot=()=>{
    var style2={
        display: 'flex',
        justifyContent:'center',
    };
    var style1={
        width:"100%",
        height: "100%",
        boxShadow:"1px 6px 14px 1px",
        paddingTop:"30%"
    }
    const history = useHistory();
    let {productSlug} = useParams();
    let redirectToBasket=()=>{
        console.log("sss")
        window.location.href='/basket'
    };
    let notRedirect=()=> {
        let path = '/product/' + `${productSlug}`;
        window.location.href=path;
    }
    return(
        <div style={style1}>
            <div>Хотите перейти в корзину?</div>
            <div style={style2}>
                <div><button onClick={redirectToBasket}>Перейти</button></div>
                <div><button onClick={notRedirect}>Остаться</button></div>
            </div>
        </div>
    )
}



const ProductDetails=(props)=>{
    const[status,setStatus] = useState(false);
    const [state2, setState2] = React.useState({
        open: false,
        vertical: 'top',
        horizontal: 'center',
    });
    const { vertical, horizontal, open } = state2;

    const handleClick = newState => () => {
        setState2({ open: true, ...newState });
    };

    const handleClose = () => {
        setState2({ ...state2, open: false });
    };
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


    const[skidka,setSkidka]=useState(0);

    let {productSlug} = useParams();
    const history = useHistory();

    useEffect(()=>{
        Axios.get(path + "/product/" + productSlug).then(res => {
            console.log(res.data);
            setStatus(false)
            props.setProductDetails(res.data);
            if(res.data.old_price!=null) {
                let temp2 = (res.data.old_price - res.data.price);
                console.log(temp2)
                let skidka = Math.round(temp2 * 100 / res.data.old_price);
                console.log(skidka)
                setSkidka(skidka)
            }else{
                setSkidka(0)
            }
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
        }).catch((err) => {
            console.log(err.response)
            if(err.response.status===404){
                setStatus(true)
            }
        });
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
                alert('Нету столько ты чего)')
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
    };

    let addToBasket=newState=>()=>{
        if (localStorage.getItem('token')) {
            if (quantity != 0) {
                Axios.post(path + '/cart/', data, {
                    headers: {
                        'Authorization': 'Bearer ' + localStorage.getItem('token')
                    }
                }).then(res=>{
                    Axios.get(path+'/cart/count/',{
                        headers: {
                            'Authorization': 'Bearer ' + localStorage.getItem('token')
                        }
                    }).then(res=>{
                        props.setCartCount(res.data.count)
                        localStorage.setItem('count',res.data.count)
                    });
                    setState2({ open: true, ...newState });
                });

                console.log(data);
                setShow(true);
            } else {
                alert("Пустое не добавляем")
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
        webkitFilter: 'none',
        position:'absolute',
        marginTop:'15%',
        marginLeft: '40%',
        width: "20%",
        height:"20%",
        zIndex:1,
    };

    return (
        <div>
        {!status &&
    <div>
        <div style={nonFilter}>
            {show ? <ContinueOrNot/> : null}
        </div>
        <div style={show ? blur : stil}>
            {/*<BreadCrumb breadCrumb1={props.productDetailsPage.categoryData.title} breadCrumb2={x} breadCrumb3={y}/>*/}
            <div className="row_wrapper">
                <div className="title">
                    {props.productDetailsPage.productDetailsData.title}
                </div>
                <div style={{borderTop:"1px solid #ccc"}}>
                    <div className="item_code">
                        Код товара: <span className="item_code2">86236</span>
                    </div>
                    <div style={{display:"flex"}}>
                <Gallery images={images}/>
                <div className="item_descr">
                    <div className="item_maked">
                        <div className="kolvoText">Производитель:</div>
                        <div className="makedFrom">Philips Company USA</div>

                    </div>
                    <div className="price">
                        <div>
                            <span className="priceBox">Цена за ед. :</span>
                        </div>
                        <div className="newPrice">
                            {props.productDetailsPage.delimetrPrice}₸
                        </div>
                        <div className="oldPrice">
                            {props.productDetailsPage.productDetailsData.old_price}₸
                        </div>
                    </div>
                    <div className="kolvo">
                        <div className="kolvoText">Количество в коробке:</div>
                        <div className="kolvoValue">{props.productDetailsPage.productDetailsData.box_quantity}</div>
                    </div>
                    <div className="kolvo">
                        <div className="kolvoText">Общее количество коробок:</div>
                        <div className="kolvoValue">{props.productDetailsPage.productDetailsData.quantity}</div>
                    </div>

                    <div className="exist">
                        <div className="vnal"><span>В наличии!</span></div>
                    </div>

                    <div className="calcTextdiv">
                        <div><label className="calcText">Кол-во коробок:</label></div>
                        <div></div>
                        <div><label className="calcText2">Всего:</label></div>
                        <div></div>
                        <div><label className="calcText3">Сумма:</label></div>
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
                        <button onClick={addToBasket({vertical: 'top', horizontal: 'right'})} className="vkorzinu"><span
                            className="vkorzinutext">Добавить в корзину</span></button>
                    </div>
                </div>
                </div>
                </div>
            </div>
            <NavTabs specification={props.productDetailsPage.productDetailsData.specification}
                     description={props.productDetailsPage.productDetailsData.description}
            />
        </div>
        <Snackbar
            anchorOrigin={{vertical, horizontal}}
            key={`${vertical},${horizontal}`}
            open={open}
            onClose={handleClose}
            message="Сделано!=)"
        />
    </div>
}{status &&
            <div>
                <img src={notfound}/>к
            </div>
    }
        </div>
    )
 };


export default ProductDetails;