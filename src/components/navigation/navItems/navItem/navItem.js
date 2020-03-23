import React from 'react';

import classes from './navItem.css'

const NavItem = (props) => {
    return (
        <li className={classes.NavItem}>
            <a link="/" className={props.active ? classes.active : null}>{props.children}</a>      
        </li>
    );
}

export default NavItem;
