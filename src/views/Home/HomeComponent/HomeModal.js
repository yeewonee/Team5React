import { Modal, Button } from "react-bootstrap";

function HomeModal(props){
  return(
    <Modal show={props.show} onHide={props.handleClose} dialogClassName="custom-modal">
    <Modal.Header closeButton>
      <Modal.Title>알림</Modal.Title>
    </Modal.Header>
    <Modal.Body>접근 권한이 없습니다.</Modal.Body>
    <Modal.Footer>
      <Button style={{backgroundColor:'#f74d4d'}} onClick={props.handleClose}>
        닫기
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