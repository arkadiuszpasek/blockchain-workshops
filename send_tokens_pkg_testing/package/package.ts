import { Transaction } from "@mysten/sui/transactions";
import { config } from "../config";
import { logger } from "../utils";

export interface TransferSuiDirectArgs {
  recipientAddress: string;
  coinId: string;
  amount: number;
}

export namespace SendTokensPkg {
  export function transferSuiDirect(
    tx: Transaction,
    { coinId, recipientAddress, amount }: TransferSuiDirectArgs
  ) {
    const target = `${config.packageId}::${config.module}::${config.function}`;
    const args = [
      tx.pure.address(recipientAddress),
      tx.pure.id(coinId),
      tx.pure.u64(amount),
    ];
    logger.debug(
      `transferSuiDirect, coinId: ${coinId}, recipient: ${recipientAddress}, amount: ${amount}, target: ${target}, arguments: ${JSON.stringify(
        args
      )}`
    );
    return tx.moveCall({
      target,
      arguments: args,
    });
  }
}
