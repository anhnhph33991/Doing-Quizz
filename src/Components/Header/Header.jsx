import React from 'react'

const Header = () => {

    const user = [
        {
            name: "User1",
            age: 19
        },
        {
            name: "User2",
            age: 19
        },
        {
            name: "User3",
            age: 19
        }
    ]

    const getUser = user.filter((item) => item.name === "User1")

    const {name, age} = getUser[0];


  return (
    <div>
        <ul>
            <li>
                <h6>{name}</h6>
                <h6>{age}</h6>
            </li>
        </ul>
    </div>
  )
}

export default Header