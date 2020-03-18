import React from 'react';

import classes from './BuildControl.css'

const BuildControl = ({ctrlType, add, deduct, disabled}) => {
    return (
        
        <div className={classes.BuildControl}>
        <label className={classes.Label}>{ctrlType}</label>
            <button className={classes.Less} onClick={deduct} disabled={disabled}>Less</button>
            <button className={classes.More} onClick={add}>More</button>
        </div>
    );
}

export default BuildControl;
