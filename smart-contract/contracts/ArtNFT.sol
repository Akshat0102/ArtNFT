// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

import "../node_modules/@openzeppelin/contracts/token/ERC721/ERC721.sol";

/*a utility library from OpenZeppelin, which allows for easy creation and manipulation of counters in smart contracts,
  the Counters library will keep the track of unique token IDs for each NFT created */
import "../node_modules/@openzeppelin/contracts/utils/Counters.sol";

/* the metadata is not stored directly on chain, thus we have URIs which is typically used to store the metadata about 
   the NFT, such as name, image description etc. The ERC721URIStorage is a contract extension of ERC721 token standard 
   that provides a way to associate these URIs with each of the NFT minted. */

import "../node_modules/@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";

contract ArtNFT is ERC721URIStorage {

    //imports the functions from Counters library (e.g. increment, current) to the contract
    using Counters for Counters.Counter;

    //creating private instance of Counters.Counter struct
    Counters.Counter private _tokenIds;

    address public owner;
    uint256 public cost;

    constructor(
        string memory _name,
        string memory _symbol,
        uint256 _cost
    ) ERC721(_name, _symbol) {
        owner = msg.sender;
        cost = _cost;
    }

    //payable mint function as the user needs to pay a small amount of fees for minting the NFT created
    function mint(string memory tokenURI) public payable {
        require(msg.value >= cost);

        //increment is a function from Counters library used to increment the value of token id
        _tokenIds.increment();

        //current is also a function from Counters library used to fetch the current value of token id
        uint256 newItemId = _tokenIds.current();

        /*the _mint function is a built-in function provided by ERC721 token standard used to create new NFT with 
          unique token ID and assign the ownership of the token to the specified address*/
        _mint(msg.sender, newItemId);

        /*the _setTokenURI is another built-in function from ERC-721 which is used to associate the metadata URI
          with a specific NFT.*/
        _setTokenURI(newItemId, tokenURI);
    }

    //gives the total amount of NFT created
    function totalSupply() public view returns (uint256) {
        return _tokenIds.current();
    }

    //withdraw function for the developer/owner to withdraw the fees deposited by user for minting the NFT
    function withdraw() public {
        require(msg.sender == owner);
        (bool success, ) = owner.call{value: address(this).balance}("");
        require(success);
    }
}
