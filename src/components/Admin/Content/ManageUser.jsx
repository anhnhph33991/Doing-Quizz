import { useEffect, useState } from 'react';
import ModalCreateUser from './ModalCreatUser';
import "./ManageUser.scss"
import { FcPlus } from 'react-icons/fc';
import TableUser from './TableUser';
import { getAllUser, getUserWithPaginate } from '../../../services/apiService';
import ModalUpdate from './ModalUpdate';
import ModalViewUser from './ModalViewUser';
import ModalDeleteUser from './ModalDeleteUser';
import TableUserPaginate from './TableUserPaginate';

const ManageUser = (props) => {
    const [showModal, setShowModal] = useState(false)
    const [showModalUpdate, setShowModalUpdate] = useState(false)
    const [showModalView, setShowModalView] = useState(false)
    const [showModalDelete, setShowModalDelete] = useState(false)

    // litmit user
    const LIMIT_USER = 8
    const [pageCount, setPageCount] = useState(0)
    const [currentPage, setCurrentPage] = useState(1)

    const [listUser, setListUser] = useState([]) // listUser render users ở TableUser và truyển props cho modal and tableUser
    const [dataUpdate, setDataUpdate] = useState({})
    const [dataView, setDataView] = useState({})
    const [dataDelete, setDataDelete] = useState({})

    useEffect(() => {
        // fetchListUser()
        fetchListUserWithPaginate(1)
    }, [])

    const fetchListUser = async () => {
        const response = await getAllUser()
        if (response.EC === 0) {
            setListUser(response.DT)
        }
    }

    const fetchListUserWithPaginate = async (page) => {
        let response = await getUserWithPaginate(page, LIMIT_USER)
        if (response.EC === 0) {
            setListUser(response.DT.users)
            setPageCount(response.DT.totalPages) // set số lượng trang dựa vào backend 
        }
    }

    const handleClickUpdate = (user) => {
        setShowModalUpdate(true)
        setDataUpdate(user)
    }

    // reset data rỗng khi modalUpdate close / nếu k có thì khi ấn vào user khác hoặc user đầu tiên được sửa sẽ k có dữ liệu của user đó
    const resetUpdateData = () => {
        setDataUpdate({})
    }

    const handleClickView = (user) => {
        setShowModalView(true)
        setDataView(user)
    }

    const resetViewData = () => {
        setDataView({})
    }

    const handleClickDelete = (user) => {
        setShowModalDelete(true)
        setDataDelete(user)
    }

    return (
        <div className='manage-user-container'>
            <div className="title">
                ManageUser
            </div>

            <div className="users__content">
                <div className='btn__add__new'>
                    <button className='btn btn-success btn__newUser' onClick={() => setShowModal(true)}> <FcPlus /> Add User</button>
                </div>
                <div className='table__users__container'>
                    {/* <TableUser listUser={listUser} handleClickUpdate={handleClickUpdate} handleClickView={handleClickView} handleClickDelete={handleClickDelete}/> */}

                    <TableUserPaginate 
                    listUser={listUser} 
                    handleClickUpdate={handleClickUpdate} 
                    handleClickView={handleClickView} 
                    handleClickDelete={handleClickDelete} fetchListUserWithPaginate={fetchListUserWithPaginate} pageCount={pageCount} 
                    currentPage={currentPage}
                    setCurrentPage={setCurrentPage}
                    />
                </div>
                <ModalCreateUser
                    show={showModal}
                    setShow={setShowModal}
                    fetchListUser={fetchListUser}
                    fetchListUserWithPaginate={fetchListUserWithPaginate}
                    currentPage={currentPage}
                    setCurrentPage={setCurrentPage}
                />

                <ModalUpdate
                    show={showModalUpdate}
                    setShow={setShowModalUpdate}
                    dataUpdate={dataUpdate}
                    fetchListUser={fetchListUser}
                    resetUpdateData={resetUpdateData}
                    fetchListUserWithPaginate={fetchListUserWithPaginate}
                    currentPage={currentPage}
                    setCurrentPage={setCurrentPage}
                />

                <ModalViewUser
                    show={showModalView}
                    setShow={setShowModalView}
                    fetchListUser={fetchListUser}
                    resetUpdateData={resetUpdateData}
                    dataView={dataView}
                    resetViewData={resetViewData}
                    fetchListUserWithPaginate={fetchListUserWithPaginate}
                />

                <ModalDeleteUser
                    show={showModalDelete}
                    setShow={setShowModalDelete}
                    dataDelete={dataDelete}
                    fetchListUser={fetchListUser}
                    fetchListUserWithPaginate={fetchListUserWithPaginate}
                    currentPage={currentPage}
                    setCurrentPage={setCurrentPage}
                />
            </div>
        </div>
    )
}

export default ManageUser