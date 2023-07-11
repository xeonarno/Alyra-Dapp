import { ethers } from "hardhat";
import { readFile, writeFile } from "node:fs/promises";
import { resolve } from 'path';

async function main() {
  const contract = await ethers.deployContract("Voting");
  
  const voting = await contract.waitForDeployment();

  const address = await voting.getAddress();
  console.log(
    `Voting deployed to ${address}`
  );


  console.log('Export contract to front dapps');
  const path = resolve(__dirname, '../artifacts/contracts/Voting.sol/Voting.json');
  const def = await readFile(path, 'utf-8');
  const data = JSON.parse(def);
  data.address = address;
  const output = resolve(__dirname, '../../front/public/Voting.json');
  await writeFile(output, JSON.stringify(data, null, 2));
 
  console.log(voting);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
