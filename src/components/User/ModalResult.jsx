import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

const ModalResult = (props) => {
  const { show, setShow, dataModalResult } = props
  const handleClose = () => setShow(false);

  return (
    <>
      <Modal show={show} onHide={handleClose} backdrop="static">
        <Modal.Header closeButton>
          <Modal.Title>Kết quả của bạn...</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div>Tổng số câu hỏi: <b>{dataModalResult.countTotal}</b> </div>
          <div>Tổng câu trả lời đúng: <b>{dataModalResult.countCorrect}</b> </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleClose}>
            Show Answes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default ModalResult;