import React from "react";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import style from './ProductsList.module.css'
import Product from "./Product";
import { useHistory } from 'react-router-dom';
import media from "../media";

const ProductsList = (props)=>{
    const history = useHistory();
    var style2={
    backgroundColor: '#ccc',
    color: '#00D1FF',
    height: '2px',
        width:'86%'
    };


    var carousel={
        padding:"100px"
    }




    const responsive = {
        desktop: {
            breakpoint: { max: 3000, min: 1024 },
            items: 4,
            slidesToSlide: 4, // optional, default to 1.
        },
        tablet: {
            breakpoint: { max: 1024, min: 464 },
            items: 2,
            slidesToSlide: 2, // optional, default to 1.
        },
        mobile: {
            breakpoint: { max: 464, min: 0 },
            items: 1,
            slidesToSlide: 1, // optional, default to 1.
        },
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
    let goTolist=()=>{
        let path = 'list'
        history.push(path)
    }

    return(
        <div>
            <div className={style.text1div}>
                <span className={style.text1}>Популярные Товары</span>
                <span onClick={goTolist} className={style.text2}>Смотреть все</span>
                <div className={style.pagination}>
                </div>
            </div>
            <div>
            <hr style={style2}>
            </hr>
                <div className={style.productsList}>
                    <Carousel
                        style={carousel}
                        swipeable={false}
                        draggable={false}
                        keyBoardControl={true}
                        transitionDuration={500}
                        containerClass="carousel-container"
                        itemClass="carousel-item-padding-40-px"
                        removeArrowOnDeviceType={["tablet", "mobile"]}
                        dotListClass="custom-dot-list-style"
                        keyBoardControl={true}
                        responsive={responsive}
                    >
                    {products_elements}
                    </Carousel>
                </div>
            </div>
        </div>
    )
};

export default ProductsList;