/* eslint-disable jsx-a11y/alt-text */
import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { FcPlus } from 'react-icons/fc';
import { toast } from 'react-toastify';
// import { putUpdateUser } from '../../../services/apiService';
import { useEffect } from 'react';
import _ from 'lodash';

const ModalUpdateQuiz = (props) => {
    const { show, setShow, fetchListUser, dataUpdate, resetUpdateData } = props
    const [email, setEmail] = useState('')
    const [password, setPassWord] = useState('')
    const [username, setUserName] = useState('')
    const [role, setRole] = useState('USER')
    const [image, setImage] = useState("")
    const [previewImg, setPreviewImg] = useState("")

    useEffect(() => {
        if (!_.isEmpty(dataUpdate)) { /** _.isEmpty: hàm check object rỗng hay không - ở đây là khác rỗng thì sẽ set cho các trường */
            setEmail(dataUpdate.email)
            setUserName(dataUpdate.username)
            setRole(dataUpdate.role)
            setImage("")
            if(dataUpdate.image){ /** Nếu image có ảnh thì sẽ cập nhật setPre */
                setPreviewImg(`data:image/jpeg;base64,${dataUpdate.image}`)
            }
        }
    }, [dataUpdate])

    const handleClose = () => {
        setShow(false)
        setEmail("")
        setPassWord("")
        setUserName("")
        setRole("USER")
        setImage("")
        setPreviewImg("")
        // resetUpdateData()
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
        // if (!password) {
        //     toast.error("Vui lòng nhập password!")
        //     return;
        // }

        //update data


        // const data = await putUpdateUser(dataUpdate.id ,username, role, image)

        // if (data && data.EC === 0) {
        //     toast.success(data.EM)
        //     handleClose()
        //     // props.setCurrentPage(1)
        //     await props.fetchListUserWithPaginate(props.currentPage) 
        // }

        // if (data && data.EC !== 0) {
        //     toast.error(data.EM)
        // }
    }

    return (
        <>
            <Modal show={show} onHide={handleClose} size='xl' backdrop="static" className='modal__add__user'>
                <Modal.Header closeButton>
                    <Modal.Title>Update Quiz</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <form className="row g-3">
                        <div className="col-md-6">
                            <label className="form-label">Name</label>
                            <input 
                            type="email" 
                            className="form-control" 
                            value={email} 
                            onChange={(e) => setEmail(e.target.value)} />
                        </div>
                        <div className="col-md-6">
                            <label className="form-label">Description</label>
                            <input 
                            type="password" 
                            className="form-control" 
                            value={password} 
                            onChange={(e) => setPassWord(e.target.value)}/>
                        </div>
                        <div className="col-md-12">
                            <label className="form-label">Type</label>
                            <select className="form-select" onChange={(e) => setRole(e.target.value)} value={role}>
                                <option selected value='EASY'>EASY</option>
                                <option value="MEDIUM">MEDIUM</option>
                                <option value="HARD">HARD</option>
                            </select>
                        </div>
                        <div className="col-md-12">
                            <label className="form-label label__upload" htmlFor='upload__file'>
                                <FcPlus />Images
                            </label>
                            <input type="file" id='upload__file' hidden onChange={(e) => handleUpLoadFile(e)} />
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

export default ModalUpdateQuiz