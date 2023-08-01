import { useState } from 'react'

const ListUser = () => {
    let [check, setCheck] = useState(true) // set biến check === true
    const [listUser, setListUser] = useState([
        {
            id: 1,
            name: "User1",
            age: 19
        },
        {
            id: 2,
            name: "User2",
            age: 20
        },
        {
            id: 3,
            name: "User3",
            age: 21
        }
    ]) // set array object 

    const showHideList = () => {
        setCheck(check = !check) // setCheck = ! khác giá trị check hiện tại
    }

    return (
        <div>

            <div>
                <button className='showHide' onClick={() => showHideList()}>{check === true ? "Hide ListUser" : "Show ListUser"} {/** check === true ? hiển thị Hide : Ngược lại hiển thị Show */} </button> 
            </div>

            {/** check = true ? Thực thi : Không thực thi phải có dấu && */}
            { check &&
                <div>
                    {
                        listUser.map((user) => {
                            return (
                                <div key={user.id} className={user.age > 19 ? "green" : "red"}>
                                    <div>My name's: {user.name}</div>
                                    <div>My name's: {user.age}</div>
                                </div>
                            )
                        })
                    }

                </div>
            }
        </div>
    )
}

export default ListUser