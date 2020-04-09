import React, {} from 'react';
// import classes from './App.css';

import Layout from './components/layout/layout'
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder'
import Checkout from './containers/checkout/Checkout'
import Orders from './containers/Orders'
import {Route, Switch} from 'react-router-dom'

function App() {

  // const [show, setShow] = useState(true)

  // setTimeout(() => {
  //   setShow(false)
  // }, 5000)

  return (
    <div>
      <Layout>
        <Switch>
          <Route path='/checkout' component={Checkout}/>
          <Route path='/orders' component={Orders}/>
          <Route path='/' exact component={BurgerBuilder}/>
        </Switch>
      </Layout>
    </div>
  );
}

export default App;
