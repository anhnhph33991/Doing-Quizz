import logo from './logo.svg';
import './App.css';
import { useDispatch, useSelector } from 'react-redux';
import { increaseCounter, decreaseCounter } from './redux/action/counterAction';
import MyComponents from './components/MyComponents';

const App = () => {
  const count = useSelector(state => state.counter.count);
  const dispatch = useDispatch();

  return (
    
    <div>
      Hello World
      <MyComponents></MyComponents>
    </div>




    // <div className="App">
    //   <header className="App-header">
    //     <img src={logo} className="App-logo" alt="logo" />
    //     <p>
    //       Hi Hoang Anh
    //     </p>
    //     <div>Count = {count}</div>
    //     <button onClick={() => dispatch(increaseCounter())}>Tăng</button>
    //     <button onClick={() => dispatch(decreaseCounter())}>Giảm</button>
    //   </header>
    // </div>
  );
}

export default App;
