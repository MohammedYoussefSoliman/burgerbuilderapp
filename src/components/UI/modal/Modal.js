import React from 'react';
import classes from './modal.css';

import Backdrop from '../backdrop/backdrop'

const Modal = props => {

    // shouldComponentUpdate(nextProps,nextState) {

    //     return nextProps.show !== this.props.show || nextProps.children !== this.props.children
    // }


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

export default React.memo(Modal, (prevProps, nextProps)=>{
    return nextProps.show === prevProps.show && nextProps.children === prevProps.children // this will return ture only if the props are themselves
});
