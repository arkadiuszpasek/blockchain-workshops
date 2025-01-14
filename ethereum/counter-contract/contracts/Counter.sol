// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.28;

contract Counter {
    uint64 public count;

    function getCount() public view returns (uint64) {
        return count;
    }

    function increase() public {
        count += 1;
    }
}
