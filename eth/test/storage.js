const { expect } = require("chai");

describe("Storage contract", function () {
  it("Deployment should assign the total supply of tokens to the owner", async function () {
    const NUM = 69;

    const storageContract = await ethers.getContractFactory("Storage");

    const storage = await storageContract.deploy();

    await storage.store(NUM);

    expect(await storage.retrieve()).to.equal(NUM);
  });
});
