import './App.css'
import { useNavigate } from 'react-router-dom'

function App() {
  const navigate = useNavigate()

  const withdraw = () => {
    navigate('/withdraw')
  }
  const deposit = () => {
    navigate('/deposit')
  }

  return (
    <div className='App'>
      <h1>Welcome to Mixnet</h1>
      <button onClick={withdraw}>Withdraw</button>
      <button onClick={deposit}>Deposit</button>   
    </div>
  )
}

export default App
