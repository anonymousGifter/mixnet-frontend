import {SHA3} from "sha3";

export const isAddress = (address) =>{
    // function isAddress(address) {
        if (!/^(0x)?[0-9a-f]{40}$/i.test(address)) {
        // check if it has the basic requirements of an address
        return false;
    } else if (/^(0x)?[0-9a-f]{40}$/.test(address) || /^(0x)?[0-9A-F]{40}$/.test(address)) {
        // If it's all small caps or all all caps, return "true
        return true;
    } else {
        // Otherwise check each case
        return isChecksumAddress(address);
    }
}


export const isChecksumAddress = (address)=> {
    // Check each case
    address = address.replace('0x','');
    const hash = new SHA3(512);
    hash.update(address.toLowerCase());
    var addressHash = hash.digest("hex");
    for (var i = 0; i < 40; i++ ) {
        // the nth letter should be uppercase if the nth digit of casemap is 1
        if ((parseInt(addressHash[i], 16) > 7 && address[i].toUpperCase() !== address[i]) || (parseInt(addressHash[i], 16) <= 7 && address[i].toLowerCase() !== address[i])) {
            return false;
        }
    }
    return true;
}

export function addressTo32Bits(ethereumAddress) {
    // Remove the "0x" prefix if present
    const addressWithoutPrefix = ethereumAddress.startsWith("0x")
      ? ethereumAddress.slice(2)
      : ethereumAddress;
  
    // Ensure the address is exactly 40 characters long (20 bytes)
    if (addressWithoutPrefix.length !== 40) {
      throw new Error("Invalid Ethereum address format");
    }
  
    // Convert the address to a 32-bit representation (last 8 characters)
    const last8Characters = addressWithoutPrefix.slice(-8);
    const result = parseInt(last8Characters, 16);
  
    return result;
  }

export const toHexString = (bytes) =>
bytes.reduce((str, byte) => str + byte.toString(16).padStart(2, "0"), "");
