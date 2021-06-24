import Modal from "./Modal";
import React from 'react';
import FindAddr from './PostCodeComponent/FindAddr';

const ModalPost = (props) => {

  const closeModal = () => {
    props.closeModal();
  };
  console.log("success")
  return (
    <>
      {/* 과거기록 상세보기 modal */}
      <Modal open={props.modalOpen} close={closeModal} header="주소 찾기">
        <Modal.Body>
          <FindAddr/>
        </Modal.Body>
      </Modal>
      
    </>
  )
}

export default ModalPost;