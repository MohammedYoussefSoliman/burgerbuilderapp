import * as actionTypes from '../actions/actionTypes';
import {updateObject} from '../utility'

const initialState = {
    idToken: null,
    userId: null,
    loading: false,
    error: null,
    redirectPath: '/'
}

// Reduce Functions

const authStart = (state) => {
    return updateObject(state, {loading: true, error: null})
}

const authSuccess = (state, action) => {
    return updateObject(state, {
        idToken: action.idToken,
        userId: action.userId,
        loading: false,
        error: null
    })
}

const authFailed = (state, action) => {
    return updateObject(state, {
        loading: false,
        error: action.error
    })
}

const authLogout = (state, action) => {
    return updateObject(state, {idToken: null, userId: null})
}

const authrdirect = (state, action) => {
    return updateObject(state, {redirectPath: action.path})
}

const reducer = (state = initialState, action) => {
    switch(action.type) {
        case actionTypes.AuthStart: return authStart(state)
        case actionTypes.AuthSuccess: return authSuccess(state, action)
        case actionTypes.AuthFailed: return authFailed(state, action)
        case actionTypes.AuthLogout: return authLogout(state, action)
        case actionTypes.AuthRedirect: return authrdirect(state, action)
        default: return state
    }
}

export default reducer