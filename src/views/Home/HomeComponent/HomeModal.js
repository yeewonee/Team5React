import { Modal, Button } from "react-bootstrap";

function HomeModal(props){
  return(
    <Modal show={props.show} onHide={props.handleClose} dialogClassName="custom-modal">
    <Modal.Header closeButton>
      <Modal.Title>알림</Modal.Title>
    </Modal.Header>
    <Modal.Body>접근 권한이 없습니다.</Modal.Body>
    <Modal.Footer>
      <Button variant="primary" onClick={props.handleClose}>
        Close
      </Button>
    </Modal.Footer>
    <style jsx="true" global="true">{`
    .custom-modal {
      font-family: "DoHyeon-Regular"; 
    }
    `}
    </style>
    </Modal>
  )
}

export default HomeModal;