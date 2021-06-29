import style from './rlist.module.css';
import { Button, Modal } from 'react-bootstrap';
import { useState } from 'react';

const CancelModal = (props) => {
  const handelCancel = () => {
    props.cancelReception()
  }
  return(
    <Modal show={props.cancelShow} onHide={props.closeCModal} dialogClassName="custom-modal">
      <Modal.Header closeButton>
        <Modal.Title>알림</Modal.Title>
      </Modal.Header>
      <Modal.Body>예약 취소하시겠습니까?</Modal.Body>
      <Modal.Footer>
        <Button variant="success" onClick={handelCancel}>
          확인
        </Button>
        <Button variant="danger" onClick={props.closeCModal}>
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

export default CancelModal;