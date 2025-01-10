module send_tokens_pkg::send_tokens {
  use sui::pay;
  use sui::coin::{Coin};
  use sui::sui::{SUI};

  public fun transfer_sui_direct(
      recipient: address,
      coin: &mut Coin<SUI>,
      amount: u64,
      ctx: &mut tx_context::TxContext
  ) {
      pay::split_and_transfer<SUI>(coin, amount, recipient, ctx);
  }
}
