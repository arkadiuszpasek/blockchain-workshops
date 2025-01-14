import {
  time,
  loadFixture,
} from "@nomicfoundation/hardhat-toolbox/network-helpers";
import { anyValue } from "@nomicfoundation/hardhat-chai-matchers/withArgs";
import { expect } from "chai";
import hre from "hardhat";

describe("Counter", function () {
  async function deployCounterFixture() {
    const ONE_YEAR_IN_SECS = 365 * 24 * 60 * 60;
    const ONE_GWEI = 1_000_000_000;

    const lockedAmount = ONE_GWEI;
    const unlockTime = (await time.latest()) + ONE_YEAR_IN_SECS;

    // Contracts are deployed using the first signer/account by default
    const [owner, otherAccount] = await hre.ethers.getSigners();

    const Counter = await hre.ethers.getContractFactory("Counter");
    const counter = await Counter.deploy();

    return { counter, owner, otherAccount };
  }

  describe("Deployment", function () {
    it("Should set the right count", async function () {
      const { counter } = await loadFixture(deployCounterFixture);

      expect(await counter.getCount()).to.equal(0);
    });
  });

  describe("Increase", function () {
    it("Should increase", async function () {
      const { counter } = await loadFixture(deployCounterFixture);

      await counter.increase();
      expect(await counter.getCount()).to.equal(1);
    });
  });
});
