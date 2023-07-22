import  { createInstance } from 'fhevmjs';
import { Wallet, JsonRpcProvider, Contract } from 'ethers';
import { getInstance } from './fhevm';
import {abi} from './vars';


const CONTRACT_ADDRESS = '0x309cf2aae85ad8a1db70ca88cfd4225bf17a7482';
const provider = new JsonRpcProvider(`https://devnet.zama.ai/`);
const signer = new Wallet('0x92293977156de6e03b20b26708cb4496b523116190b5c32d77cee8286d0c41f6', provider);



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