import React from 'react';
import Web3 from 'web3';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import { RegisterForm, Dashboard } from './components';

function App() {

  window.addEventListener('load', async () => {
    if (window.ethereum) {
      window.web3 = new Web3(window.ethereum);
      try {
        await window.ethereum.enable();
      } catch (error) {
        console.log(error);
      }
    }
    else if (window.web3) {
      window.web3 = new Web3(window.web3.currentProvider || window.web3.givenProvider || 'http://localhost:7545');
      try {
      } catch (error) {
        console.log(error);
      }
    }
    else {
      console.log('Non-Ethereum browser detected...Try installing MetaMask.');
    }
  });

  return (
    <Router>
        <Dashboard>
          <Switch>
            <Route exact path='/register-device' component={RegisterForm} />
          </Switch>
        </Dashboard>
    </Router>
  );
}

export default App;
