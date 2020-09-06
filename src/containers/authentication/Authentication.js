import React, { useState, useEffect } from 'react';
import {connect} from 'react-redux';
import {Redirect} from 'react-router-dom';

import Button from '../../components/UI/button/Button'
import Spinner from '../../components/UI/spinner/spinner'
import Input from '../../components/UI/input/input'
import { authHandler, authRedirect } from '../../store/actions/index'

import scss from './auth.module.scss'

const Authentication = props => {

    const [controls, setControls] = useState({
        email: {
            elementType: 'input',
            elementConfig: {
                type: 'email',
                placeholder: 'email address',
            },
            value: '',
            validation: {
                required: true,
                pattern: new RegExp("^([a-zA-Z0-9_\\-\\.]+)@([a-zA-Z0-9_\\-\\.]+)\\.([a-zA-Z]{2,5})$")
            },
            entered: false,
            valid: false
        },
        password: {
            elementType: 'input',
            elementConfig: {
                type: 'password',
                placeholder: 'Password'
            },
            value: '',
            validation: {
                required: true,
                pattern: new RegExp("^(?:(?:(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z]))|(?:(?=.*[a-z])(?=.*[A-Z])(?=.*[*.!@$%^&(){}[]:;<>,.?/~_+-=|\]))|(?:(?=.*[0-9])(?=.*[A-Z])(?=.*[*.!@$%^&(){}[]:;<>,.?/~_+-=|\]))|(?:(?=.*[0-9])(?=.*[a-z])(?=.*[*.!@$%^&(){}[]:;<>,.?/~_+-=|\]))).{8,32}$")
            },
            entered: false,
            valid: false
        }
    });
    const [isFormValid, setIsFormValid] = useState(false);
    const [isSignUp, setisSignUp] = useState(true);

    const handleControlForm = (event) => {
        event.preventDefault();
        props.onAuth(controls.email.value, controls.password.value, isSignUp)
    }

   const checkValidety = (value, rules) => {

        let isValid = true
        if(rules.required) {
            isValid = rules.pattern.test(value) && value.trim(' ') !== '' && isValid
        }
        return isValid
    }

    const onChangeHandler = (event,control) => {
        event.preventDefault();
        const updatedControls = {
            ...controls,
            [control]: {
                ...controls[control],
                value: event.target.value,
                entered: true,
                valid: checkValidety(event.target.value, controls[control].validation)
            }
        }
        let isFormValid;
        for(let key in updatedControls) {
            isFormValid = updatedControls[key].valid
        }
        setControls(updatedControls);
        setIsFormValid(isFormValid)
    }

    const isAuthSwitchHandler = (e) => {
        e.preventDefault()
        // this.setState(prevState=>{
        //     return {
        //         isSignUp: !prevState.isSignUp
        //     }
        // })
        setisSignUp(!isSignUp)
    }
    const {onSetAuthPathDir, building, redirectPath} = props;

    useEffect(()=>{
        if(!building && redirectPath !== '/'){
            onSetAuthPathDir()
            // this is resetting if not building, but redirect path is loaded
        }
    }, [onSetAuthPathDir, building, redirectPath])

        let controlArray = []
        for(let key in {...controls}){
            controlArray.push({
                id: key,
                config: {...controls[key]}
            })
        }

        return (
            <>
                {props.loading && <Spinner />}
                {props.isAuthenticated && <Redirect to={props.redirectPath}/>}
                {!props.loading &&
                <form onSubmit={handleControlForm} className={scss.Auth}>
                    {props.error && <span style={{color: 'red'}}>{props.error.message}</span>}
                    {controlArray.map(control =>
                        <Input key={control.id}
                                elementType={control.config.elementType}
                                elementConfig={control.config.elementConfig}
                                invalid={!control.config.valid}
                                shouldValidtate={control.config.validation}
                                entered={control.config.entered}
                                value={control.config.value} 
                                changed={(event)=>{onChangeHandler(event, control.id)}}/>
                            )}
                    <Button btnType="Success" clicked disabled={!isFormValid}>Submit</Button>
                    <Button btnType="Danger" clicked={isAuthSwitchHandler}>{isSignUp ? 'SIGN UP' : 'SIGN IN'}</Button>
                </form> }
            </>
        )
}

const mapStateToProps = state => {
    return {
        loading: state.auth.loading,
        isAuthenticated: state.auth.idToken !== null,
        error: state.auth.error,
        building: state.burgerReducer.building,
        redirectPath: state.auth.redirectPath
    }
}

const mapDispatchToProps = dispatch=>{
    return {
        onAuth: (email, password, isSignUp)=>dispatch(authHandler(email, password, isSignUp)),
        onSetAuthPathDir: ()=>dispatch(authRedirect('/'))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Authentication)
