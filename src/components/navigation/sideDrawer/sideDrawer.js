import React from 'react';

import Logo from '../../logo/logo';
import Navitems from '../navItems/navItems'
import Backdrop from '../../UI/backdrop/backdrop'

import classes from './sideDrawer.css'

const Sidedrawer = ({open, close, isAuth}) => {
    let attachedClasses = [classes.Drawer, classes.Close]
    if(open) {
        attachedClasses = [classes.Drawer, classes.Open]
    }
    return (
        <>
        <Backdrop show={open} close={close}/>
        <div className={attachedClasses.join(' ')}>

            <div className={classes.Logo}>
                <Logo />
            </div>

            <nav>
            <Navitems isAuth={isAuth}/>
            </nav>
        </div>
        </>
    );
}

export default Sidedrawer;
