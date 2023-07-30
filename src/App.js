import logo from './logo.svg';
import './App.css';
import { useDispatch, useSelector } from 'react-redux';
import { increaseCounter, decreaseCounter } from './redux/action/counterAction';
import Header from './Components/Header/Header';


const App = () => {
  const count = useSelector(state => state.counter.count);
  const dispatch = useDispatch();
  const name = 'Hello World';

  return (
    <div className="App">
      <Header/>
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Hi {name}
        </p>
        <div>Count = {count}</div>
        <button onClick={() => dispatch(increaseCounter())}>Tăng</button>
        <button onClick={() => dispatch(decreaseCounter())}>Giảm</button>
      </header>
    </div>
  );
}

export default App;
