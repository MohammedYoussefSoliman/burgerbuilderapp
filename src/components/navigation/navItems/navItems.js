import React from 'react';

import NavItem from './navItem/navItem'
import classes from './navItems.css'

const Navitems = () => {
    return (
        <ul className={classes.NavItems}>
            <NavItem active>Burger Builder</NavItem>
            <NavItem>Check List</NavItem>
        </ul>
    );
}

export default Navitems;
