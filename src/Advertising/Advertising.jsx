import React from "react";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import back1 from '../images/NoPath.png'
import back2 from '../images/NoPath2.png'
import back3 from '../images/NoPath3.png'
import style from "./Advertising.module.css"


const Adversting = ()=>{
    const responsive = {
        desktop: {
            breakpoint: { max: 3000, min: 1024 },
            items: 1,
            slidesToSlide: 1, // optional, default to 1.
        },
        tablet: {
            breakpoint: { max: 1024, min: 464 },
            items: 1,
            slidesToSlide: 1, // optional, default to 1.
        },
        mobile: {
            breakpoint: { max: 464, min: 0 },
            items: 1,
            slidesToSlide: 1, // optional, default to 1.
        },
    };
    var carousel={
        padding:"100px"
    }
    return(
        <div>
            <Carousel
                style={carousel}
                swipeable={false}
                draggable={false}
                infinite={true}
                autoPlay={true}
                autoPlaySpeed={3000}
                keyBoardControl={true}
                transitionDuration={500}
                containerClass="carousel-container"
                itemClass="carousel-item-padding-40-px"
                removeArrowOnDeviceType={["tablet", "mobile"]}
                dotListClass="custom-dot-list-style"
                keyBoardControl={true}
                responsive={responsive}
            >
                <div style={{width:'100%',height:'400px'}}><img style={{width:'100%'}} src={back1}/></div>
                <div style={{width:'100%',height:'400px'}}><img style={{width:'100%'}} src={back2}/></div>
                <div style={{width:'100%',height:'400px'}}><img style={{width:'100%'}} src={back3}/></div>
            </Carousel>
        </div>
    )
}
export default Adversting;