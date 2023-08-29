import Select from 'react-select';
import { useState, useEffect } from 'react';
import { getAllQuizForAdmin, getAllUser } from '../../../../services/apiService';

export const AssignQuizz = () => {

    const [listQuiz, setListQuiz] = useState([])
    const [selectedQuiz, setSelectedQuiz] = useState({})

    const [listUser, setListUser] = useState([])
    const [selectedUser, setSelectedUser] = useState({})

    useEffect(() => {
        fetchQuiz()
        fetchUser()
    }, [])

    const fetchQuiz = async () => {
        let response = await getAllUser()
        console.log(response)
        if (response && response.EC === 0) {
            let users = response.DT.map((item) => {
                return {
                    value: item.id,
                    label: `${item.id} - ${item.username} - ${item.email}`
                }
            })
            setListUser(users)
        }
    }

    const fetchUser = async () => {
        let response = await getAllQuizForAdmin()
        if (response && response.EC === 0) {
            let newQuiz = response.DT.map((item) => { // thay vì set respone.DT như thường thì phải map qua và return trả về object như mảng options cần 
                return {
                    value: item.id,
                    label: `${item.id} - ${item.description}`
                }
            })
            setListQuiz(newQuiz)
        }
    }

    return (
        <div className="assign__quizz__container row">
            <div className="col-6 form-group">
                <label className='mb-2'>Chọn câu đố:</label>
                <Select
                    defaultValue={selectedQuiz}
                    onChange={setSelectedQuiz}
                    options={listQuiz}
                />
            </div>

            <div className="col-6 form-group">
                <label className='mb-2'>Chọn người dùng:</label>
                <Select
                    defaultValue={selectedUser}
                    onChange={setListUser}
                    options={listUser}
                />
            </div>
            <div className='d-flex justify-content-end'>
                <button className='btn btn-warning mt-3'>Assign</button>
            </div>
        </div>
    )
}
