import { Wallet, Contract } from "ethers";
import { getInstance, provider } from "./fhevm";
import { abi } from "./vars";
import { toHexString } from "./Utils";
const CONTRACT_ADDRESS = "0x67ae9339102C41C2a63562d5826deB8298b0Ed6A";
const CONTRACT_ADDRESS_ERC20 = "0x2d7d9c7a534307dEa1Ed30a6D200f7131B1F8127";
// const { chains, publicClient, webSocketPublicClient } = configureChains(
//   [mainnet],
//   provider,
// );
// const config = createConfig({
//   autoConnect: true,
//   connectors: [
//     new MetaMaskConnector({ chains }),
//   ],
//   publicClient,
//   webSocketPublicClient,
// });
// const connector = new MetaMaskConnector({ chains: [mainnet] });

const signer = await provider.getSigner();

export const deposit = async (to, amount) => {
  // Initialize contract with ethers
  const contract = new Contract(CONTRACT_ADDRESS, abi, signer);
  // Get instance to encrypt amount parameter
  const instance = await getInstance();
  instance.then((instance) => {
    const encryptedAmount = "0x" + toHexString(instance.encrypt32(amount));
    const encryptedAddress = "0x" + toHexString(instance.encrypt32(to));

    const transaction = contract["deposit(bytes,bytes)"](
      encryptedAddress,
      encryptedAmount
    );
    return transaction;
  });
  return null;
};

export const withdraw = async () => {
  // Initialize contract with ethers
  const contract = new Contract(CONTRACT_ADDRESS, abi, signer);
  const transaction = contract["withdraw()"](encryptedAmount);
  return transaction;
};

export const approve = async (amount) => {
  // Initialize contract with ethers
  const contract = new Contract(CONTRACT_ADDRESS, abi, signer);
  // Get instance to encrypt amount parameter
  const instance = await getInstance();
  instance.then((instance) => {
    const encryptedAmount = "0x" + toHexString(instance.encrypt32(amount));

    const transaction = contract["approve(bytes)"](encryptedAmount);
    return transaction;
  });
  return null;
};

// export const mint = async (amount) => {
//   console.log("called");
//   console.log("signer", signer);
//   const contract = new Contract(CONTRACT_ADDRESS, abi, signer);
//   const instance = await getInstance();
//   console.log("instance", instance);
//   const encryptedAmount = "0x" + toHexString(instance.encrypt32(amount));
//   const transaction = await contract["mint(bytes)"](to, encryptedAmount);

//   // instance.then((instance) => {
//   //   const encryptedAmount = "0x" + toHexString(instance.encrypt32(amount));
//   //   const transaction = contract["mint(bytes)"](encryptedAmount);
//   //   return transaction;
//   // });

//   return null;
// };

export const mint = async (amount) => {
  try {
    console.log("called");
    console.log("amount", amount);
    console.log("signer", signer);
    const contract = new Contract(CONTRACT_ADDRESS_ERC20, abi, signer);
    const instance = await getInstance();
    console.log("instance", instance);

    const encryptedAmount = "0x" + toHexString(instance.encrypt32(+amount));
    console.log("encryptedAmount", encryptedAmount);
    const transaction = await contract["mint(bytes)"](encryptedAmount);

    return transaction;
  } catch (error) {
    console.error("Mint error:", error);
    return null;
  }
};
