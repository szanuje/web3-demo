async function main() {
  const [deployer] = await ethers.getSigners();

  console.log({
    deployment: {
      address: deployer.address,
      balance: (await deployer.getBalance()).toString(),
    },
  });

  const storageContract = await ethers.getContractFactory("Storage");

  const storage = await storageContract.deploy();

  console.log({
    deployedContracts: {
      Storage: storage.address,
    },
  });
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
