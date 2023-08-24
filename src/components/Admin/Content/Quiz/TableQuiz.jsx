import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import { getAllQuizForAdmin } from '../../../../services/apiService'
import { AiFillDelete, AiFillEdit } from 'react-icons/ai';
import ModalUpdateQuiz from './Modal/ModalUpdateQuiz';
import ModalDeleteQuiz from './Modal/ModalDeleteQuiz';

const TableQuiz = () => {
    const [listQuiz, setListQuiz] = useState([])
    const [isShowUpdate, setIsShowUpdate] = useState(false)
    const [isShowDelete, setIsShowDelete] = useState(false)

    // data detail quiz ?
    const [dataUpdate, setDataUpdate] = useState({})
    const [dataDelete, setDataDelete] = useState({})

    useEffect(() => {
        fetchQuiz()
    }, [])

    const fetchQuiz = async () => {
        let response = await getAllQuizForAdmin()
        if (response && response.EC === 0) {
            setListQuiz(response.DT)
            console.log(response)
        }
    }

    const handleModalUpdate = () => {
        setIsShowUpdate(true)
    }

    const handleModalDelete = (user) => {
        setIsShowDelete(true)
        setDataDelete(user)
    }

    return (
        <>
            <div>List Quizzes: </div>
            <table className="table table-hover table-bordered mt-2 mb-2">
                <thead>
                    <tr>
                        <th scope="col">ID</th>
                        <th scope="col">Name</th>
                        <th scope="col">Description</th>
                        <th scope="col">Type</th>
                        <th scope="col">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        listQuiz.map((item, index) => {
                            return (
                                <tr key={`table-quiz-${index}`}>
                                    <td>{item.id}</td>
                                    <td>{item.name}</td>
                                    <td>{item.description}</td>
                                    <td>{item.difficulty}</td>
                                    <td className='d-flex gap-1 justify-content-center'>
                                        <button
                                            className='btn btn-warning'
                                            onClick={() => handleModalUpdate()}>
                                            <AiFillEdit />
                                        </button>
                                        <button
                                            className='btn btn-danger'
                                            onClick={() => handleModalDelete(item)}>
                                            <AiFillDelete />
                                        </button>
                                    </td>
                                </tr>
                            )
                        })
                    }

                </tbody>
                <ModalUpdateQuiz
                    show={isShowUpdate}
                    setShow={setIsShowUpdate}
                    dataUpdate={dataUpdate}
                />
                <ModalDeleteQuiz
                    show={isShowDelete}
                    setShow={setIsShowDelete}
                    dataDelete={dataDelete}
                    fetchQuiz={fetchQuiz}
                />
            </table>
        </>
    )
}

export default TableQuiz