import React from 'react';
import classes from './input.css'

const Input = (props) => {
    
    let inputElement = null;

    let inStyle = [classes.InputElement]
    if(props.invalid && props.shouldValidtate && props.entered) {
        inStyle.push(classes.Invalid)
    }

    switch(props.elementType) {
        case('input'):
            inputElement = <input className={inStyle.join(' ')} {...props.elementConfig} value={props.value} onChange={props.changed}/>
            break;
        case('textarea'):
            inputElement = <textarea className={inStyle.join(' ')} {...props.elementConfig} value={props.value} onChange={props.changed}></textarea>
            break;
        case('select'):
            inputElement = <select className={inStyle.join(' ')} {...props.elementConfig} value={props.value} onChange={props.changed}>{props.elementConfig.options.map(option =>
            (<option key={option.value} value={option.value}>{option.displayValue}</option>)
            )}</select>
            break;
        default:
            inputElement = <input className={inStyle.join(' ')} {...props.elementConfig} value={props.value} onChange={props.changed}/>
    }

    return (
        <div>
            <label>{props.label}</label>
            {inputElement}
        </div>
    );
}

export default Input;
