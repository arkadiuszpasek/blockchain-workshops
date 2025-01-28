module emit_event_pkg::emit_event;

use sui::event;

public struct TheEvent has copy, drop, store {
  message: vector<u8>,
}

public fun emit_event(message: vector<u8>) {
  let event = TheEvent { message };
  event::emit(event);
}