import React from "react";
import Carousel from "react-multi-carousel";
import Slider from "react-slick";
import "react-multi-carousel/lib/styles.css";
import back1 from '../images/NoPath.png'
import back2 from '../images/NoPath2.png'
import back3 from '../images/NoPath3.png'
import style from "./Advertising.module.css"

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
const Adversting = ()=>{
    var settings = {
        dots: false,
        infinite: true,
        autoplay:true,
        autoPlaySpeed:2000,
        speed: 2000,
        slidesToShow: 1,
        slidesToScroll: 1,
        initialSlide: 0,
        arrows:false,
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    infinite: true,
                    dots: false
                }
            },
            {
                breakpoint: 600,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    initialSlide: 1
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
    }
    return(
        <div style={{marginLeft:"6%",marginRight:"6%"}}>
            <Slider {...settings}>
                <div>
                    <br/>
                    <p style={{display:"none"}}>1</p>
                    <img style={{width:'100%',height:"500px"}} src={back1}/>
                </div>
                <div>
                    <br/>
                    <p style={{display:"none"}}>2</p>
                    <img style={{width:'100%',height:"500px"}} src={back2}/>
                </div>
                <div>
                    <br/>
                    <p style={{display:"none"}}>3</p>
                    <img style={{width:'100%',height:"500px"}} src={back3}/>
                </div>
            </Slider>
        </div>
    )
}
export default Adversting;