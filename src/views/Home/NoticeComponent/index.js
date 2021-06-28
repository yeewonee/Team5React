import { Col, Table, Button, Modal } from "react-bootstrap";
import style from "./notice.module.css";
import photo4 from 'images/4.png';
import React from 'react';
import { useState } from "react";

function Notice(props){
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const noticeModal = (event, board) => {
    setBoard({
      bno: board.bno,
      btitle: board.btitle,
      bcontent: board.bcontent,
      bwriter: board.bwriter
      
    })
    setShow(true);
  }
  const [board, setBoard] = useState({
    bno: 0,
    btitle: "",
    bcontent: "",
    bwriter: ""
  });

  const boards= [
    {bno:5, btitle:"제목5", bcontent:"내용5", bwriter:"정윤환"},
    {bno:4, btitle:"제목4", bcontent:"내용4", bwriter:"박소라"},
    {bno:3, btitle:"제목3", bcontent:"내용3", bwriter:"김명휘"},
    {bno:2, btitle:"제목2", bcontent:"내용2", bwriter:"정윤환"},
    {bno:1, btitle:"제목1", bcontent:"내용1", bwriter:"정예원"},
    
  ]
  return(
    <>
    <Modal show={show} onHide={handleClose} dialogClassName="custom-modal">
      <Modal.Header closeButton>
        <Modal.Title>공지사항</Modal.Title>
      </Modal.Header>
      <Modal.Body>
      <table className="table">
              <thead>
                <tr >
                  <th scope="col" className={style.table2}>공지번호</th>
                  <th scope="col" className={style.table2}>{board.bno}</th>
                  <th scope="col" className={style.table2}>글쓴이</th>
                  <th scope="col" className={style.table2}>{board.bwriter}</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className={style.table2}>제목</td>
                  <td colSpan="3" className={style.table2}>{board.btitle}</td>
                </tr>
                <tr>
                  <td className={style.table2}>내용</td>
                  <td colSpan="3" className={style.table2}>{board.bcontent}</td>
                </tr>
              </tbody>
            </table>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="danger" onClick={handleClose}>
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
  
    <div className={style.col}>
      <div className={style.bLocation}>
        <div className={style.notice}>
          <div className={style.bContent1}><img src={photo4} alt="photo4"/><b>공지사항</b></div>
          <div className={style.table1_container}>
          <Table responsive="sm" className={style.table1}>
            <thead>
              <tr>
                <th>번호</th>
                <th>제목</th>
                <th>내용</th>
                <th>글쓴이</th>
              </tr>
            </thead>
            <tbody>

              {boards.map((board) => {
              return (
                <tr key={board.bno}>
                  <td>{board.bno}</td>
                  <td><div onClick={(event)=>{noticeModal(event, board)}} className={style.mouse}>{board.btitle}</div></td>
                  <td>{board.bcontent}</td>
                  <td>{board.bwriter}</td>                
                </tr>
              );
            })}
            </tbody>
          </Table>
          </div>
        </div> 
      </div>
    </div>
    </>
  );
}
export default Notice;