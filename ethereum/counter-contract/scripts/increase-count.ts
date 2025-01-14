import "dotenv/config";
import { ethers } from "ethers";
import { Counter } from "../typechain-types";

const abi = require("../artifacts/contracts/Counter.sol/Counter.json").abi;

const API_URL = process.env.API_URL;
const PRIVATE_KEY = process.env.PRIVATE_KEY;
const CONTRACT_ADDRESS = process.env.CONTRACT_ADDR;

export async function main() {
  if (!API_URL || !PRIVATE_KEY || !CONTRACT_ADDRESS) {
    throw new Error("Envs must be provided");
  }

  const provider = new ethers.JsonRpcProvider(API_URL);
  const signer = new ethers.Wallet(PRIVATE_KEY, provider);
  const contract = new ethers.Contract(
    CONTRACT_ADDRESS,
    abi,
    signer
  ) as unknown as Counter;

  console.log("Increasing count...");
  const res = await contract.increase();
  await res.wait();
  console.log("Increased", await contract.getCount());
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
