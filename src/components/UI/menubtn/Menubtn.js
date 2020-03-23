import React from 'react';

import classes from './menubtn.css'

const Menubtn = (props) => {
    return (
        <button onClick={props.toggle} className={classes.btn}>
            {props.children}
        </button>
    );
}

export default Menubtn;
