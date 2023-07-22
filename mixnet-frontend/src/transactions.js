import { Wallet, Contract } from "ethers";
import { getInstance, provider } from "./fhevm";
import { abi } from "./vars";
import { abi2 } from "./vars2";
import { toHexString, addressTo32Bits } from "./Utils";
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
  console.log("res", typeof to, amount);
  // Initialize contract with ethers
  const contract = new Contract(CONTRACT_ADDRESS, abi2, signer);
  // Get instance to encrypt amount parameter
  const instance = await getInstance();
  console.log("instance", instance);
  console.log("test");
  const encryptedAmount = "0x" + toHexString(instance.encrypt32(10));
  console.log("test");
  const encryptedAddress =
    "0x" + toHexString(instance.encrypt32(addressTo32Bits(to)));
  console.log("encryptedAmount", encryptedAmount, encryptedAddress);
  const transaction = await contract["deposit(bytes,bytes)"](
    encryptedAddress,
    encryptedAmount
  );
};

export const withdraw = async () => {
  // Initialize contract with ethers
  console.log("calledx");
  const contract = new Contract(CONTRACT_ADDRESS, abi2, signer);
  const transaction = await contract["withdraw()"]();
};

export const approve = async (to, amount) => {
  // Initialize contract with ethers
  const contract = new Contract(CONTRACT_ADDRESS_ERC20, abi, signer);
  // Get instance to encrypt amount parameter
  const instance = await getInstance();
  const encryptedAmount = "0x" + toHexString(instance.encrypt32(10));
  const transaction = contract["approve(address, bytes)"](
    CONTRACT_ADDRESS,
    encryptedAmount
  );
};

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
