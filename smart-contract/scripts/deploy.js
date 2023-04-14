const hre = require("hardhat");

async function main() {
  const NAME = "NFT with AI"
  const SYMBOL = "AINFT"
  const COST = ethers.utils.parseUnits("1", "ether") // 1 ETH

  const ARTNFT = await hre.ethers.getContractFactory("ArtNFT")
  const artnft = await ARTNFT.deploy(NAME, SYMBOL, COST)
  await artnft.deployed()

  console.log(`Deployed ArtNFT Contract at: ${artnft.address}`)
  //Deployed at Goerli Testnet : 0xe8c9ed625c71695233c80Bf38f45B1820b0ea8eB
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
