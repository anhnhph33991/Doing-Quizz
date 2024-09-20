/* eslint-disable jsx-a11y/alt-text */
import { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { FcPlus } from 'react-icons/fc';
import { toast } from 'react-toastify';
import { putUpdateQuiz } from '../../../../../services/apiService';
import _ from 'lodash';

const ModalUpdateQuiz = (props) => {
    const { show, setShow, fetchQuiz, dataUpdate, resetUpdateData } = props
    const [name, setName] = useState('')
    const [description, setDescription] = useState('')
    const [type, setType] = useState('')
    const [image, setImage] = useState("")
    const [previewImg, setPreviewImg] = useState("")

    useEffect(() => {
        if (!_.isEmpty(dataUpdate)) { /** _.isEmpty: hàm check object rỗng hay không - ở đây là khác rỗng thì sẽ set cho các trường */
            setName(dataUpdate.name)
            setDescription(dataUpdate.description)
            setType(dataUpdate.difficulty)
            setImage("")
            if (dataUpdate.image) { /** Nếu image có ảnh thì sẽ cập nhật setPre */
                setPreviewImg(`data:image/jpeg;base64,${dataUpdate.image}`)
            }
        }
    }, [dataUpdate])

    const handleClose = () => {
        setShow(false)
        setName("")
        setDescription('')
        setType('')
        setImage("")
        setPreviewImg("")
        resetUpdateData()
    };

    const handleUpLoadFile = (e) => {
        if (e.target && e.target.files && e.target.files[0]) {
            setPreviewImg(URL.createObjectURL(e.target.files[0]))
            setImage(e.target.files[0])
        } else {
            // setPreviewImg(null)
        }
    }

    const handleUpdateQuiz = async () => {
        //update data

        const data = await putUpdateQuiz(dataUpdate.id, name, description, type, image)

        if (data && data.EC === 0) {
            toast.success(data.EM)
            handleClose()
            // props.setCurrentPage(1)
            await fetchQuiz() 
        }

        if (data && data.EC !== 0) {
            toast.error(data.EM)
        }
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
                                type="text"
                                className="form-control"
                                value={name}
                                onChange={(e) => setName(e.target.value)} />
                        </div>
                        <div className="col-md-6">
                            <label className="form-label">Description</label>
                            <input
                                type="text"
                                className="form-control"
                                value={description}
                                onChange={(e) => setDescription(e.target.value)} />
                        </div>
                        <div className="col-md-12">
                            <label className="form-label">Type</label>
                            <select className="form-select" onChange={(e) => setType(e.target.value)} value={type}>
                                <option value='EASY'>EASY</option>
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
                    <Button variant="primary" onClick={() => handleUpdateQuiz()}>
                        Lưu
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default ModalUpdateQuiz