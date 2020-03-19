import React from 'react';

import classes from './backdrop.css'

const Backdrop = (props) => (
        props.show ? <div onClick={props.close} className={classes.Backdrop}></div> : null
    );

export default Backdrop;
