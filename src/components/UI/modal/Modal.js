import React from 'react';
import classes from './modal.css';

import Backdrop from '../backdrop/backdrop'

const Modal = props => {
    return (
        <>
        <Backdrop close={props.close} show={props.show}/>
        <div className={classes.Modal}
            style = {{
                transform: props.show ? "translateY(0)" : "translateY(-100vh)",
                opacity: props.show ? "1" : "0"
            }}
        >
            {props.children}
        </div>
        </>
    );
}

export default Modal;
