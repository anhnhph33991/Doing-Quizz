import { useState, useEffect } from 'react'

const ListUser = () => {
    const [check, setCheck] = useState(true) // set biến check === true
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

    const [date, setDate] = useState(new Date())
    let interval;

    useEffect(() => {
        interval = setInterval(() => {
            tick()
        }, 1000)    
        return () => {
            clearInterval(interval)
        }
    }, [])

    const tick = () => {
        setDate(new Date())
    }

    const format = val => {
        if(val < 10){
            val = "0" + val
        }

        return val
    }



    const showHideList = () => {
        setCheck(!check) // setCheck = ! khác giá trị check hiện tại
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

            {/** Create clock */}
            <div className="clock__date">
                <h3>Đồng Hồ - <span>{date.getHours()} : {format(date.getMinutes())} : {format(date.getSeconds())}</span></h3>
            </div>
        </div>
    )
}

export default ListUser