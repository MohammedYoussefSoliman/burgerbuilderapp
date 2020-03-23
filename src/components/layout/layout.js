import React, { useState } from 'react';

import Toolbar from '../navigation/toolbar/toolbar'
import Sidedrawer from '../navigation/sideDrawer/sideDrawer'
import classes from './layout.css'


const Layout = (props) => {

    const [sidedraw, setSidedraw] = useState(false);

    const handleToggleDrop = () => {
        setSidedraw(!sidedraw);
      };

    return (
        <>
            <Toolbar toggle={handleToggleDrop}/>
            <Sidedrawer open={sidedraw} close={handleToggleDrop}/>
            <div>sidedrawer, backdrop</div>
            <main className={classes.content}>
                {props.children}
            </main>
        </>
    );
}

export default Layout;
