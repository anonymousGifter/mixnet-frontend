import { createConfig, configureChains, mainnet } from 'wagmi';
import { useConnect } from 'wagmi';
import { Wallet, JsonRpcProvider, Contract } from 'ethers';
import { getInstance } from './fhevm';
import {abi} from './vars';
import { MetaMaskConnector } from 'wagmi/connectors/metaMask'

const CONTRACT_ADDRESS = '0x67ae9339102C41C2a63562d5826deB8298b0Ed6A';
const provider = new JsonRpcProvider(`https://devnet.fhenix.io/`);
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
const connector = new MetaMaskConnector({ chains: [mainnet] });

const signer = provider.getSigner();



export const deposit = async (to, amount) => {
  // Initialize contract with ethers
  const contract = new Contract(CONTRACT_ADDRESS, abi, signer);
  // Get instance to encrypt amount parameter
  const instance = await getInstance();
  instance.then((instance) => {
    const encryptedAmount = instance.encrypt32(amount);
    const encryptedAddress = instance.encrypt32(to);

    const transaction = contract['deposit(bytes,bytes)'](encryptedAddress, encryptedAmount);
    return transaction;
  });
  return null;
};

export const withdraw = async (amount) => {
    // Initialize contract with ethers
    const contract = new Contract(CONTRACT_ADDRESS, abi, signer);
    // Get instance to encrypt amount parameter
    const instance = await getInstance();
    instance.then((instance) => {
      const encryptedAmount = instance.encrypt32(amount);
  
      const transaction = contract['withdraw(bytes)'](encryptedAmount);
      return transaction;
    });
    return null;
  };

export const approve = async (amount) => {
    // Initialize contract with ethers
    const contract = new Contract(CONTRACT_ADDRESS, abi, signer);
    // Get instance to encrypt amount parameter
    const instance = await getInstance();
    instance.then((instance) => {
      const encryptedAmount = instance.encrypt32(amount);
  
      const transaction = contract['approve(bytes)'](encryptedAmount);
      return transaction;
    });
    return null;
  };