import React from "react";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import style from './ProductsList.module.css'
import Slider from "react-slick";
import Product from "./Product";
import { useHistory } from 'react-router-dom';
import media from "../media";
function SampleNextArrow(props) {
    const { className, style, onClick } = props;
    return (
        <div
            className={className}
            style={{ ...style, display: "block", background: "transparent",border:"1px solid #00AEC8",color:"#00AEC8" }}
            onClick={onClick}
        />
    );
}
function SamplePrevArrow(props) {
    const { className, style, onClick } = props;
    return (
        <div
            className={className}
            style={{ ...style, display: "block",background: "transparent",border:"1px solid #00AEC8",color:"#00AEC8" }}
            onClick={onClick}
        />
    );
}
const ProductsList = (props)=>{

    var settings = {
        infinite: false,
        slidesToShow: 5,
        slidesToScroll: 5,
        speed: 500,
        cssEase: "linear",
        initialSlide: 0,
        nextArrow:<SampleNextArrow />,
        prevArrow: <SamplePrevArrow />,
        responsive: [
            {
                breakpoint: 1300,
                settings: {
                    slidesToShow: 4,
                    slidesToScroll: 4,
                    initialSlide: 4
                }
            },
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 3,
                    infinite: false,
                    dots: false
                }
            },
            {
                breakpoint: 600,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 2,
                    initialSlide: 2
                }
            },
            {
                breakpoint: 480,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1
                }
            }
        ]
    };
    console.log(props.productsData);
    let products_elements = props.productsData.map((el,index)=>(
        <Product
            key={index}
            dispatch={props.dispatch}
            title={el.title}
            slug={el.slug}
            price={el.price}
            images= {media + el.image}
            category={el.category}
        />
    ));
    return(
        <div style={{marginTop:'2%',marginLeft:"12.2%",marginRight:"12.2%"}}>
            <div className={style.text1div}>Популярные товары</div>
            <Slider style={{paddingRight:'2px'}} {...settings}>
                  {products_elements}
            </Slider>
        </div>
    )
};

export default ProductsList;