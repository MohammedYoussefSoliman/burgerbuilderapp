import React from 'react';

import logoImage from '../../assets/images/original.png';
import classes from './logo.css';

const Logo = () => {
    return (
        <div className={classes.Logo}>
            <img src={logoImage} alt="logo"/>
        </div>
    );
}

export default Logo;
