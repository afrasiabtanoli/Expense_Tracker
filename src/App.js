
import './App.css';
import { addExpense, addIncome, getBalance, initWeb3 } from './store/web3Reducer';
import { useDispatch, useSelector } from 'react-redux';
import { useState } from 'react';


function App() {
  const [value, setValue] = useState('');
  const { output } = useSelector(state => state.web3);
  const dispatch = useDispatch();
  return (
    <div className="App">
      <div>
        <h2>Expense Tracker App of Afrasiab</h2>
      </div>
      <div>
        <button onClick={() => dispatch(initWeb3())}>Init Web3</button>
      </div>
      <div>
        <button onClick={() => dispatch(getBalance())}>Balance</button>
      </div>
      <div>
        
        <button onClick={() => dispatch(addIncome())}>Add Income</button>
      </div>
      <div>
      <input type='integer' onClick={(e)=>{
          setValue(e.target.value)
        }}></input>
        <button onClick={() => dispatch(addExpense(value))}>Add Expense</button>
      </div>
      <div>
        <p>{output}</p>
      </div>
    </div>
  );
}

export default App;
