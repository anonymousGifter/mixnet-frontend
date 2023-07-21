import { useNavigate } from "react-router-dom";
import { Form } from "react-bootstrap";

function Deposit(){
    const navigate = useNavigate()
    const goBack = () => {
        navigate('/')
    }

    return(
        <div className="App">
            <h1>Deposit</h1>
            <div className="main-container">
                <Form className="Form-container">
                    <Form.Group controlId="formBasicEmail">
                        <Form.Label>Amount: </Form.Label> 
                        <Form.Control type="text" placeholder="Enter amount" />
                    </Form.Group>
                    <Form.Group controlId="formBasicEmail">
                        <Form.Label>Address: </Form.Label> 
                        <Form.Control type="text" placeholder="Enter amount" />
                    </Form.Group>
                </Form>
                <button onClick={goBack}>Go Back</button>
            </div>
        </div>
    );
}

export default Deposit;