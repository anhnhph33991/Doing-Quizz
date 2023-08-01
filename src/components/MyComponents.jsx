import React from "react";
import AddUserInfor from "./AddUserInfor";
import DisplayInfor from "./DisplayInfor";
// import ListUser from "./ListUser";

class MyComponents extends React.Component {

  state = {
    listUser: [
      { id: 1, name: "User1", age: 19 },
      { id: 2, name: "User2", age: 20 },
      { id: 3, name: "User3", age: 21 }
    ]
  }

  handleAddNewUser = (useObj) => {
      this.setState({
        listUser: [useObj, ...this.state.listUser]
      })
  }

  render() {
    return (
      <>
        <AddUserInfor handleAddNewUser={this.handleAddNewUser}/>
        <br /> <br />
        <DisplayInfor listUser={this.state.listUser}/>
        {/* <ListUser/> */}
      </>
    );
  }
}

export default MyComponents;
