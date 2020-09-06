import React from 'react';
import classes from './toolbar.css'
import Logo from '../../logo/logo'
import NavItems from '../navItems/navItems'
import Menubtn from '../../UI/menubtn/Menubtn'

const Toolbar = (props) => {
    return (
        <header className={classes.Toolbar}>
            <Menubtn toggle={props.toggle}>Menu</Menubtn>
            <div className={classes.Logo}>
                <Logo />
            </div>
            <nav className={classes.NavItems}>
            <NavItems isAuth={props.isAuth}/>
            </nav>
        </header>
    );
}

export default Toolbar;
