import React, {useState} from 'react';
// import classes from './App.css';

import Layout from './components/layout/layout'
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder'

function App() {

  const [show, setShow] = useState(true)

  // setTimeout(() => {
  //   setShow(false)
  // }, 5000)

  return (
    <div>
      <Layout>
        {show && <BurgerBuilder />}
      </Layout>
    </div>
  );
}

export default App;
