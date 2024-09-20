import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { toast } from 'react-toastify';
import { deleteQuiz } from '../../../../../services/apiService';

const ModalDeleteQuiz = (props) => {
  const { show, setShow, dataDelete, fetchQuiz} = props
  const handleClose = () => setShow(false);

  const handleDeleteUser = async () => {
    const data = await deleteQuiz(dataDelete.id)

    if(data && data.EC === 0){
        toast.success(data.EM)
        handleClose()
        await fetchQuiz() // FetchQuiz khi delete / render lại quiz
    }

    if(data && data.EC !== 0){
        toast.error(data.EM)
    }
  }

  return (
    <>
      <Modal show={show} onHide={handleClose} backdrop="static">
        <Modal.Header closeButton>
          <Modal.Title>Xác nhận xóa quiz</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Bạn muốn xóa quiz - ID: <b>{dataDelete && dataDelete.id ? dataDelete.id : ""}</b>
        </Modal.Body>
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

export default ModalDeleteQuiz;