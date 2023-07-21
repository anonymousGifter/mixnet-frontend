import { useNavigate } from "react-router-dom";


function Withdraw(){
    const navigate = useNavigate()
    const goBack = () => {
        navigate('/')
    }
    return(
        <div>
            <h1>Withdraw</h1>
            <button onClick={goBack}>Go Back</button>

        </div>
    );
}

export default Withdraw;