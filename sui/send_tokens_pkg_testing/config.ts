import "dotenv/config";

export const config = {
  packageId:
    "0x491a2fb5081a86edfe3e4c88e22fd3bc527f464a781bd3c92d16729d9414b809",
  module: "send_tokens",
  function: "transfer_sui_direct",
};

export const envConfig = {
  senderPrivateKey: process.env.SENDER_PRIVATE_KEY,
  recipientAddress: process.env.RECIPIENT_ADDR,
  coinId: process.env.COIN_ID,
};
