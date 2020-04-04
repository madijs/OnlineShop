import React from "react";
import Tab from "@material-ui/core/Tab";
import Axios from "axios";
import path from "../settings";

const MaterialTabs =(props)=>{
    const getSlug=()=>{
        props.state.isExist=true;
        props.compareSlugFunction(props.slug);
        console.log(props.state);
        // props.dispatch(compareSlugActionCreator(props.slug)); //compareSlugFunction
        console.log(props.state.isExist);
        if(props.state.isExist) {
            Axios.get(path + '/category/' + props.slug).then(res => {
                console.log("REQUEST");
                props.setCurrentSubCategory(res.data);  //приходят из mapDispatchToProps
                props.setSubCategoriesData(res.data);
                // props.dispatch(setCurrentSubCategoryActionCreator(res.data));
                // props.dispatch(setSubCategoriesDataActionCreator(res.data))
            })
        }
    };
    return(
        <Tab onClick={getSlug} slug={props.slug} label={props.title} {...props.a11yProps(props.key)} />
    )
}
export default MaterialTabs;