import React from "react";

class UserInfor extends React.Component {

  state = {
    name: "LuxChill",
    address: "Hoai Duc",
    age: 19
  }

  handleOnSubmit = (event) => {
    event.preventDefault()
    console.log(this.state)
  }

  handleOnChangeName = (event) => {
    this.setState({
      name: event.target.value
    })
  }

  handleOnChangeAge = (event) => {
    this.setState({
      age: event.target.value
    })
  }

  render() {
    return (
      <div>
        My name is {this.state.name} and I'm {this.state.age}
        <form onSubmit={(event) => this.handleOnSubmit(event)}>
          <label>Your name: </label>
          <input
            type="text"
            onChange={(event) => this.handleOnChangeName(event)}
            value={this.state.name}
          />

          <label>Your age: </label>
          <input
            type="text"
            onChange={(event) => this.handleOnChangeAge(event)}
            value={this.state.age}
          />
          <button>Submit</button>
        </form>
      </div>
    )
  }
}

export default UserInfor;