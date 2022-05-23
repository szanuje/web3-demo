## Description

Simple React app that intract with Ethereum smart contract.

## Tech stack

- React.js
- [WAGMI](https://wagmi.sh/)
- [Solidity](https://docs.soliditylang.org/en/v0.8.14/)
- [Hardhat](https://hardhat.org/)

## Run

`npm install` \
`npm run start` \
environment variable is needed: `REACT_APP_STORAGE_ADDRESS`

## Build

`npm run build`

## Deploy to IPFS

- Use [Fleek](https://fleek.co/) \
  or
- Download IPFS client [IPFS](https://dist.ipfs.io/#go-ipfs)
- Unzip and install \
  `tar xvfz <file>.tar.gz` \
  `cd go-ipfs` \
  `./install.sh`
- Upload build \
  `ipfs add -r build`
- Start local node \
  `ipfs daemon`
- Access content \
  `http://127.0.0.1:8080/ipfs/<CID>`

## Deploy contracts

- Compile \
  `npm run compile`
- Test \
  `npm run test`
- Deploy \
  `npm run deploy-local` \
  or \
  `npm run deploy-rinkeby` \
  environment variables are needed: \
  `ALCHEMY_API_KEY` \
  `WALLET_PRIVATE_KEY`

- Verify \
  `npm run verify-rinkeby <ADDRESS>`
  environment variable is needed: \
  `ETHERSCAN_KEY`
