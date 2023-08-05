import React, { useState } from "react";
import "./style/displayInfor.scss"
import logo from "../logo.svg"

const DisplayInfor = (props) => {
    const [isShowHide, setIsShowHide] = useState(true)
    const {listUser, handleDeleteUser} = props

    const handleShowHide = () => {
        setIsShowHide(!isShowHide)
    }
    return (
        <div className="display-infor-container">

            <div>
                <button onClick={() => handleShowHide()}>{isShowHide === true ? "Hide ListUser" : "Show ListUser"}</button>
            </div>

            {
            isShowHide &&
            <div>
                {listUser.map((item) => {
                    return (
                        <div key={item.id} className={item.age > 19 ? "green" : "red"}>
                            <h5>{item.name}</h5>
                            <h5>{item.age}</h5>
                            <button onClick={() => handleDeleteUser(item.id)}>Delete</button>
                        </div>
                    )
                })}
            </div>
            }

            <img src={logo} alt="This my logo app" className="img__logo" />

        </div>
    )
}

export default DisplayInfor