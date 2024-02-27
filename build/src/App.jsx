import { useState, useEffect } from 'react';
import Web3 from 'web3';
import ABI from '../contracts/YourContract.json';
import DesignPage from './DesignPage';
import './DesignPage.css'; 

const App = () => {
  const [wallet, setWallet] = useState(null);
  const [web3, setWeb3] = useState(null);
  const [contract, setContract] = useState(null);
  const [account, setAccount] = useState(null);

  const connectWallet = async () => {
    try{
    if (window.ethereum) {
      setWallet('Metamask Detected');
      await window.ethereum.request({ method: 'eth_requestAccounts' });
      const web3Instance = new Web3(window.ethereum);
      setWeb3(web3Instance);

      // Get network ID
      const networkId = await web3Instance.eth.net.getId();

      // Get contract address from ABI based on network ID
      const contractAddress = ABI.networks[networkId].address;

      // Create contract instance
      const contractInstance = new web3Instance.eth.Contract(ABI.abi, contractAddress);
      setContract(contractInstance);
      console.log(contractInstance);
      // Get user account
      const accounts = await web3Instance.eth.getAccounts();
      setAccount(accounts[0]);
    } else {
      setWallet('Metamask not Detected please install');
    } 
  }catch (error) {
      console.error('Error connecting wallet:', error);
      // Handle error (e.g., show a message to the user)
    }
  }

  useEffect(() => {
    connectWallet();
  }, []);

  return (
    <div className='text-white flex  flex-col  items-center'>
      <div className="backgroundImageWrapper">
        {/* <img src="https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEhky4Kg5Lcq5_O912IxQZIK3dCrI_zCWz3jh4VzcV725zePb3KlJMBvAUDLljLsI5Y26pvO_zCfCSz9be-1u3enAkYR53KtBr5jVb_Lq793EwINwf94nrqJTRyvREpiRuPauc82AX_4fs6wMxURhCMnQpdLSWb2WOmViKfZuFMgEgtUS0Vy0TJoCL5c7Q/s900/bigstock-fundraising-donations-charity--146155910.jpg" /> */}
      </div>
        {/* <h1 className='text-2xl'>NGO Transactions</h1>  */}
      {contract && account && <DesignPage contract={contract} account={account} web3={web3} />}
    </div>
  )
}

export default App;