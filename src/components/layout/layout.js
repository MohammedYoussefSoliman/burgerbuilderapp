import React from 'react';

import classes from './layout.css'

const layout = (props) => {
    return (
        <>
            <div>toolbar, sidedrawer, backdrop</div>
            <main className={classes.content}>
                {props.children}
            </main>
        </>
    );
}

export default layout;
