import React from "react";

class AddUserInfor extends React.Component {

  state = {
    name: "", 
    address: "Hoai Duc",
    age: ""
  }

  handleOnSubmit = (event) => {
    event.preventDefault()
    this.props.handleAddNewUser({
      id: Math.floor((Math.random() * 100) + 1) + "-random",
      name: this.state.name,
      age: this.state.age
    })
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

export default AddUserInfor;