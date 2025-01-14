import { ethers } from "hardhat";

export async function main() {
  const Counter = await ethers.getContractFactory("Counter");

  const counter = await Counter.deploy();
  console.log(counter);
  console.log("------------------------------------------------------");
  await counter.waitForDeployment();
  console.log("Counter deployed to:", await counter.getAddress());
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
