import Web3 from 'web3';

module.exports.getAccount = async () => {
  if (window.ethereum) {
    window.web3 = new Web3(window.ethereum);
    try {
      await window.ethereum.enable();
      const accounts = await window.web3.eth.getAccounts();
      console.log("accouts...", accounts);
      return accounts;
    } catch (error) {
      console.log(error);
    }
  }
  else if (window.web3) {
    window.web3 = new Web3(window.web3.currentProvider || window.web3.givenProvider || 'http://localhost:7545');
    try {
      const accounts = await window.web3.eth.getAccounts();
      return accounts;
    } catch (error) {
      console.log(error);
    }
  }
  else {
    console.log('Non-Ethereum browser detected...Try installing MetaMask.');
  }
};