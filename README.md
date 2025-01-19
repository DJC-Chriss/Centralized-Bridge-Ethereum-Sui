# Centralized-Bridge-Ethereum-Sui

---

## Steps

1. **Install Foundry**  
   - Install Foundry by running:
     ```bash
     curl -L https://foundry.paradigm.xyz | bash
     foundryup
     ```
   - This gives us access to `forge`, `anvil`, and related tools.

2. **Initialize a Foundry Project**  
   - I created a Foundry project folder to hold the Solidity contract.
   - Inside that folder, I ran:
     ```bash
     forge init
     ```
   - This set up the basic structure for compiling and deploying with Foundry.

3. **Install Project Dependencies**  
   - In the React (front-end) project folder, I ran:
     ```bash
     npm install @web3-onboard/core @web3-onboard/metamask react react-dom @mysten/dapp-kit ethers
     ```
   - These packages let us connect to MetaMask, use Sui wallet hooks, and interact with Ethereum (via ethers).

4. **Install & Configure Wallets**  
   - I installed **MetaMask** and **Sui Wallet** browser extensions in Chrome.
   - For MetaMask, I added a local network with chain ID `0x7a69` (Anvil’s default) and RPC URL `http://127.0.0.1:8545`.
   - For Sui Wallet, I switched the network to a local Sui environment (or used whichever local address is displayed by `sui start`).

5. **Run Anvil (Local Ethereum Node)**  
   - In the **first terminal**, run:
     ```bash
     anvil
     ```
   - This creates a local blockchain on `http://127.0.0.1:8545` with chain ID `31337` (`0x7a69`).

6. **Start Sui (Local Sui Node)**  
   - In the **second terminal**, start the local Sui environment:
     ```bash
     sui start
     ```
   - This allows us to publish and test Move contracts locally.

7. **Build & Deploy Our ERC-20 Contract (IBT.sol)**  
   - Created a Solidity contract named **IBT** (an ERC-20 with `mint` and `burn`).
   - Inside our Foundry project, I compiled:
     ```bash
     forge build
     ```
   - Then, **in a third terminal**, deploy to Anvil by running:
     ```bash
     forge create contracts/IBT.sol:IBT --rpc-url http://127.0.0.1:8545 --private-key <PRIVATE_KEY> --broadcast
     ```
   - Foundry printed the deployed address, which I used for the front end, in the ABI section.

8. **Create a Sui Move File (.move)**  
   - Made a new folder (`cryptoProjectSui`) with a `Move.toml` and a `sources/` folder.
   - Wrote a Move module (`ibt.move`) that includes an object with `key`, plus functions like `mint` and `burn`.

9. **Publish the Sui Move Contract**  
   - Still in the **second terminal** (where Sui is running), or in another shell pointing to the local Sui environment, I ran:
     ```bash
     sui client publish . --gas-budget 30000
     ```
   - This command printed a “Package ID,” which I used in the front-end to reference the Move module path, in the function area.
   ### Present

10. **Set Up the React Front-End**  
    - Placed a file like `main.jsx` inside a Vite project (`cryptoProject`).
    - This file connects to both **MetaMask** (via `@web3-onboard/metamask`) and **Sui Wallet** (via `@mysten/dapp-kit`).
    - We coded simple UI buttons for “Connect MetaMask,” “Connect Sui Wallet,” and a text input for an amount of tokens to bridge.
    - We referenced:
      - The **IBT** Solidity contract address
      - The **ABI** from the Foundry compilation
      - The **Sui package function path** for `mint`
    - We set up a function to **burn** tokens on Ethereum and then **mint** on Sui in one flow.

11. **Launch the React App**  
    - run:
      ```bash
      npm run dev
      ```
    - Then open the browser (e.g. `http://127.0.0.1:5173`) to see the front-end.

12. **Test the Bridge**  
    - click “Connect MetaMask” (ensuring it pointed to the Anvil local network).
    - clicked “Connect Sui Wallet” (ensuring it’s on local Sui).
    - Enter an amount and use the “Bridge” button:
      1. **Burn** that many tokens from our local Ethereum account.
      2. **Mint** the same amount on Sui via the Move `mint` function.

---

**For more in-depth details, check the `terminale` folder**
