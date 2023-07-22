import { BrowserProvider,JsonRpcProvider } from 'ethers';
import { initFhevm, createInstance } from 'fhevmjs';

export const init = async () => {
  await initFhevm();
};

let instance;

export const createFhevmInstance = async () => {
  const provider = new BrowserProvider(window.ethereum) ;
//   const provider = new JsonRpcProvider('https://devnet.fhenix.io/');
  const network = await provider.getNetwork();
  const chainId = +network.chainId.toString();
  const publicKey = await provider.call({
    from: null,
    to: '0x0000000000000000000000000000000000000044',
  });
  instance = await createInstance({ chainId, publicKey });
};

export const getInstance = async () => {
  await init();
  await createFhevmInstance();
  return instance;
};