import { Col, Table, Button, Modal } from "react-bootstrap";
import style from "./notice.module.css";
import photo4 from "images/4.jpg";
import React, { useEffect } from "react";
import { useState } from "react";
import qs from "qs";
import { Link } from "react-router-dom";
import NoticeModal from './NoticeModal';
import { Loading } from "../../../Loading";
import axios from "axios";

function Notice(props) {
  const [loading, setLoading] = useState(null);  
  const [boardList, setBoardList] = useState([]);
  const getNotice = async() => {
    setLoading(true);
    try{
      const result = await axios.get("/boards");
      setBoardList(result.data)  
      setLoading(false);    
    }catch(error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getNotice();
  }, []);

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const noticeModal = (event, board) => {
    setBoard({
      noticeId: board.noticeId,
      noticeTitle: board.noticeTitle,
      noticeContent: board.noticeContent,
      userId: board.userId,
    });
    setShow(true);
  };
  const [board, setBoard] = useState({
    noticeId: 0,
    noticeTitle: "",
    noticeContent: "",
    userId: "",
  });

  return (
    <>
      <NoticeModal show={show}
      handleClose={handleClose}
      board={board}
      noticeModal={noticeModal}
      />

      <div>
        <div>
          <div className={style.notice} style={{ overflow: "auto" }}>
            <div className={style.bContent1}>
              <img src={photo4} alt="photo4" style={{width:'35px', margin:'20px'}}/>
              <b>공지사항</b>
            </div>
            {loading ? <div><div style={{marginLeft:"43%", marginTop:"15%"}}><Loading height={90} width={90}/></div> <p style={{marginLeft:"46%"}}>Loding...</p></div>
                :
            <Table responsive="sm" className={style.table1}>
              <thead>
                <tr>
                  <th>번호</th>
                  <th>제목</th>
                  <th>글쓴이</th>
                </tr>
              </thead>

              <tbody>
                {boardList.map((board) => {
                  return (
                    <tr key={board.noticeId}>
                      <td>{board.noticeId}</td>
                      <td>
                        <div
                          onClick={(event) => {
                            noticeModal(event, board);
                          }}
                          className={style.mouse}
                        >
                          {board.noticeTitle}
                        </div>
                      </td>
                      <td>{board.userId}</td>
                    </tr>
                  );
                })}
              </tbody>
              
            </Table>
            }
            
          </div>
        </div>
      </div>
      
    </>
  );
}
export default Notice;
