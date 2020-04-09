import React from 'react';

import NavItem from './navItem/navItem'
import classes from './navItems.css'

const Navitems = () => {
    return (
        <ul className={classes.NavItems}>
            <NavItem link='/'>Burger Builder</NavItem>
            <NavItem link='/orders'>Orders</NavItem>
        </ul>
    );
}

export default Navitems;
