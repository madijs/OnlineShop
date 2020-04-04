import React from "react";
import {TabPanel} from "./VerticalTabs";

const MaterialPanels =(props)=>{
    console.log(props.value)
    return(
        <TabPanel value={props.value} index={props.key}>{props.title}</TabPanel>
    )
}
export default MaterialPanels;