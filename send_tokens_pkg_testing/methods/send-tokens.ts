import { SuiClient } from "@mysten/sui/client";
import { Ed25519Keypair } from "@mysten/sui/keypairs/ed25519";
import { Transaction } from "@mysten/sui/transactions";
import { SendTokensPkg, TransferSuiDirectArgs } from "../package/package";
import { logger } from "../utils/logger";
import { shorten } from "../utils";

interface Parameters extends TransferSuiDirectArgs {
  client: SuiClient;
  keypair: Ed25519Keypair;
}

export async function sendTokens({
  recipientAddress,
  amount,
  coinId,
  client,
  keypair,
}: Parameters) {
  logger.debug(
    `Sending ${amount} SUI to ${shorten(recipientAddress)} from ${shorten(
      keypair.toSuiAddress()
    )}, coinId: ${coinId}`
  );
  console.log(SendTokensPkg);
  const tx = new Transaction();
  tx.setGasBudget(1000000);
  SendTokensPkg.transferSuiDirect(tx, { recipientAddress, amount, coinId });
  const result = await client.signAndExecuteTransaction({
    signer: keypair,
    transaction: tx,
  });
  logger.debug(result);

  if (result.errors) {
    throw new Error(`Transaction failed: ${result.errors.join(", ")}`);
  }
  logger.info(
    `Successfully sent ${amount} SUI to ${shorten(
      recipientAddress
    )} from ${shorten(keypair.toSuiAddress())}`
  );
}
