import style from './rlist.module.css';
import { Button, Modal } from 'react-bootstrap';
import { useState } from 'react';

const CompleteModal = (props) => {
  const handelComplete = () => {
    props.completeReception()
  }
  return(
    <Modal show={props.completeShow} onHide={props.closeComModal} dialogClassName="custom-modal">
      <Modal.Header closeButton>
        <Modal.Title style={{color:'gray'}}>알림</Modal.Title>
      </Modal.Header>
      <Modal.Body>접수 완료하시겠습니까?</Modal.Body>
      <Modal.Footer>
        <Button style={{backgroundColor:'#4dabf7'}} onClick={handelComplete}>
          확인
        </Button>
        <Button style={{backgroundColor:'#f74d4d'}} onClick={props.closeComModal}>
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

export default CompleteModal;