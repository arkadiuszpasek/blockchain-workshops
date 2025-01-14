import { SuiClient } from "@mysten/sui/client";
import { envConfig } from "./config";
import { splitCoin } from "./methods/split-coin";
import { networks } from "./methods/utils";
import { getSignerKeypair } from "./utils/keys";

export const main = async () => {
  const { senderPrivateKey } = envConfig;

  if (!senderPrivateKey) {
    throw new Error("Envs not set");
  }
  const keypair = getSignerKeypair(senderPrivateKey);
  const client = new SuiClient({ url: networks.devnet });

  await splitCoin({ amount: 1000, keypair, client });
};

main();
