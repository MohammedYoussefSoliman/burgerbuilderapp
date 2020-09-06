import React, { useState } from 'react';

import Toolbar from '../navigation/toolbar/toolbar'
import Sidedrawer from '../navigation/sideDrawer/sideDrawer'
import classes from './layout.module.scss'
import {connect} from 'react-redux';


const Layout = (props) => {

    const [sidedraw, setSidedraw] = useState(false);

    const handleToggleDrop = () => {
        setSidedraw(false);
      };

    return (
        <>
            <Toolbar isAuth={props.isAuthenticated} toggle={handleToggleDrop}/>
            <Sidedrawer open={sidedraw} close={handleToggleDrop} isAuth={props.isAuthenticated}/>
            <div>backdrop</div>
            <main className={classes.content}>
                {props.children}
            </main>
        </>
    );
}

const mapStateToProps = state => {
    return {
        isAuthenticated: state.auth.idToken !== null
    }
}

export default connect(mapStateToProps, null)(Layout);
