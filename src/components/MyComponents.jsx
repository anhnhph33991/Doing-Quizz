import React from "react";
import UserInfor from "./UserInfor";
import DisplayInfor from "./DisplayInfor";

class MyComponents extends React.Component {
  render() {
    return (
      <>
        <UserInfor />
        <br /> <br />
        <DisplayInfor name={"Hoang Anh"} age={19}/>
      </>
    );
  }
}

export default MyComponents;
