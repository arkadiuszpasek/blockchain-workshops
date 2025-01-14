import { SuiClient } from "@mysten/sui/client";
import { logger, shorten } from "../utils";
import { networks } from "./utils";
import { Transaction } from "@mysten/sui/transactions";
import { Ed25519Keypair } from "@mysten/sui/keypairs/ed25519";

interface Parameters {
  amount: number;
  keypair: Ed25519Keypair;
  client: SuiClient;
}

export async function splitCoin({ keypair, amount, client }: Parameters) {
  logger.debug(`Splitting coins @ ${shorten(keypair.toSuiAddress())}`);
  const tx = new Transaction();
  const [coin] = tx.splitCoins(tx.gas, [500_000_000]);
  tx.transferObjects([coin], keypair.getPublicKey().toSuiAddress());
  const result = await client.signAndExecuteTransaction({
    signer: keypair,
    transaction: tx,
  });
  logger.debug("Result", result);

  if (result.errors) {
    throw new Error(`Transaction failed: ${result.errors.join(", ")}`);
  }
  logger.info(`Split ${amount} coins @ ${shorten(keypair.toSuiAddress())}`);
}
