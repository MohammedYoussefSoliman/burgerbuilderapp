import React, {useEffect, Suspense} from 'react';
import {connect} from 'react-redux'
// import classes from './App.css';

import Layout from './components/layout/layout'
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder'
// import Checkout from './containers/checkout/Checkout'
// import Orders from './containers/Orders'
// import Authentication from './containers/authentication/Authentication'
import Logout from './containers/authentication/Logout'
import {authcheckStatus} from './store/actions/index'
import {Route, Switch, Redirect} from 'react-router-dom'

const Auth = React.lazy(()=>{
  return import('./containers/authentication/Authentication')
});
const Orders = React.lazy(()=>{
  return import('./containers/Orders')
})
const Checkout = React.lazy(()=>{
  return import('./containers/checkout/Checkout')
})

const App = props => {

  useEffect(() => {
    props.onTryAuthCheck()
  }, []);

  let routs;

  if(!props.isAuthenticated) {
    routs = (
    <Switch>
      <Route path='/auth' render={props=><Auth {...props}/>}/>
      <Route path='/' exact component={BurgerBuilder}/>
      <Redirect to='/'/>
    </Switch>
    )
  }else{
    routs = (
    <Switch>
      <Route path='/checkout' render={props=><Checkout {...props}/>}/>
      <Route path='/orders' render={props=><Orders {...props}/>}/>
      <Route path='/logout' component={Logout}/>
      <Route path='/auth' render={props=><Auth {...props}/>}/>
      <Route path='/' exact component={BurgerBuilder}/>
      <Redirect to='/'/>
    </Switch>
    )
  }

  return (
    <div>
      <Layout>
        <Suspense fallback={<p>Loading...</p>}>
          {routs}
        </Suspense>
      </Layout>
    </div>
  );

}

const mapStateToProps = state => {
  return {
    isAuthenticated: state.auth.idToken !== null
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onTryAuthCheck: ()=>{dispatch(authcheckStatus())}
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
