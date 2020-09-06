import React from 'react';

import NavItem from './navItem/navItem'
import classes from './navItems.css'

const Navitems = ({isAuth}) => {
    return (
        <ul className={classes.NavItems}>
            <NavItem link='/'>Burger Builder</NavItem>
            {isAuth && <NavItem link='/orders'>Orders</NavItem>}
            {isAuth ? <NavItem link='/logout'>Logout</NavItem> : <NavItem link='/auth'>Authentication</NavItem>}
        </ul>
    );
}

export default Navitems;
