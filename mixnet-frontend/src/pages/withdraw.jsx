import { useNavigate } from "react-router-dom";
import { Form } from "react-bootstrap";
import { useState } from "react";
// import {isAddress} from 'web3-validator';
// import {isAddress}
import { Wallet, JsonRpcProvider, Contract } from "ethers";
import {isAddress, toHexString} from '../Utils';
import { createInstance } from "fhevmjs";

function Withdraw(){
    



    const [amount, setAmount] = useState(0)
    const [address, setAddress] = useState(0)

    const handleAmountChange = (event) => {
        setAmount(event.target.value)
    }
    const handleAddressChange = (event) => {
        setAddress(event.target.value)
    }
    
    const navigate = useNavigate()
    const goBack = () => {
        navigate('/')
    }

    const confirm = (e) => {
        e.preventDefault();

        const provider = new JsonRpcProvider("https://devnet.fhenix.io/");
        const wallet = new Wallet("0x92293977156de6e03b20b26708cb4496b523116190b5c32d77cee8286d0c41f6", provider);

        let _instance;

        const getInstance = async () => {
            if (_instance) return _instance;

            // 1. Get chain id
            const network = await provider.getNetwork();
            const chainId = +network.chainId.toString(); // Need to be a number

            // Get blockchain public key
            const publicKey = await provider.call({
                to: "0x0000000000000000000000000000000000000044",
            });

            // Create instance
            _instance = createInstance({ chainId, publicKey });
            return _instance;
        };
        if(amount <= 0){
            alert("Amount must be greater than 0");
            return
        }
        // if(isAddress(address) === false){
        //     alert("Not a valid address");
        //     return
        // }
        const instance = getInstance();
        const encryptedAmount = instance.encrypt32(amount);
        console.log("encryptedAmount: ", toHexString(encryptedAmount));

    }
    return(
        <div className="App">
        <h1>Withdraw</h1>
        <div className="main-container">
            <Form className="Form-container">
                <Form.Group controlId="formBasicEmail">
                    <Form.Label>Amount: </Form.Label> 
                    <Form.Control type="text" placeholder="Enter amount" onChange={handleAmountChange}/>
                </Form.Group>
                <Form.Group controlId="formBasicEmail">
                    <Form.Label>Address: </Form.Label> 
                    <Form.Control type="text" placeholder="Enter amount" onChange={handleAddressChange}/>
                </Form.Group>
                <button onClick={confirm}> Confirm </button>
            </Form>
            <button onClick={goBack}>Go Back</button>
        </div>
    </div>
    );
}

export default Withdraw;