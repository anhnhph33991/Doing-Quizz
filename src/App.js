// import logo from "./logo.svg";
import React from "react";
import "./App.scss";
// import { useDispatch, useSelector } from "react-redux";
// import { increaseCounter, decreaseCounter } from "./redux/action/counterAction";

// Import components =>>> <<<=
import MyComponents from "./components/MyComponents";

class App extends React.Component {

  render() {
    return (
      <div className="App-Container">
        <MyComponents/>
      </div>
    );
  }
}


export default App;
