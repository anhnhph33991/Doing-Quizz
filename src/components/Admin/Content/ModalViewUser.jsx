/* eslint-disable jsx-a11y/alt-text */
import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { FcPlus } from 'react-icons/fc';
import { toast } from 'react-toastify';
import { putUpdateUser } from '../../../services/apiService';
import { useEffect } from 'react';
import _ from 'lodash';

const ModalViewUser = (props) => {
    const { show, setShow, resetUpdateData, dataView, resetViewData } = props
    const [email, setEmail] = useState('')
    const [username, setUserName] = useState('')
    const [role, setRole] = useState('USER')
    const [image, setImage] = useState("")
    const [previewImg, setPreviewImg] = useState("")

    useEffect(() => {
        if (!_.isEmpty(dataView)) { /** _.isEmpty: hàm check object rỗng hay không - ở đây là khác rỗng thì sẽ set cho các trường */
            setEmail(dataView.email)
            setUserName(dataView.username)
            setRole(dataView.role)
            setImage("")
            if(dataView.image){ /** Nếu image có ảnh thì sẽ cập nhật setPre */
                setPreviewImg(`data:image/jpeg;base64,${dataView.image}`)
            }
        }
    }, [dataView])

    const handleClose = () => {
        setShow(false)
        setEmail("")
        setUserName("")
        setRole("USER")
        setImage("")
        setPreviewImg("")
        resetViewData()
    };


    return (
        <>
            <Modal show={show} onHide={handleClose} size='xl' backdrop="static" className='modal__add__user'>
                <Modal.Header closeButton>
                    <Modal.Title>Update User</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <form className="row g-3">
                        <div className="col-md-12">
                            <label className="form-label">Email</label>
                            <input type="email" className="form-control" value={email} onChange={(e) => setEmail(e.target.value)} disabled/>
                        </div>
                        <div className="col-md-6">
                            <label className="form-label">Username</label>
                            <input type="text" className="form-control" value={username} onChange={(e) => setUserName(e.target.value)} disabled/>
                        </div>
                        <div className="col-md-6">
                            <label className="form-label">Role</label>
                            <select className="form-select" onChange={(e) => setRole(e.target.value)} value={role} disabled>
                                <option selected value='USER'>User</option>
                                <option value="ADMIN">Admin</option>
                            </select>
                        </div>
                        <div className="col-md-12 img-preview">
                            {
                                previewImg ? (<img src={previewImg} />) : (<span>Preview Image</span>)
                            }
                        </div>
                    </form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Đóng
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default ModalViewUser