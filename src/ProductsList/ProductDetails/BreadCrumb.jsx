import React, {useEffect} from 'react';
import Link from '@material-ui/core/Link';
import Breadcrumbs from '@material-ui/core/Breadcrumbs';


function handleClick(event) {
    event.preventDefault();
    console.info('You clicked a breadcrumb.');
}



function BreadCrumb(props) {
    return (
        <Breadcrumbs aria-label="breadcrumb">
            <Link color="inherit" href="/" onClick={handleClick}>
                {props.breadCrumb3}
            </Link>
            <Link color="inherit" href="/getting-started/installation/" onClick={handleClick}>
                {props.breadCrumb2}
            </Link>
            <Link
                color="textPrimary"
                href="/components/breadcrumbs/"
                onClick={handleClick}
                aria-current="page"
            >
                {props.breadCrumb1}
            </Link>
        </Breadcrumbs>

    );
}
export default BreadCrumb;