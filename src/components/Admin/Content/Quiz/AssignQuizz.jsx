import Select from 'react-select';
import { useState, useEffect } from 'react';
import { getAllQuizForAdmin, getAllUser, postAssignQuizz } from '../../../../services/apiService';
import { toast } from 'react-toastify';

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
        let response = await getAllQuizForAdmin()
        if (response && response.EC === 0) {
            let newQuiz = response.DT.map((item) => {
                return {
                    value: item.id,
                    label: `${item.id} - ${item.name}`
                }
            })
            setListQuiz(newQuiz)
        }
    }

    const fetchUser = async () => {
        let response = await getAllUser()
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

    const handleAssign = async () => {
        let response = await postAssignQuizz(selectedQuiz.value, selectedUser.value)
        if(response && response.EC === 0){
            toast.success(response.EM)
        }else{
            toast.error(response.EM)
        }

        // if(response && response.EC !== 0){
        //     toast.error(response.EM)
        // }
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
                    onChange={setSelectedUser}
                    options={listUser}
                />
            </div>
            <div className='d-flex justify-content-end'>
                <button className='btn btn-warning mt-3'
                    onClick={() => handleAssign()}
                >Assign</button>
            </div>
        </div>
    )
}
