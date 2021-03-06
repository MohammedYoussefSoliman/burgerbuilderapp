import React from 'react';

import {NavLink} from 'react-router-dom'
import classes from './navItem.css'

const NavItem = (props) => {
    return (
        <li className={classes.NavItem}>
            <NavLink to={props.link} exact activeClassName={classes.active}>{props.children}</NavLink>      
        </li>
    );
}

export default NavItem;
