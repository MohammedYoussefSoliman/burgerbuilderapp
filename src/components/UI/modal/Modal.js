import React, {Component} from 'react';
import classes from './modal.css';

import Backdrop from '../backdrop/backdrop'

class Modal extends Component {

    shouldComponentUpdate(nextProps,nextState) {

        return nextProps.show !== this.props.show
    }

    componentWillUpdate() {
        console.log('[OrderSummery should update]')
    }

    render() {

        return (
            <>
            <Backdrop close={this.props.close} show={this.props.show}/>
            <div className={classes.Modal}
                style = {{
                    transform: this.props.show ? "translateY(0)" : "translateY(-100vh)",
                    opacity: this.props.show ? "1" : "0"
                }}
            >
                {this.props.children}
            </div>
            </>
        );
    }
}

export default Modal;
