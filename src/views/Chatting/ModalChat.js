import Modal from "../Diagnosis/PastRecord/Modal";
import React from 'react'
import { useSelector } from "react-redux";
import { ChatRoom } from "./ChatRoom";



export const ModalChat = (props) => {

  const closeModal = () => {
    props.closeModal();
  };

  const uid = useSelector((state) => {
    return state.authReducer.uid;
  });

  const userId = useSelector((state) => {
    return state.chattingReducer.userId;
  });

  return (
    <>
      {/* 과거기록 상세보기 modal */}
      <Modal open={props.modalOpen} close={closeModal} header="채팅">
        <div className="d-flex justify-content-between" style={{marginTop:'20px', fontFamily: "DoHyeon-Regular" }}>
          <div style={{width:'30%'}}>
            <p style={{float:'left', marginRight:'5px', marginBottom:'0px', fontWeight:'bold'}}>리스트</p>
          </div>
          <div style={{width:'70%', marginLeft:'10px'}}>
            <p style={{float:'left', marginRight:'5px', marginBottom:'0px', fontWeight:'bold'}}>채팅방</p>
          </div>
        </div>
        <ChatRoom uid={uid} userId={userId}/>
      </Modal>
    </>
  )
}
