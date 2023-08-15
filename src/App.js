import React from "react";
// import logo from "./logo.svg";
import "./App.scss";
import { useDispatch, useSelector } from "react-redux";
import { increaseCounter, decreaseCounter} from "./redux/action/counterAction";
import MyComponents from "./components/MyComponents"

const App = () => {
  const count = useSelector(state => state.counter.count)
  const dispatch = useDispatch()

  return (
    <div className="App-Container">
       <MyComponents />

       <div className="count__container">
        <h5>Count {count}</h5>
        <button onClick={() => dispatch(increaseCounter())}>Tang</button>
        <button onClick={() => dispatch(decreaseCounter())}>Giam</button>
       </div>
    </div>
  );
};

export default App;
