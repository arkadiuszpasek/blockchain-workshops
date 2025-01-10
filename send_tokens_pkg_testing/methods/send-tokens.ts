import { SuiClient } from "@mysten/sui/client";
import { Ed25519Keypair } from "@mysten/sui/keypairs/ed25519";
import { Transaction } from "@mysten/sui/transactions";
import { SendTokensPkg, TransferSuiDirectArgs } from "../package/package";
import { logger } from "../utils/logger";
import { shorten } from "../utils";
import { send_tokens } from "../types/0x491a2fb5081a86edfe3e4c88e22fd3bc527f464a781bd3c92d16729d9414b809";

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
  const tx = new Transaction();
  tx.setGasBudget(10000000);
  send_tokens.builder.transferSuiDirect(tx, [
    tx.pure.address(recipientAddress),
    coinId,
    tx.pure.u64(BigInt(amount)),
  ]);

  const result = await client.signAndExecuteTransaction({
    signer: keypair,
    transaction: tx,
    options: {
      showBalanceChanges: true,
      showObjectChanges: true,
      showEffects: true,
    },
  });
  if (result.effects && result.effects.status.status !== "success") {
    throw new Error(`Transaction failed: ${result.effects?.status.error}`);
  }
  if (result.errors) {
    throw new Error(`Transaction failed: ${result.errors.join(", ")}`);
  }
  await client.waitForTransaction({ digest: result.digest });

  logger.info(
    `Successfully sent ${amount} SUI to ${shorten(
      recipientAddress
    )} from ${shorten(keypair.toSuiAddress())}`
  );
}
