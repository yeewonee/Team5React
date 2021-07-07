import { Col, Table, Button, Modal } from "react-bootstrap";
import style from "./notice.module.css";
import photo4 from "images/4.jpg";
import React, { useEffect } from "react";
import { useState } from "react";
import { getBoardList } from "./data.js";
import qs from "qs";
import { Link } from "react-router-dom";
import NoticeModal from './NoticeModal';

import axios from "axios";
axios.defaults.baseURL = "http://localhost:8080";


function Notice(props) {

  const [boardList, setBoardList] = useState([]);
  useEffect(() => {
    const getNotice = async() => {
      const result = await axios.get("/boards");
      setBoardList(result.data)
    }
    getNotice()
  }, [])

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

  //css를 위한 임시 페이징 처리
  // let pageNo = 1;
  // console.log(props);
  // const queryString = qs.parse(props.props.history.location.search, { ignoreQueryPrefix: true });
  
  // if (queryString.pageNo) {
  //   pageNo = parseInt(queryString.pageNo);
  // }


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
            <div>
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
              {/* <div className="d-flex justify-content-center">
                <Link to="/?pageNo=1" className={`btn ${pageNo === 1 ? "btn-danger" : "btn-outline-primary"} btn-sm mr-1`}>
                  1
                </Link>
                <Link to="/?pageNo=2" className={`btn ${pageNo === 2 ? "btn-danger" : "btn-outline-primary"} btn-sm mr-1`}>
                  2
                </Link>
              </div> */}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
export default Notice;
