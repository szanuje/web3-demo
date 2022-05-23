// UNUSED

import { ethers } from "ethers";
import storageABI from "../abi/Storage.json";

const storageAddress = "0x0";

export const store = async (
  val: number,
  ethereum: any // browser extension
) => {
  const provider = new ethers.providers.Web3Provider(ethereum);
  const mtknContract = getStorageContract(provider);

  const signer = mtknContract.connect(provider.getSigner());

  return await signer.store(val);
};

export const getStorageContract = (provider: ethers.providers.Web3Provider) =>
  new ethers.Contract(storageAddress, storageABI, provider);
