import { SuiClient } from "@mysten/sui/client";
import { logger, shorten } from "../utils";
import { networks } from "./utils";

interface Parameters {
  address: string;
}

export async function listSuiBalance({ address }: Parameters) {
  logger.debug(`Calling get coins with address: ${address}`);
  const client = new SuiClient({ url: networks.devnet });

  const result = await client.getCoins({
    owner: address,
    coinType: "0x2::sui::SUI",
  });

  const formatted = result.data.map((coin) => `${coin.balance}`).join(", ");

  logger.info(`Coins @ ${shorten(address)}: ${formatted} (SUI)`);
}
