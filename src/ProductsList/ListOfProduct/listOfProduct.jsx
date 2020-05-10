import React, {useEffect,Fragment} from "react";
import {useHistory, Link, NavLink} from 'react-router-dom';
import prev_but from "../../images/prev_but.png"
import next_but from "../../images/next_but.png"
import Axios from "axios";
import path from "../../settings";
import Item from "./Item";
import style from "./listOfProduct.module.css"
import RangeSlider from "./Slider";
import { useParams} from "react-router";
import media from "../../media";
import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Pagination from './Pagination'

const useStyles = makeStyles((theme) => ({
    formControl: {
        margin: theme.spacing(1),
        width:"100%",
        padding:0
    },
    selectEmpty: {
        marginTop: theme.spacing(2),
    },
    select:{
        backgroundColor:"#fff",
        width:"70%",
        marginLeft:"auto",
        marginRight:"auto",
        height:"30px",
        fontFamily:"Roboto,san-serif",
        '&:focus': {
            backgroundColor:"#000"
        },
    }
}));
const ListOfProduct = (props)=>{
    console.log(props.listProductsPage.productsData);
    const classes = useStyles();
    const [state, setState] = React.useState({
        sort: '',
        name: 'hai',
    });
    const[order,setOrder] = React.useState('title');
    let {categorySlug,ordering} = useParams();
    const history = useHistory();
    useEffect(()=>{
        console.log(categorySlug)
        Axios.get(path+'/product/?category='+categorySlug+
            `&ordering=`+ordering+`&page=${props.listProductsPage.currentPage}&page_size=${props.listProductsPage.pageSize}`).then(res=>{
            console.log(res.data)
            props.addListOfProduct(res.data);
        });
        console.log(props.listProductsPage.allProductsData);
    },[categorySlug]);
        let el = props.listProductsPage.productsData.map((el, index) => (
            <Item
                key={index}
                dispatch={props.dispatch}
                title={el.title.substring(0, 33) + "..."}
                slug={el.slug}
                price={el.price}
                images={media + el.image}
                category={el.category}
            />
        ));
        let searchFilter=(e)=>{
            console.log(categorySlug)
            Axios.get(path+'/product/?category='+categorySlug, {params:{
                max_price:props.listProductsPage.maxPrice,
                min_price:props.listProductsPage.minPrice
            }}).then(res=>{
                console.log(res.data)
                props.setCurrentProducts(res.data)
            })
        }
    const handleChange = (event) => {
            if(event.target.value!="") {
                console.log(event.target.value);
                var p = event.target.value
                Axios.get(path + "/product/?category=" + categorySlug + "&ordering=" + event.target.value).then(res => {
                    console.log(res.data);
                    var searchParams = new URLSearchParams(window.location.search);
                    searchParams.set("ordering", "-created");
                    console.log(props.match);
                    // props.match.params+='&ordering=-created';
                    // console.log(history.location)
                    history.push('/products/'+props.match.params.categorySlug+'/'+p);
                    // console.log(history.location)
                    setOrder(p);
                    props.setCurrentProducts(res.data)
                })
            }
        const sort = event.target.name;
        console.log(sort);
        setState({
            ...state,
            [sort]: event.target.value,
        });
    };
    const changeCurrentPage=(pageNumber)=>{
        props.setCurrentPage(pageNumber);
        Axios.get(path+'/product/?category='+categorySlug+
            `&ordering=`+ordering+`&page=${pageNumber}&page_size=${props.listProductsPage.pageSize}`).then(res=>{
            console.log(res.data);
            props.addListOfProduct(res.data);
        })
    };
    const next_page=()=>{
        Axios.get(props.listProductsPage.next).then(res=>{
            props.addListOfProduct(res.data);
            let p = props.listProductsPage.currentPage;
            p+=1;
            props.setCurrentPage(p)
        })
    };

    const previous_page=()=>{
        Axios.get(props.listProductsPage.prev).then(res=>{
            props.addListOfProduct(res.data);
            let p = props.listProductsPage.currentPage;
            p-=1;
            props.setCurrentPage(p)
        })
    }


    return(
        <React.Fragment>
            <div className={style.pagintar_div}>
                <div className={props.listProductsPage.prev===null ? style.notActiv : style.active_but}
                     onClick={previous_page}
                >pr</div>
                {props.listProductsPage.pageArray.map(p=>(
                    <div className={props.listProductsPage.currentPage===p && style.selectedPage} onClick={()=>{
                        changeCurrentPage(p)
                    }} >{p}</div>
                ))}
                <div className={props.listProductsPage.next===null ? style.notActiv : style.active_but}
                     onClick={next_page}
                >ne</div>
            </div>
        <div className={style.container}>
            <div></div>
            <div className={style.container1}>
                <div className={style.filter}>
                    <div className={style.text}>Соортировать по</div>
                    <FormControl variant="outlined" className={classes.formControl}>
                        <Select
                            className={classes.select}
                            native
                            value={state.age}
                            onChange={handleChange}
                            inputProps={{
                                sort: 'sort',
                                id: 'filled-age-native-simple',
                            }}
                        >
                            <option value={"title"}>алфавиту</option>
                            <option value={"likes"}>популярности</option>
                            <option value={"price"}>возрастанию цены</option>
                            <option value={"-price"}>убыванию цены</option>
                            <option value={"-created"}>самые новые</option>
                            <option value={"created"}>самые старые</option>
                        </Select>
                    </FormControl>
                    <div className={style.text2}>Цена</div>
                    <div style={{marginTop:"5%"}} className={style.pricefilter}>
                        <div>
                            <RangeSlider
                                maxPrice={props.listProductsPage.allProductsData.maxPrice}
                                minPrice={props.listProductsPage.allProductsData.minPrice}
                                setPriceFilter={props.setPriceFilter}
                                setMinPrice={props.setMinPrice}
                                setMaxPrice={props.setMaxPrice}
                            />
                        </div>
                        {/*<div>*/}
                        {/*    {props.listProductsPage.allProductsData.minPrice}*/}
                        {/*</div>*/}
                        {/*<div>{props.listProductsPage.allProductsData.maxPrice}</div>*/}
                    </div>
                    <div><button onClick={searchFilter}>Применить</button></div>
                </div>
            </div>
            <div className={style.container2}>
            {el}
                <div style={{border:"1px solid dimgrey"}}></div>
                <div style={{border:"1px solid dimgrey"}}></div>
                <div style={{border:"1px solid dimgrey"}}></div>
                <div style={{border:"1px solid dimgrey"}}></div>

            </div>
            <div></div>
        </div>
        </React.Fragment>
    )
}
export default ListOfProduct;