import { useNavigate } from "react-router-dom";
import { Form } from "react-bootstrap";
import { useState } from "react";
import { isAddress } from "ethers";
import {approve, mint} from '../transactions';
import { getInstance } from "../fhevm";
import { toHexString } from "../Utils";
import '../App.css';

function Faucet(){


    const [eamount, setEamount] = useState(0);
    const [amount, setAmount] = useState(0);    

    
    const handleAmountChange = (event) => {
        let _instance = getInstance();
        _instance.then(instance=>{
            setEamount(toHexString(instance.encrypt32(+event.target.value)));
        });
        setAmount(event.target.value)
    };
   

    

    const navigate = useNavigate()
    const nav_withdraw = () => {
        navigate('/withdraw')
    }
    const nav_deposit = () => {
        navigate('/deposit')
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

        const transaction = mint(amount);
        if(transaction) alert("Success !");
        else{
            alert("Transaction failed !")
        }
        
        //deposit the token to the mixnet contract

    }
    return(
        <div className="App">
            <h1>Welcome to <span>Mixnet</span></h1>
      
            <div className='button-container'>
                <button className="Active">Faucet</button>
                <button onClick={nav_deposit}>Deposit</button>
                <button onClick={nav_withdraw}>Withdraw</button>

            </div>
            <div className="banner-faucet">
                <span>ERC20 Address: 0x2d7d9c7a534307dEa1Ed30a6D200f7131B1F8127</span>
                <span>Check Balance: <a href="https://dapps.zama.ai/erc20/" target="blank">https://dapps.zama.ai/erc20/</a></span>


            </div>
            <div className='banner-deposit'>
                <div className="main-container">
                    <Form className="Form-container">
                        
                        <Form.Group controlId="formBasicEmail" className="form-group">
                            <Form.Label className="label"> Amount: </Form.Label> 
                            <Form.Control type="text" value={amount} placeholder="10" onChange={handleAmountChange} className="Input"/>
                        </Form.Group>
                        
                        <Form.Group controlId="formBasicEmail" className="form-group">
                            <Form.Label className="label">  </Form.Label> 
                            <Form.Control type="text" value={eamount}  disabled onChange={handleAmountChange} className="Input"/>
                        </Form.Group>

                        


                        <button onClick={confirm}>Confirm</button>

                    </Form>
                </div>
            </div>
            <span className='footer'>View on <a href=''>Github</a></span>
            
        </div>
    );
}

export default Faucet;