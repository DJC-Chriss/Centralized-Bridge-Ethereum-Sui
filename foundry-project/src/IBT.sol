// SPDX-License-Identifier: MIT
pragma solidity ^0.8.17;

import "openzeppelin-contracts/contracts/token/ERC20/ERC20.sol";
import "openzeppelin-contracts/contracts/access/Ownable.sol";

contract IBT is ERC20, Ownable {
    constructor() ERC20("IBToken", "IBT") Ownable(msg.sender) {
        // Optionally, do more constructor stuff here
        // e.g., _mint(msg.sender, 1000 ether);
    }

    // Other functions, e.g., mint/burn:
    function mint(address to, uint256 amount) external onlyOwner {
        _mint(to, amount);
    }

    function burn(uint256 amount) external {
        _burn(msg.sender, amount);
    }
}
