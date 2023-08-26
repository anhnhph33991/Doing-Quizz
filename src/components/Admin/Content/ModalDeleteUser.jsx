import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { deleteUser } from '../../../services/apiService';
import { toast } from 'react-toastify';

const ModalDeleteUser = (props) => {
  const {show, setShow, dataDelete, fetchListUserWithPaginate, setCurrentPage} = props
  const handleClose = () => setShow(false);

  const handleDeleteUser = async () => {
    const data = await deleteUser(dataDelete.id) 

    if(data && data.EC === 0){
        toast.success(data.EM)
        handleClose()
        setCurrentPage(1)
        await fetchListUserWithPaginate(1) // fetchListUser khi delete thay vì getAllUsers
    }

    if(data && data.EC !== 0){
        toast.error(data.EM)
    }
  }

  return (
    <>
      <Modal show={show} onHide={handleClose} backdrop="static">
        <Modal.Header closeButton>
          <Modal.Title>Xác nhận xóa người dùng</Modal.Title>
        </Modal.Header>
        <Modal.Body>Bạn muốn xóa người dùng - Email: <b>{dataDelete && dataDelete.email ? dataDelete.email : ""}</b></Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Đóng
          </Button>
          <Button variant="primary" onClick={() => handleDeleteUser()}>
            Xóa
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default ModalDeleteUser;