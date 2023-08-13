/* eslint-disable jsx-a11y/alt-text */
import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { FcPlus } from 'react-icons/fc';
import { toast } from 'react-toastify';
import { postCreatNewUser } from '../../../services/apiService';

const ModalCreateUser = (props) => {
    const { show, setShow, fetchListUser} = props
    const [email, setEmail] = useState('')
    const [password, setPassWord] = useState('')
    const [username, setUserName] = useState('')
    const [role, setRole] = useState('USER')
    const [image, setImage] = useState("")
    const [previewImg, setPreviewImg] = useState("")

    const handleClose = () => {
        setShow(false)
        setEmail("")
        setPassWord("")
        setUserName("")
        setRole("USER")
        setImage("")
        setPreviewImg("")
    };

    const handleUpLoadFile = (e) => {
        if (e.target && e.target.files && e.target.files[0]) {
            setPreviewImg(URL.createObjectURL(e.target.files[0]))
            setImage(e.target.files[0])
        } else {
            // setPreviewImg(null)
        }
    }

    const handleSubmitCreateUser = async () => {

        if(!password){
            toast.error("Vui lòng nhập password!")
            return;
        }

        //submit data
        const data = await postCreatNewUser(email, password, username, role, image) 

        if(data && data.EC === 0){
            toast.success(data.EM)
            handleClose()
            props.setCurrentPage(1)
            await props.fetchListUserWithPaginate(1) 
        }

        if(data && data.EC !== 0){
            toast.error(data.EM)
        }
    }

    return (
        <>
            <Modal show={show} onHide={handleClose} size='xl' backdrop="static" className='modal__add__user'>
                <Modal.Header closeButton>
                    <Modal.Title>Thêm User</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <form className="row g-3">
                        <div className="col-md-6">
                            <label className="form-label">Email</label>
                            <input type="email" className="form-control" value={email} onChange={(e) => setEmail(e.target.value)} />
                        </div>
                        <div className="col-md-6">
                            <label className="form-label">Password</label>
                            <input type="password" className="form-control" value={password} onChange={(e) => setPassWord(e.target.value)} />
                        </div>
                        <div className="col-md-6">
                            <label className="form-label">Username</label>
                            <input type="text" className="form-control" value={username} onChange={(e) => setUserName(e.target.value)} />
                        </div>
                        <div className="col-md-6">
                            <label className="form-label">Role</label>
                            <select className="form-select" onChange={(e) => setRole(e.target.value)} value={role}>
                                <option selected value='USER'>User</option>
                                <option value="ADMIN">Admin</option>
                            </select>
                        </div>
                        <div className="col-md-12">
                            <label className="form-label label__upload" htmlFor='upload__file'>
                                <FcPlus />Images
                            </label>
                            <input type="file" id='upload__file' hidden onChange={(e) => handleUpLoadFile(e)} />
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
                    <Button variant="primary" onClick={() => handleSubmitCreateUser()}>
                        Lưu
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default ModalCreateUser