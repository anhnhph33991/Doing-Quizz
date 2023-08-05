import React, { useState } from "react";
import AddUserInfor from "./AddUserInfor";
import DisplayInfor from "./DisplayInfor";

const MyComponents = () => {
  const [listUser, setListUser] = useState([
    { id: 1, name: "Admin1", age: 19 },
    { id: 2, name: "Admin2", age: 20 },
    { id: 3, name: "Admin3", age: 30 }
  ])

  const handleAddNewUser = (userOjb) => {
    setListUser([userOjb, ...listUser]);
  }

  const handleDeleteUser = (userId) => {
    let userClone = [...listUser]
    userClone = userClone.filter((user) => user.id !== userId)
    setListUser(userClone)
  }

  return (
    <>
      <AddUserInfor handleAddNewUser={handleAddNewUser} />
      <DisplayInfor listUser={listUser} handleDeleteUser={handleDeleteUser} />
    </>
  )
}

export default MyComponents;
