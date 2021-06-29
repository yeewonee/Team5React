import { Col, Table, Button, Modal } from "react-bootstrap";
import style from "./notice.module.css";
import photo4 from "images/4.jpg";
import React from "react";
import { useState } from "react";
import { getBoardList } from "./data.js";
import qs from "qs";
import { Link } from "react-router-dom";
import NoticeModal from './NoticeModal';

function Notice(props) {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const noticeModal = (event, board) => {
    setBoard({
      bno: board.bno,
      btitle: board.btitle,
      bcontent: board.bcontent,
      bwriter: board.bwriter,
    });
    setShow(true);
  };
  const [board, setBoard] = useState({
    bno: 0,
    btitle: "",
    bcontent: "",
    bwriter: "",
  });

  //css를 위한 임시 페이징 처리
  let pageNo = 1;
  console.log(props);
  const queryString = qs.parse(props.props.history.location.search, { ignoreQueryPrefix: true });
  
  if (queryString.pageNo) {
    pageNo = parseInt(queryString.pageNo);
  }
  const boardList = getBoardList(pageNo);

  

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
                      <tr key={board.bno}>
                        <td>{board.bno}</td>
                        <td>
                          <div
                            onClick={(event) => {
                              noticeModal(event, board);
                            }}
                            className={style.mouse}
                          >
                            {board.btitle}
                          </div>
                        </td>
                        <td>{board.bwriter}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </Table>
              <div className="d-flex justify-content-center">
                <Link to="/?pageNo=1" className={`btn ${pageNo === 1 ? "btn-danger" : "btn-outline-primary"} btn-sm mr-1`}>
                  1
                </Link>
                <Link to="/?pageNo=2" className={`btn ${pageNo === 2 ? "btn-danger" : "btn-outline-primary"} btn-sm mr-1`}>
                  2
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
export default Notice;
