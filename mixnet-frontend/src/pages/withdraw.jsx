import { useNavigate } from "react-router-dom";
import { Form } from "react-bootstrap";
import { useState } from "react";
import { isAddress } from "ethers";
import {withdraw} from '../transactions';
import '../App.css';



function Withdraw(){
    const navigate = useNavigate()

    const nav_withdraw = () => {
        navigate('/')
    }
    const nav_deposit = () => {
        navigate('/deposit')
    }

    const [amount, setAmount] = useState(0)
    const [address, setAddress] = useState(0)

    const handleAmountChange = (event) => {
        setAmount(event.target.value)
    }
    const handleAddressChange = (event) => {
        setAddress(event.target.value)
    }
    
    

    const confirm = (e) => {
        e.preventDefault();


        if(amount <= 0){
            alert("Amount must be greater than 0");
            return
        }
        if(isAddress(address) === false){
            alert("Not a valid address");
            return
        }
        withdraw(amount);
       
        

    }
    return(
        <div className="App">
            <h1>Welcome to <span>Mixnet</span></h1>
      
            <div className='button-container'>
                <button onClick={nav_withdraw} className="Active">Withdraw</button>
                <button onClick={nav_deposit}>Deposit</button>
                <button onClick={nav_deposit}>Deposit</button>
            </div>
            <div className='banner'>
                {/* <div className="main-container">
                    <Form className="Form-container">
                        <Form.Group controlId="formBasicEmail">
                            <Form.Label>Amount: </Form.Label> 
                            <Form.Control type="text" placeholder="Enter amount" onChange={handleAmountChange}/>
                        </Form.Group>
                        
                        <button onClick={confirm}> Confirm </button>
                    </Form>
                </div> */}
                <span>Please switch to the recipient account to withdraw all the funds.</span>
                <br/>
                <span>Check Balance: <a href="https://dapps.zama.ai/erc20/" target="blank">https://dapps.zama.ai/erc20/</a></span>
            </div>
            <span className='footer'>View on <a href=''>Github</a></span>
        
    </div>
    );
}

export default Withdraw;