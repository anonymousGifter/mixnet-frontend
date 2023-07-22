import { useNavigate } from "react-router-dom";
import { Form } from "react-bootstrap";
import { useState } from "react";
import { isAddress } from "ethers";
import {approve,deposit} from '../transactions';
import { getInstance } from "../fhevm";
import { toHexString } from "../Utils";
import '../App.css';

function Deposit(){

    const [amount, setAmount] = useState(0);
    const [address, setAddress] = useState(0);
    const [eamount, setEamount] = useState(0);
    const [eaddress, setEaddress] = useState(0);
    const [approval, setApproval] = useState(false);

    const handleApprovalChange = (event) => {
        setApproval(event.target.checked)
    };
    const handleAmountChange = (event) => {
        let _instance = getInstance();
        _instance.then(instance=>{
            setEamount(toHexString(instance.encrypt32(+event.target.value)));
        });
        setAmount(event.target.value)
    };
    const handleAddressChange = (event) => {
        let _instance = getInstance();
        _instance.then(instance=>{
            console.log(instance);

            setEaddress(toHexString(instance.encrypt32(+event.target.value)));
        });
        setAddress(event.target.value);
    };

    

    const navigate = useNavigate()
    const nav_withdraw = () => {
        navigate('/withdraw')
    }
    
    const nav_faucet = () => {
        navigate('/faucet')
      }

      const depositx = async(e) => {
        e.preventDefault();
        console.log("called")
        console.log(address, amount);
        await deposit(address, amount);
      }
    const confirm = async (e) => {
        e.preventDefault();

        // if(approval === false){
        //     alert("Please give approval to the mixnet contract");
        //     return
        // }
        // if(amount <= 0){
        //     alert("Amount must be greater than 0");
        //     return
        // }
        // if(isAddress(address) === false){
        //     alert("Not a valid address");
        //     return
        // }
        const transaction = await approve(amount);
        // if(transaction){
        //     const transaction2 = deposit(amount);
        //     if(transaction) alert("Success !");
        //     else{
        //         alert("Transaction failed !")
        //     }
        // }
        // else{
        //     alert("Transaction not approved")
        // }
        //approve the mixnet contract to spend the token
        //deposit the token to the mixnet contract

    }
    return(
        <div className="App">
            <h1>Welcome to <span>Mixnet</span></h1>
      
            <div className='button-container'>
                <button onClick={nav_faucet}>Faucet</button>
                <button className="Active">Deposit</button>
                <button onClick={nav_withdraw}>Withdraw</button>

            </div>
            <div className='banner-deposit'>
                <div>First, please give token approval to the mixnet contract (0x2d7d9c7a534307dEa1Ed30a6D200f7131B1F8127)</div>
            <button onClick={(e) => confirm(e)}>Approve</button>
                <div className="main-container">
                    <Form className="Form-container">
                        <Form.Group controlId="formBasicEmail" className="form-group">
                            <Form.Label className="label"> Recipient: </Form.Label> 
                            <Form.Control type="text" placeholder="0x2d7d9c7a534307dEa1Ed30a6D200f7131B1F8127" value={address} onChange={handleAddressChange} className="Input"/>
                        </Form.Group>
                        
                        <Form.Group controlId="formBasicEmail" className="form-group">
                            <Form.Label className="label">  </Form.Label> 
                            <Form.Control type="text" value={eaddress} disabled onChange={handleAmountChange} className="Input"/>
                        </Form.Group>

                        <Form.Group controlId="formBasicEmail" className="form-group">
                            <Form.Label className="label"> Amount: </Form.Label> 
                            <Form.Control type="text" value={amount} placeholder="10" onChange={handleAmountChange} className="Input"/>
                        </Form.Group>
                        
                        <Form.Group controlId="formBasicEmail" className="form-group">
                            <Form.Label className="label">  </Form.Label> 
                            <Form.Control type="text" value={eamount}  disabled onChange={handleAmountChange} className="Input"/>
                        </Form.Group>

                        <Form.Group controlId="formBasicEmail" className="form-group">
                            <Form.Control type="checkbox" value={approval} onChange={handleApprovalChange}/>
                            <Form.Label className="label-small"> First, please give token approval to the mixnet contract ! </Form.Label> 

                        </Form.Group>


                        <button onClick={(e)=>depositx(e)}>Deposit</button>

                    </Form>
                </div>
            </div>
            <span className='footer'>View on <a href=''>Github</a></span>
            
        </div>
    );
}

export default Deposit;