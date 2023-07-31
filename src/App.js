// import logo from "./logo.svg";
import "./App.css";
// import { useDispatch, useSelector } from "react-redux";
// import { increaseCounter, decreaseCounter } from "./redux/action/counterAction";

// Import components =>>> <<<=
import MyComponents from "./components/MyComponents";

import React from "react";

class App extends React.Component {

  render() {
    return (
      <div>
        <MyComponents/>
      </div>
    );
  }
}




// const App = () => {
//   const count = useSelector(state => state.counter.count);
//   const dispatch = useDispatch();

//   return (
//     <div className="App">
//       <header className="App-header">
//         <img src={logo} className="App-logo" alt="logo" />
//         <p>
//           Hi Hoang Anh
//         </p>
//         <div>Count = {count}</div>
//         <button onClick={() => dispatch(increaseCounter())}>Tăng</button>
//         <button onClick={() => dispatch(decreaseCounter())}>Giảm</button>
//       </header>
//     </div>
//   );
// }

export default App;
