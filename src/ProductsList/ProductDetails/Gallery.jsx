import React from "react";
import ImageGallery from 'react-image-gallery';
import './PD.css';

const Gallery =(props)=> {
    console.log(props.image);
    return (
            <ImageGallery key={props.id} slideOnThumbnailOver={true} showFullscreenButton={false} showPlayButton={false} showIndex={true} items={props.images} />
    );
};
export default Gallery;