/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */

/* Generated types for 0x491a2fb5081a86edfe3e4c88e22fd3bc527f464a781bd3c92d16729d9414b809, original address 0x491a2fb5081a86edfe3e4c88e22fd3bc527f464a781bd3c92d16729d9414b809 */

import { TypeDescriptor, ANY_TYPE } from "@typemove/move";
import { MoveCoder, TypedEventInstance } from "@typemove/sui";

import { defaultMoveCoder } from "@typemove/sui";

import {
  ZERO_ADDRESS,
  TypedDevInspectResults,
  getMoveCoder,
} from "@typemove/sui";
import {
  Transaction,
  TransactionArgument,
  TransactionObjectArgument,
} from "@mysten/sui/transactions";
import { SuiClient } from "@mysten/sui/client";
import {
  transactionArgumentOrObject,
  transactionArgumentOrVec,
  transactionArgumentOrPure,
  transactionArgumentOrPureU8,
  transactionArgumentOrPureU16,
  transactionArgumentOrPureU32,
  transactionArgumentOrPureU64,
  transactionArgumentOrPureU128,
  transactionArgumentOrPureU256,
  transactionArgumentOrPureBool,
  transactionArgumentOrPureString,
  transactionArgumentOrPureAddress,
} from "@typemove/sui";

import * as _0x2 from "@typemove/sui/builtin/0x2";

export namespace send_tokens {
  export namespace builder {
    export function transferSuiDirect(
      tx: Transaction,
      args: [
        string | TransactionArgument,
        string | TransactionObjectArgument | TransactionArgument,
        bigint | TransactionArgument,
      ]
    ): TransactionArgument &
      [TransactionArgument, TransactionArgument, TransactionArgument] {
      const _args: any[] = [];
      // @ts-ignore
      _args.push(transactionArgumentOrPureAddress(args[0], tx));
      // @ts-ignore
      _args.push(transactionArgumentOrObject(args[1], tx));
      // @ts-ignore
      _args.push(transactionArgumentOrPureU64(args[2], tx));

      // @ts-ignore
      return tx.moveCall({
        target:
          "0x491a2fb5081a86edfe3e4c88e22fd3bc527f464a781bd3c92d16729d9414b809::send_tokens::transfer_sui_direct",
        arguments: _args,
      });
    }
  }
  export namespace view {
    export async function transferSuiDirect(
      client: SuiClient,
      args: [string, string, bigint]
    ): Promise<TypedDevInspectResults<[]>> {
      const tx = new Transaction();
      builder.transferSuiDirect(tx, args);
      const inspectRes = await client.devInspectTransactionBlock({
        transactionBlock: tx,
        sender: ZERO_ADDRESS,
      });

      // @ts-ignore
      return (await getMoveCoder(client)).decodeDevInspectResult<[]>(
        // @ts-ignore
        inspectRes
      );
    }
  }
}

const MODULES = JSON.parse(
  '{"send_tokens":{"fileFormatVersion":6,"address":"0x491a2fb5081a86edfe3e4c88e22fd3bc527f464a781bd3c92d16729d9414b809","name":"send_tokens","friends":[],"structs":{},"exposedFunctions":{"transfer_sui_direct":{"visibility":"Public","isEntry":false,"typeParameters":[],"parameters":["Address",{"MutableReference":{"Struct":{"address":"0x2","module":"coin","name":"Coin","typeArguments":[{"Struct":{"address":"0x2","module":"sui","name":"SUI","typeArguments":[]}}]}}},"U64",{"MutableReference":{"Struct":{"address":"0x2","module":"tx_context","name":"TxContext","typeArguments":[]}}}],"return":[]}}}}'
);

export function loadAllTypes(coder: MoveCoder) {
  _0x2.loadAllTypes(coder);
  for (const m of Object.values(MODULES)) {
    coder.load(
      m as any,
      "0x491a2fb5081a86edfe3e4c88e22fd3bc527f464a781bd3c92d16729d9414b809"
    );
  }
}

loadAllTypes(defaultMoveCoder());