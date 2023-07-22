import { useNavigate } from "react-router-dom";
import { Form } from "react-bootstrap";
import { useState } from "react";
import { isAddress } from "ethers";
import {withdraw} from '../transactions';
import '../App.css';



function Withdraw(){
    const navigate = useNavigate()

    
    const nav_deposit = () => {
        navigate('/deposit')
    }
    const nav_faucet = () => {
        navigate('/faucet')
    }

    
    

    const confirm = async (e) => {
        e.preventDefault();
        console.log("calling")
        await withdraw();
        // if(await withdraw(amount)) alert("Success !!");
        // else alert("Transaction failed !");
       
        

    }
    return(
        <div className="App">
            <h1>Welcome to <span>Mixnet</span></h1>
      
            <div className='button-container'>
                <button onClick={nav_faucet}>Faucet</button>
                <button onClick={nav_deposit}>Deposit</button>
                <button className="Active">Withdraw</button>

            </div>
            <div className='banner'>
            
                <span>Please switch to the recipient account to withdraw all the funds.</span>
                <br/>
                <span>Check Balance: <a href="https://dapps.zama.ai/erc20/" target="blank">https://dapps.zama.ai/erc20/</a></span>
            </div>
            <button onClick={(e) => confirm(e)}> Withdraw</button>
            <span className='footer'>View on <a href=''>Github</a></span>
        
    </div>
    );
}

export default Withdraw;