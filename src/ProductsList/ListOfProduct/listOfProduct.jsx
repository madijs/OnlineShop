import React, {useEffect} from "react";
import Axios from "axios";
import path from "../../settings";
import Item from "./Item";
import style from "./listOfProduct.module.css"
import RangeSlider from "./Slider";
import { useParams} from "react-router";
import media from "../../media";
import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import NativeSelect from '@material-ui/core/NativeSelect';

const useStyles = makeStyles((theme) => ({
    formControl: {
        margin: theme.spacing(1),
        minWidth: 200,
    },
    selectEmpty: {
        marginTop: theme.spacing(2),
    },
}));
const ListOfProduct = (props)=>{
    console.log(props.listProductsPage.productsData);
    const classes = useStyles();
    const [state, setState] = React.useState({
        sort: '',
        name: 'hai',
    });
    let {categorySlug} = useParams();
    useEffect(()=>{
        console.log(categorySlug)
        Axios.get(path+'/product/?category='+categorySlug+"&ordering=title").then(res=>{
            props.addListOfProduct(res.data);
        })
        console.log(props.listProductsPage.allProductsData);
    },[categorySlug]);
        let el = props.listProductsPage.productsData.map((el, index) => (
            <Item
                key={index}
                dispatch={props.dispatch}
                title={el.title}
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
                console.log(event.target.value)
                Axios.get(path + "/product/?category=" + categorySlug + "&ordering=" + event.target.value).then(res => {
                    console.log(res.data)
                    props.setCurrentProducts(res.data)
                })
            }
        const sort = event.target.name;
        console.log(sort)
        setState({
            ...state,
            [sort]: event.target.value,
        });
    };

    return(
        <div className={style.container}>
            <div className={style.container1}>
                <div>Подбор параметров</div>
                <div className={style.pricefilter}>
                <div>
                    {props.listProductsPage.allProductsData.minPrice}
                </div>
                <div>
                    <RangeSlider
                    maxPrice={props.listProductsPage.allProductsData.maxPrice}
                    minPrice={props.listProductsPage.allProductsData.minPrice}
                    setPriceFilter={props.setPriceFilter}
                /></div>
                <div>{props.listProductsPage.allProductsData.maxPrice}</div>
                </div>
                <div><button onClick={searchFilter}>Поиск</button></div>
                <div>
                    <FormControl variant="filled" className={classes.formControl}>
                        <InputLabel htmlFor="filled-age-native-simple">Сортировать</InputLabel>
                        <Select
                            style={{backgroundColor:"white"}}
                            native
                            value={state.age}
                            onChange={handleChange}
                            inputProps={{
                                sort: 'sort',
                                id: 'filled-age-native-simple',
                            }}
                        >
                            <option value={"title"}>по алфавиту от А до Я</option>
                            <option value={"likes"}>по популярности</option>
                            <option value={"price"}>по возрастанию цены</option>
                            <option value={"-price"}>по убыванию цены</option>
                            <option value={"-created"}>по самые новые</option>
                            <option value={"created"}>по самые старые</option>
                        </Select>
                    </FormControl>
                </div>
                </div>
            <div className={style.container2}>
            {el}
            </div>

        </div>
    )
}
export default ListOfProduct;