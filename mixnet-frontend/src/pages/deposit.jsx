import { useNavigate } from "react-router-dom";


function Deposit(){
    const navigate = useNavigate()
    const goBack = () => {
        navigate('/')
    }

    return(
        <div className="App">
            <h1>Deposit</h1>
            <form>
                <label>
                    Amount:
                    <input type="text" name="amount" />
                </label>
                <input type="submit" value="Submit" />
            </form>
            <button onClick={goBack}>Go Back</button>
        </div>
    );
}

export default Deposit;