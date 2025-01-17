# Centralized-Bridge-Ethereum-Sui

## Overview

This project demonstrates a simple cross-chain “bridge” flow between **Ethereum** (local Anvil node) and **Sui** (local or devnet). Steps:

1. Created an ERC-20–compatible `IBT.sol` token using **Solidity** and **OpenZeppelin**.  
2. Used **Foundry** to compile and deploy the contract to a local Ethereum node (Anvil).  
3. Built a **React** front-end (using Vite) that connects to MetaMask and a Sui wallet, allowing for basic bridging operations (burn on Ethereum, mint on Sui).  
4. Created a **Sui Move** module that can receive minted tokens after bridging logic is invoked.  
5. Published that Sui module locally via `sui client publish`.

---

## Prerequisites

- **Node.js** (v16+ or v18+ recommended)  
- **npm** or **yarn**  
- **Foundry** (for Solidity)  
  - Installation:
    ```bash
    curl -L https://foundry.paradigm.xyz | bash
    foundryup
    ```
- **Sui CLI** (compatible version that can run `sui client publish`)  
- **MetaMask** extension (for Ethereum side)  
- **Sui Wallet** extension (for Sui side)

---

## Folder Structure

