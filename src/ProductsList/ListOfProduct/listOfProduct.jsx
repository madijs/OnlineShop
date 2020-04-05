import React, {useEffect} from "react";
import Axios from "axios";
import path from "../../settings";
import Item from "./Item";
import style from "./listOfProduct.module.css"
import RangeSlider from "./Slider";
import { useParams} from "react-router";
import media from "../../media";


const ListOfProduct = (props)=>{
    console.log(props.listProductsPage.productsData)
    let {categorySlug} = useParams();
    useEffect(()=>{
        console.log(categorySlug)
        Axios.get(path+'/product/?category='+categorySlug).then(res=>{
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
                <div><button>Сортировать по цене</button></div>
                </div>
            <div className={style.container2}>
            {el}
            </div>

        </div>
    )
}
export default ListOfProduct;