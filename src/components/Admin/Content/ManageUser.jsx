import { useEffect, useState } from 'react';
import ModalCreateUser from './ModalCreatUser';
import "./ManageUser.scss"
import { FcPlus } from 'react-icons/fc';
import TableUser from './TableUser';
import { getAllUser } from '../../../services/apiService';
import ModalUpdate from './ModalUpdate';
import ModalViewUser from './ModalViewUser';
import ModalDeleteUser from './ModalDeleteUser';

const ManageUser = (props) => {
    const [showModal, setShowModal] = useState(false)
    const [showModalUpdate, setShowModalUpdate] = useState(false)
    const [showModalView, setShowModalView] = useState(false)
    const [showModalDelete, setShowModalDelete] = useState(false)
    
    const [listUser, setListUser] = useState([]) // listUser render users ở TableUser và truyển props cho modal and tableUser
    const [dataUpdate, setDataUpdate] = useState({})
    const [dataView, setDataView] = useState({})
    const [dataDelete, setDataDelete] = useState({})
 
    useEffect(() => {
        fetchListUser()
    }, [])

    const fetchListUser = async () => {
        const response = await getAllUser()
        if (response.EC === 0) {
            setListUser(response.DT)
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
                    <TableUser listUser={listUser} handleClickUpdate={handleClickUpdate} handleClickView={handleClickView} handleClickDelete={handleClickDelete}/>
                </div>
                <ModalCreateUser show={showModal} setShow={setShowModal} fetchListUser={fetchListUser}/>

                <ModalUpdate show={showModalUpdate} setShow={setShowModalUpdate} dataUpdate={dataUpdate} fetchListUser={fetchListUser} resetUpdateData={resetUpdateData} />

                <ModalViewUser show={showModalView} setShow={setShowModalView} fetchListUser={fetchListUser} resetUpdateData={resetUpdateData} dataView={dataView} resetViewData={resetViewData}/>

                <ModalDeleteUser show={showModalDelete} setShow={setShowModalDelete} dataDelete={dataDelete} fetchListUser={fetchListUser}/>
            </div>
        </div>
    )
}

export default ManageUser