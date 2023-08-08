import { useState } from 'react';
import ModalCreateUser from './ModalCreatUser';

const ManageUser = (props) => {
    return (
        <div classNameName='manageUser__container'>
            <div classNameName="title">
                ManageUser
            </div>

            <div classNameName="users__content">
                <button>Add User</button>
            </div>

            <div>
                table user
                <ModalCreateUser />
            </div>
        </div>
    )
}

export default ManageUser