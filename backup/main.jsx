// Import Web3-Onboard libraries
import React from 'react';
import ReactDOM from 'react-dom/client';
import Onboard from '@web3-onboard/core';
import metamaskModule from '@web3-onboard/metamask';

// Import relevant hooks and providers from @mysten/dapp-kit
import { WalletProvider, useConnectWallet, useCurrentAccount } from '@mysten/dapp-kit';
import { createRoot } from 'react-dom/client';
import { useState } from 'react';

// Initialize MetaMask integration
const metamask = metamaskModule();

const onboard = Onboard({
  wallets: [metamask],
  chains: [
    {
      id: '0x7a69', // 31337 in hex
      token: 'ETH',
      label: 'Local Ethereum',
      rpcUrl: 'http://127.0.0.1:8545', // Anvil RPC URL
    },
  ],
});

// React Component for Wallet Interaction
function App() {
  const { connect: connectSuiWallet } = useConnectWallet(); // Hook for connecting Sui Wallet
  const currentAccount = useCurrentAccount(); // Hook for getting the current wallet account
  const [ethAccount, setEthAccount] = useState(null);

  // Connect MetaMask Wallet
  async function connectMetaMask() {
    try {
      const connectedWallets = await onboard.connectWallet();
      if (connectedWallets.length > 0) {
        setEthAccount(connectedWallets[0].accounts[0].address);
      }
    } catch (error) {
      console.error('Error connecting MetaMask:', error);
    }
  }

  // Connect Sui Wallet
  async function connectSui() {
    try {
      await connectSuiWallet(); // Trigger Sui Wallet connection
    } catch (error) {
      console.error('Error connecting Sui Wallet:', error);
    }
  }

  return (
    <div>
      <h1>Web3 Bridge</h1>
      <button onClick={connectMetaMask}>Connect MetaMask</button>
      <button onClick={connectSui}>Connect Sui Wallet</button>
      <div>
        <h2>Connected Wallets</h2>
        {ethAccount && <p>MetaMask: {ethAccount}</p>}
        {currentAccount && <p>Sui Wallet: {currentAccount.address}</p>}
      </div>
    </div>
  );
}

// Wrap App in WalletProvider for Sui context
const root = createRoot(document.getElementById('root'));
root.render(
  <WalletProvider>
    <App />
  </WalletProvider>
);
