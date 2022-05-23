import { useState } from "react";
import toast from "react-hot-toast";
import {
  useAccount,
  useContractRead,
  useContractWrite,
  useSigner,
} from "wagmi";
import storageABI from "../abi/Storage.json";

const STORAGE_ADDRESS = process.env.REACT_APP_STORAGE_ADDRESS as string;

const txUrl = "https://rinkeby.etherscan.io/tx";

export function Store() {
  const { data: signer } = useSigner();
  const { data: account, isLoading: accountLoading } = useAccount();
  const [val, setVal] = useState<number>(0);

  const { data: storedVal } = useContractRead(
    {
      addressOrName: STORAGE_ADDRESS,
      contractInterface: storageABI,
    },
    "retrieve",
    {
      watch: true,
      enabled: !!account && !accountLoading,
    }
  );

  const { write: storeVal } = useContractWrite(
    {
      addressOrName: STORAGE_ADDRESS,
      contractInterface: storageABI,
      signerOrProvider: signer,
    },
    "store",
    {
      args: [val],
      onSuccess(tx) {
        console.log(tx);
        const url = `${txUrl}/${tx.hash}`;
        toast.success(
          <div className="space-x-1 inline-flex">
            <p>Transaction sent:</p>
            <a className="text-sky-500" href={url}>
              See on Etherscan
            </a>
          </div>,
          {
            duration: 8000,
          }
        );
      },
      onError(e) {
        toast.error("Something went wrong");
        console.error(e);
      },
    }
  );

  return (
    <div className="flex flex-col items-start justify-between w-full px-10 lg:flex-row">
      <div className="relative z-10 w-full max-w-3xl mt-20 lg:mt-0">
        <div className="relative z-10 flex flex-col items-start justify-start p-10 bg-white shadow-2xl rounded-xl">
          <h4 className="w-full text-xl font-medium leading-snug">
            Store value
          </h4>
          <div className="relative w-full mt-6 space-y-8">
            <div className="relative w-full">
              <label className="absolute px-2 ml-2 -mt-3 font-medium text-gray-600 bg-white">
                Number
              </label>
              <input
                type="text"
                className="block w-full px-4 py-4 mt-2 text-base placeholder-gray-400 bg-white border border-gray-300 rounded-md focus:outline-none focus:border-black"
                placeholder="69"
                onChange={({ target: { value } }) => {
                  let x = 0;
                  try {
                    x = parseInt(value);
                    setVal(x);
                  } catch (error) {
                    toast.error("Please type in a number");
                  }
                }}
              />
            </div>

            <div>
              <button
                className="inline-block w-full px-5 py-4 text-xl font-medium text-center text-white transition duration-200 bg-blue-600 rounded-lg hover:bg-blue-500 ease"
                onClick={() => {
                  if (!account) {
                    toast.error("Connect your wallet");
                    return;
                  }
                  if (val <= 0) {
                    toast.error("Type in a positive integer");
                    return;
                  }

                  storeVal();
                }}
              >
                Store value
              </button>
            </div>
          </div>
          <h1>Currently stored: {storedVal?.toString()}</h1>
        </div>
      </div>
    </div>
  );
}
