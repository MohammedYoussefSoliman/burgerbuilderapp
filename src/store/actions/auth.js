import * as actionTypes from './actionTypes';
import axios from 'axios';

export const authStart = () => {
    return {
        type: actionTypes.AuthStart
    }
}

export const authSucces = (idToken, userId) => {
    return {
        type: actionTypes.AuthSuccess,
        idToken,
        userId
    }
}

export const authFailiure = (error) => {
    return {
        type: actionTypes.AuthFailed,
        error
    }
}

export const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('expirationTime');
    localStorage.removeItem('userID');
    return {
        type: actionTypes.AuthLogout
    }
}

export const checkAuthTimeOut = (expirasionTime) => {
    return dispatch => {
        setTimeout(()=> {dispatch(logout())}, expirasionTime*1000)
    }
}



export const authHandler = (email, password, method) => {
    console.log(method)
    return dispatch => {
        dispatch(authStart())
        let authData = {email, password, returnSecureToken: true}
        let url = 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyDHK8qzadlcVO5hlTlHDIhgdpNzC6XBGJY';
        if(!method) {
            url = 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyDHK8qzadlcVO5hlTlHDIhgdpNzC6XBGJY';
        }
        axios.post(url, authData)
        .then(res=>{
            console.log(res.data);
            console.log(res.data.expiresIn);
            const expirationTime = new Date(new Date().getTime()+res.data.expiresIn*1000);
            localStorage.setItem('token', res.data.idToken);
            localStorage.setItem('expirationTime', expirationTime);
            localStorage.setItem('userID', res.data.localId);
            dispatch(authSucces(res.data.idToken, res.data.localId));
            dispatch(checkAuthTimeOut(res.data.expiresIn));
        })
        .catch(err=>{
            console.log(err.response.data.error);
            dispatch(authFailiure(err.response.data.error))
        })
    }
}

export const authRedirect = (path) => {
    return {
        type: actionTypes.AuthRedirect,
        path
    }
}

export const authcheckStatus = () => {
    return dispatch => {
    const token = localStorage.getItem('token');
    const userID = localStorage.getItem('userID');
        if(!token) {
            dispatch(logout())
        }else{
            const expirasionTime = new Date(localStorage.getItem('expirationTime'))
            if(expirasionTime <= new Date()){
                dispatch(logout())
            }else{
                dispatch(authSucces(token, userID))
                dispatch(checkAuthTimeOut((expirasionTime.getTime() - new Date().getTime())/1000))
            }
        }
    }
}