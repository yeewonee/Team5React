import Modal from "../src/views/Diagnosis/PastRecord/Modal";
import React from 'react'
import { ChatRoom } from "ChatRoom";
import { useSelector } from "react-redux";



export const ModalChat = (props) => {

  const closeModal = () => {
    props.closeModal();
  };

  const uid = useSelector((state) => {
    return state.authReducer.uid;
  });

  return (
    <>
      {/* 과거기록 상세보기 modal */}
      <Modal open={props.modalOpen} close={closeModal} header="채팅">
        <div>로그인 중인 아이디 : {uid}</div>
        <div className="d-flex justify-content-between" style={{marginTop:'20px'}}>
          <div style={{border:'1px solid black', width:'30%'}}>리스트</div>
          <div style={{border:'1px solid black', width:'70%', marginLeft:'10px'}}>채팅방</div>
        </div>

        <ChatRoom uid={uid}/>

        {/* <div className="d-flex justify-content-between" style={{marginTop:'10px'}}>
          <div style={{border:'1px solid black', width:'30%', height:'45vh'}}>
          <CommonTable headersName={["이름"]} tstyle={"table table-sm"}>
            {user.map((user, index) => (
              <tr key={index} onClick={(event)=>{handleUserName(event, user.userId)}} className={user.userId === colorSelect ? style.select_Color : style.basic_Color} style={{cursor:"pointer"}}>
                <CommonTableColumn>{user.userName}</CommonTableColumn>
              </tr>
            ))}
          </CommonTable>
          </div>
          
          {pubState ? 
            <div style={{border:'1px solid black', width:'70%', marginLeft:'10px', height:'45vh', overflow:'auto'}}>
            <div className="d-flex justify-content-between" style={{marginTop:'10px'}}>
              <div style={{width:'95%', marginTop:'5px', marginLeft:'2%', height:'50vh'}}>
                {contents.map((content, index) => 
                  <div key={index} className={ check(content) ? style.basic_Color : style.select_Color} style={{height:'30px'}}>
                    <p className={ check(content) ? style.select_Size : style.basic_Size}>{content}</p>
                  </div>
                )}
              </div>
              <div style={{width:'95%', marginTop:'5px', marginLeft:'2%', height:'50vh'}}>
                {sendContents.map((content, index) => 
                  <div key={index}  className={ check(content) ? style.basic_Color : style.select_Color} style={{height:'30px'}}>
                    <p className={ check(content) ? style.select_Size : style.basic_Size} >{content}</p>
                  </div>
                )}
              </div>
            </div>
            </div>
          :
          <div style={{border:'1px solid red', width:'70%', marginLeft:'10px', height:'45vh', overflow:'auto'}}>
            <p style={{marginLeft:'38%', marginTop:'30%'}}>상대를 선택하세요.</p>
          </div>
          }
      
        </div>
        
        <div style={{width:'69%', marginLeft:'31%'}}>
          <div class="input-group mb-3">
            <input type="text" class="form-control" name="content" value={pubMessage.content} onChange={changePubMessage} />
            <div class="input-group-append">
              <button class="btn btn-secondary" type="button" onClick={publishTopic}>전송</button>
            </div>
          </div>
        </div> */}
       
        
      </Modal>
    </>
  )
}
