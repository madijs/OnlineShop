import React, {useEffect} from "react";
import { useHistory } from 'react-router-dom';
import Axios from "axios"
import path from "../settings";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import PropTypes from "prop-types";
import {withStyles} from "@material-ui/core";
import Tabs from "@material-ui/core/Tabs";
import {makeStyles} from "@material-ui/core/styles";
import Tab from "@material-ui/core/Tab";

export function TabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
        <Typography
            component="div"
            role="tabpanel"
            hidden={value !== index}
            id={`vertical-tabpanel-${index}`}
            aria-labelledby={`vertical-tab-${index}`}
            {...other}
        >
            {value === index && <Box p={3}>{children}</Box>}
        </Typography>
    );
}
TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.any.isRequired,
    value: PropTypes.any.isRequired,
};

const StyledTabs = withStyles(theme=>({
    root:{
        textAlign:'center',
        width: '250px',
        minHeight:'100%',
        backgroundColor: 'white',
        color:'#3f51b5'
    },
    flexContainer:{
        margin:'auto'
    }
}))(Tabs);
const useStyles2 = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        backgroundColor: theme.palette.background.paper,
        display: 'flex',
        height: 304,
        borderBottom:"1px solid black"
    },
    tabs: {
        borderRight: `1px solid ${theme.palette.divider}`,
    },
}));
function VerticalTabs(props) {
    const classes = useStyles2();
    const [value, setValue] = React.useState(0);
    const history = useHistory()
    useEffect( ()=>{
        Axios(path+"/product?page_size=10").then(res=>{
            console.log("gogogo");
            console.log(res.data);
            props.addProductsData(res.data)
        });
        if (props.categoriesData.length===0) {
            Axios.get(path + "/category/").then(
                res => {
                    props.addCategoriesData(res.data);
                    console.log(res.data)
                }
            );

            Axios.get(path + "/category/" + "gigienicheskie-sredstva",{headers:{'Origin':'*'}}).then(res => {
                console.log("subcategory");
                console.log(res.data);
                props.setSubCategoriesData(res.data);
                props.setCurrentSubCategoryData(res.data);
            });
        }
    },[]);

    const handleChange = (event, newValue) => {
        console.log(newValue)
        props.setValue(newValue);
    };
    function a11yProps(index) {
        return {
            id: `vertical-tab-${index}`,
            'aria-controls': `vertical-tabpanel-${index}`,
        };
    }

    return (
        <div className={classes.root}>
            <Tabs
                orientation="vertical"
                variant="scrollable"
                value={props.state.value}
                onChange={handleChange}
                aria-label="Vertical tabs example"
                className={classes.tabs}
            >
                {props.categoriesData.map(el=>(
                    <Tab onClick={()=>{
                        props.state.isExist=true;
                        props.compareSlugFunction(el.slug);
                        console.log(props.state);
                        console.log(props.state.isExist);
                        if(props.state.isExist===true) {
                            Axios.get(path + '/category/' + el.slug).then(res => {
                                console.log("REQUEST");
                                console.log(res.data)
                                props.setCurrentSubCategory(res.data);  //приходят из mapDispatchToProps
                                props.setSubCategoriesData(res.data);
                            })
                        }
                    }} style={{color:"#04aec8"}} label={el.title} {...a11yProps(0)} />
                ))}

            </Tabs>
            {props.currentSubCategory.map((el,index)=>(
                el.child.map(el=>(
                    <TabPanel value={value} index={index}>
                        <span style={{color:"#04aec8"}}>{el.title}</span>
                        {el.child.map(el=>(
                           <div style={{cursor:"pointer",color:"#04aec8"}} onClick={()=> {
                               history.push("/products/" + el.slug)
                           }}>{el.title}</div>
                        ))}
                    </TabPanel>
                ))
            ))}
        </div>
    );
}


export default VerticalTabs;