import './App.css'
import { useNavigate } from 'react-router-dom';


function App() {
  const navigate = useNavigate()

  const nav_withdraw = () => {
    navigate('/withdraw')
  }
  const nav_deposit = () => {
    navigate('/deposit')
  }

  const nav_faucet = () => {
    navigate('/faucet')
  }


  return (
    <div className='App'>
      {/* <div>
      Connected to {address}
        <button onClick={() => disconnect()}>Disconnect</button>
      </div> */}
      <h1>Welcome to <span>Mixnet</span></h1>
      
      <div className='button-container'>
        <button onClick={nav_faucet}>Faucet</button>
        <button onClick={nav_deposit}>Deposit</button>
        <button onClick={nav_withdraw}>Withdraw</button>
      </div>
      <div className='banner'>
        <span>Select Action From Menu</span>
        <br/>
        <span id='diclaimer'>Disclaimer: Hackathon and research purposes !</span>
      </div>
      <span className='footer'>View on <a href=''>Github</a></span>
    </div>
  )
}

export default App
