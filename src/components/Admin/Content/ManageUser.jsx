import { useEffect, useState } from 'react';
import ModalCreateUser from './ModalCreatUser';
import "./ManageUser.scss"
import { FcPlus } from 'react-icons/fc';
import TableUser from './TableUser';
import { getAllUser } from '../../../services/apiService';

const ManageUser = (props) => {
    const [showModal, setShowModal] = useState(false)
    const [listUser, setListUser] = useState([]) // listUser render users ở TableUser và truyển props cho modal and tableUser

    useEffect(() => {
        fetchListUser()
    }, [])

    const fetchListUser = async () => {
        const response = await getAllUser()
        if (response.EC === 0) {
            setListUser(response.DT)
        }
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
                    <TableUser listUser={listUser} />
                </div>
                <ModalCreateUser show={showModal} setShow={setShowModal} fetchListUser={fetchListUser}/>
            </div>
        </div>
    )
}

export default ManageUser