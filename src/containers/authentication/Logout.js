import React, { useState, useEffect } from 'react';
import {connect} from 'react-redux';
import {Redirect} from 'react-router-dom'
import {logout} from '../../store/actions/index';


const Logout = props => {

    const [isRedirect, setIsRedirect] = useState(false)

    useEffect(()=>{
        props.onLogout();
        setTimeout(()=> {
            setIsRedirect(true)
        }, 1000)
    }, [])

        let content = (
            <>
            <h2>You are logged out from your account</h2>
            <p>Thanks anyway</p>
            {isRedirect && <Redirect to="/"/>}
            </>
        )


        return content
}

const mapDispatchToProps = dispatch => {
    return {
        onLogout: () => {dispatch(logout())}
    }
}

export default connect(null, mapDispatchToProps)(Logout)
