import React, { useState } from "react";
import "./style/addUserInfor.scss"


const AddUserInfor = (props) => {
  const [name, setName] = useState('')
  const [age, setAge] = useState('')
  const {handleAddNewUser} = props


  const handleOnChangeName = (e) => {
    setName(e.target.value)
  }

  const handleOnChangeAge = (e) => {
    setAge(e.target.value)
  }

  const handleOnSubmit = (e) => {
      e.preventDefault()
      handleAddNewUser({
        id: Math.floor((Math.random() * 100) + 1) + "-random",
        name: name,
        age: age
      })
  }



  return (
    <div className="form__add">
      <form onSubmit={(e) => handleOnSubmit(e)}>
        <h5>My name: <span className="text__red">{name}</span> and My age: <span className="text__red">{age}</span></h5>
        <label>Name: </label>
        <input type="text" value={name} onChange={(e) => handleOnChangeName(e)}/>
        <label>Age: </label>
        <input type="text" value={age} onChange={(e) => handleOnChangeAge(e)}/>
        <button>Submit</button>
      </form>
    </div>    
  )
}

export default AddUserInfor;