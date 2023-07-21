import { useNavigate } from "react-router-dom";
import { Form } from "react-bootstrap";
import { useState } from "react";
import { getInstance,createFhevmInstance } from '../fhevm'
import {isAddress, toHexString} from '../Utils';

function Withdraw(){
    
    const [amount, setAmount] = useState(0)
    const [address, setAddress] = useState(0)
    const instance = createFhevmInstance();

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


        if(amount <= 0){
            alert("Amount must be greater than 0");
            return
        }
        // if(isAddress(address) === false){
        //     alert("Not a valid address");
        //     return
        // }
        console.log("Amount: ", instance);
        

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