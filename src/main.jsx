// Import Web3-Onboard libraries
import React, { useState } from 'react';
import ReactDOM from 'react-dom/client';
import Onboard from '@web3-onboard/core';
import metamaskModule from '@web3-onboard/metamask';

// Import Sui hooks/providers from @mysten/dapp-kit
import {
  WalletProvider,
  useConnectWallet,
  useCurrentAccount,
  useSuiClient, // We'll use this for signAndExecuteTransactionBlock
} from '@mysten/dapp-kit';

import { createRoot } from 'react-dom/client';
import { ethers } from 'ethers';

// 1. Initialize MetaMask integration
const metamask = metamaskModule();
const onboard = Onboard({
  wallets: [metamask],
  chains: [
    {
      id: '0x7a69', // 31337 in hex
      token: 'ETH',
      label: 'Local Ethereum',
      rpcUrl: 'http://127.0.0.1:8545', // Anvil or Hardhat RPC URL
    },
  ],
});

// 2. React Component
function App() {
  // Sui wallet connection
  const { connect: connectSuiWallet } = useConnectWallet();
  const currentAccount = useCurrentAccount(); // The Sui wallet account
  const { signAndExecuteTransactionBlock } = useSuiClient();

  // Ethereum wallet address
  const [ethAccount, setEthAccount] = useState(null);

  // Bridging amount
  const [bridgeAmount, setBridgeAmount] = useState('');

  // Dummy placeholders — replace with your actual deployed info
  const contractAddress = '0x5FbDB2315678afecb367f032d93F642f64180aa3'; // Deployed IBT.sol address on local Ethereum
  const ibtAbi = [
    {
      "type": "constructor",
      "inputs": [],
      "stateMutability": "nonpayable"
  },
  {
      "type": "function",
      "name": "allowance",
      "inputs": [
          {
              "name": "owner",
              "type": "address",
              "internalType": "address"
          },
          {
              "name": "spender",
              "type": "address",
              "internalType": "address"
          }
      ],
      "outputs": [
          {
              "name": "",
              "type": "uint256",
              "internalType": "uint256"
          }
      ],
      "stateMutability": "view"
  },
  {
      "type": "function",
      "name": "approve",
      "inputs": [
          {
              "name": "spender",
              "type": "address",
              "internalType": "address"
          },
          {
              "name": "value",
              "type": "uint256",
              "internalType": "uint256"
          }
      ],
      "outputs": [
          {
              "name": "",
              "type": "bool",
              "internalType": "bool"
          }
      ],
      "stateMutability": "nonpayable"
  },
  {
      "type": "function",
      "name": "balanceOf",
      "inputs": [
          {
              "name": "account",
              "type": "address",
              "internalType": "address"
          }
      ],
      "outputs": [
          {
              "name": "",
              "type": "uint256",
              "internalType": "uint256"
          }
      ],
      "stateMutability": "view"
  },
  {
      "type": "function",
      "name": "burn",
      "inputs": [
          {
              "name": "amount",
              "type": "uint256",
              "internalType": "uint256"
          }
      ],
      "outputs": [],
      "stateMutability": "nonpayable"
  },
  {
      "type": "function",
      "name": "decimals",
      "inputs": [],
      "outputs": [
          {
              "name": "",
              "type": "uint8",
              "internalType": "uint8"
          }
      ],
      "stateMutability": "view"
  },
  {
      "type": "function",
      "name": "mint",
      "inputs": [
          {
              "name": "to",
              "type": "address",
              "internalType": "address"
          },
          {
              "name": "amount",
              "type": "uint256",
              "internalType": "uint256"
          }
      ],
      "outputs": [],
      "stateMutability": "nonpayable"
  },
  {
      "type": "function",
      "name": "name",
      "inputs": [],
      "outputs": [
          {
              "name": "",
              "type": "string",
              "internalType": "string"
          }
      ],
      "stateMutability": "view"
  },
  {
      "type": "function",
      "name": "owner",
      "inputs": [],
      "outputs": [
          {
              "name": "",
              "type": "address",
              "internalType": "address"
          }
      ],
      "stateMutability": "view"
  },
  {
      "type": "function",
      "name": "renounceOwnership",
      "inputs": [],
      "outputs": [],
      "stateMutability": "nonpayable"
  },
  {
      "type": "function",
      "name": "symbol",
      "inputs": [],
      "outputs": [
          {
              "name": "",
              "type": "string",
              "internalType": "string"
          }
      ],
      "stateMutability": "view"
  },
  {
      "type": "function",
      "name": "totalSupply",
      "inputs": [],
      "outputs": [
          {
              "name": "",
              "type": "uint256",
              "internalType": "uint256"
          }
      ],
      "stateMutability": "view"
  },
  {
      "type": "function",
      "name": "transfer",
      "inputs": [
          {
              "name": "to",
              "type": "address",
              "internalType": "address"
          },
          {
              "name": "value",
              "type": "uint256",
              "internalType": "uint256"
          }
      ],
      "outputs": [
          {
              "name": "",
              "type": "bool",
              "internalType": "bool"
          }
      ],
      "stateMutability": "nonpayable"
  },
  {
      "type": "function",
      "name": "transferFrom",
      "inputs": [
          {
              "name": "from",
              "type": "address",
              "internalType": "address"
          },
          {
              "name": "to",
              "type": "address",
              "internalType": "address"
          },
          {
              "name": "value",
              "type": "uint256",
              "internalType": "uint256"
          }
      ],
      "outputs": [
          {
              "name": "",
              "type": "bool",
              "internalType": "bool"
          }
      ],
      "stateMutability": "nonpayable"
  },
  {
      "type": "function",
      "name": "transferOwnership",
      "inputs": [
          {
              "name": "newOwner",
              "type": "address",
              "internalType": "address"
          }
      ],
      "outputs": [],
      "stateMutability": "nonpayable"
  },
  {
      "type": "event",
      "name": "Approval",
      "inputs": [
          {
              "name": "owner",
              "type": "address",
              "indexed": true,
              "internalType": "address"
          },
          {
              "name": "spender",
              "type": "address",
              "indexed": true,
              "internalType": "address"
          },
          {
              "name": "value",
              "type": "uint256",
              "indexed": false,
              "internalType": "uint256"
          }
      ],
      "anonymous": false
  },
  {
      "type": "event",
      "name": "OwnershipTransferred",
      "inputs": [
          {
              "name": "previousOwner",
              "type": "address",
              "indexed": true,
              "internalType": "address"
          },
          {
              "name": "newOwner",
              "type": "address",
              "indexed": true,
              "internalType": "address"
          }
      ],
      "anonymous": false
  },
  {
      "type": "event",
      "name": "Transfer",
      "inputs": [
          {
              "name": "from",
              "type": "address",
              "indexed": true,
              "internalType": "address"
          },
          {
              "name": "to",
              "type": "address",
              "indexed": true,
              "internalType": "address"
          },
          {
              "name": "value",
              "type": "uint256",
              "indexed": false,
              "internalType": "uint256"
          }
      ],
      "anonymous": false
  },
  {
      "type": "error",
      "name": "ERC20InsufficientAllowance",
      "inputs": [
          {
              "name": "spender",
              "type": "address",
              "internalType": "address"
          },
          {
              "name": "allowance",
              "type": "uint256",
              "internalType": "uint256"
          },
          {
              "name": "needed",
              "type": "uint256",
              "internalType": "uint256"
          }
      ]
  },
  {
      "type": "error",
      "name": "ERC20InsufficientBalance",
      "inputs": [
          {
              "name": "sender",
              "type": "address",
              "internalType": "address"
          },
          {
              "name": "balance",
              "type": "uint256",
              "internalType": "uint256"
          },
          {
              "name": "needed",
              "type": "uint256",
              "internalType": "uint256"
          }
      ]
  },
  {
      "type": "error",
      "name": "ERC20InvalidApprover",
      "inputs": [
          {
              "name": "approver",
              "type": "address",
              "internalType": "address"
          }
      ]
  },
  {
      "type": "error",
      "name": "ERC20InvalidReceiver",
      "inputs": [
          {
              "name": "receiver",
              "type": "address",
              "internalType": "address"
          }
      ]
  },
  {
      "type": "error",
      "name": "ERC20InvalidSender",
      "inputs": [
          {
              "name": "sender",
              "type": "address",
              "internalType": "address"
          }
      ]
  },
  {
      "type": "error",
      "name": "ERC20InvalidSpender",
      "inputs": [
          {
              "name": "spender",
              "type": "address",
              "internalType": "address"
          }
      ]
  },
  {
      "type": "error",
      "name": "OwnableInvalidOwner",
      "inputs": [
          {
              "name": "owner",
              "type": "address",
              "internalType": "address"
          }
      ]
  },
  {
      "type": "error",
      "name": "OwnableUnauthorizedAccount",
      "inputs": [
          {
              "name": "account",
              "type": "address",
              "internalType": "address"
          }
      ]
  }
  ];

  // Example Sui function path, e.g. "0x1234...::ibt::mint"
  const suiMintFunctionPath = '0xYourPackageID::ibt::mint';

  //
  // Connect MetaMask (Ethereum)
  //
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

  //
  // Connect Sui Wallet
  //
  async function connectSui() {
    try {
      await connectSuiWallet();
    } catch (error) {
      console.error('Error connecting Sui Wallet:', error);
    }
  }

  //
  // Bridge from Ethereum to Sui
  // (Burn on ETH, then Mint on Sui)
  //
  async function bridgeEthToSui() {
    try {
      // 1) Connect MetaMask if not already
      const connectedWallets = await onboard.connectWallet();
      if (!connectedWallets.length) {
        throw new Error('No MetaMask wallet connected');
      }
      const ethersProvider = new ethers.providers.Web3Provider(
        connectedWallets[0].provider
      );
      const signer = ethersProvider.getSigner();

      // 2) Burn tokens on Ethereum
      const ibtContract = new ethers.Contract(contractAddress, ibtAbi, signer);
      console.log(`Burning ${bridgeAmount} IBT on Ethereum...`);

      // Convert user input to BN (using 18 decimals as an example)
      const burnTx = await ibtContract.burn(
        ethers.utils.parseUnits(bridgeAmount, 18)
      );
      await burnTx.wait();
      console.log('Burn confirmed on Ethereum');

      // 3) Connect Sui if not already
      await connectSuiWallet();

      if (!currentAccount) {
        throw new Error('Sui Wallet is not connected');
      }
      console.log(`Minting ${bridgeAmount} IBT to Sui address: ${currentAccount.address}`);

      // 4) Mint tokens on Sui
      // 
      // This example uses signAndExecuteTransactionBlock directly. 
      // The actual arguments and structure vary depending on your Sui Move code.
      //
      // Suppose your Move `mint` function signature is:
      //   public entry fun mint(
      //       admin: &signer,
      //       recipient: address,
      //       amount: u64,
      //       ctx: &mut TxContext
      //   )
      //
      // Then you'd pass the recipient, amount, etc. in `arguments`.
      //
      const mintResult = await signAndExecuteTransactionBlock({
        transactionBlock: {
          function: suiMintFunctionPath,
          // You might need to parse your `bridgeAmount` to a number for Sui
          arguments: [currentAccount.address, bridgeAmount], 
          typeArguments: [],
        },
        options: { showEffects: true, showEvents: true },
      });

      console.log('Mint transaction on Sui successful:', mintResult);

      alert(`Successfully bridged ${bridgeAmount} IBT from Ethereum to Sui!`);
    } catch (error) {
      console.error('Bridge (Eth -> Sui) error:', error);
      alert(`Bridge failed: ${error.message}`);
    }
  }

  return (
    <div>
      <h1>Web3 Bridge</h1>

      {/* Connect Buttons */}
      <button onClick={connectMetaMask}>Connect MetaMask</button>
      <button onClick={connectSui}>Connect Sui Wallet</button>

      {/* Show Connected Wallets */}
      <div>
        <h2>Connected Wallets</h2>
        {ethAccount && <p>MetaMask: {ethAccount}</p>}
        {currentAccount && <p>Sui Wallet: {currentAccount.address}</p>}
      </div>

      {/* Bridge Amount Input */}
      <div style={{ marginTop: '20px' }}>
        <input
          type="text"
          placeholder="Amount to bridge"
          value={bridgeAmount}
          onChange={(e) => setBridgeAmount(e.target.value)}
        />
        <button onClick={bridgeEthToSui} style={{ marginLeft: '10px' }}>
          Bridge from Ethereum to Sui
        </button>
      </div>
    </div>
  );
}

// Wrap App in WalletProvider for Sui context
const root = createRoot(document.getElementById('root'));
root.render(
  <WalletProvider
    networks={[
      {
        name: 'Local Sui',
        rpcUrl: 'http://127.0.0.1:9000', // or the correct URL/port for your local Sui node
      },
    ]}
  >
    <App />
  </WalletProvider>
);
