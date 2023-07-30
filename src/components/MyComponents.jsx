import React from "react";
class MyComponents extends React.Component {

  state = {
    name: "LuxChill",
    address: "Hoai Duc",
    age: 19,
  };

  handleClick(event){
    // console.log("click me success");
    // console.log(event.target);

    console.log(`My name is ${this.state.name}`)

    this.setState({
        name: "Hoang Anh",
        address: "Song Phuong"
    })
  }

  handleOnMouse(event){
    console.log(event.pageX);
  }

  render() {
    return (
      <div>
        My name is {this.state.name} and I'm from {this.state.address}

        <button onClick={(event) => {this.handleClick(event)}}>Change Name</button>
        <button onMouseOver={this.handleOnMouse}>Hover Mouse</button>
      </div>
    );
  }
}

export default MyComponents;
