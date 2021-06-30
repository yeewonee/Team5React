import { useState } from "react";
import { Modal } from "react-bootstrap";
import { getMainNoticeList } from "./data";

function MainNotice(props) {
  const [show, setShow] = useState(false);

  const [board, setBoard] = useState({
    bno: '',
    btitle: '',
    bcontent: '',
    bdate:'',
    bwriter:''
  });

  const mainNoticeModal = (event, board) => {
    setBoard({
      bno: board.bno,
      btitle: board.btitle,
      bdate: board.bdate,
      bcontent: board.bcontent,
      bwriter: board.bwriter
    })
    setShow(true);
  };

  const handleClose = () => { 
    setShow(false);
  };

  const mainBoards = getMainNoticeList(); //메인공지사항 리스트 가져오기

  return(
    <>
    {/* 공지사항 모달로 띄워주는 부분 */}
    <Modal show={show} onHide={handleClose} dialogClassName="custom-modal">
      <Modal.Header closeButton>
        <Modal.Title>공지사항</Modal.Title>
      </Modal.Header>
      <Modal.Body>
      <table className="table table-bordered">
              <tbody>
                <tr>
                  <td style={{textAlign:'center'}}>공지번호</td>
                  <td>{board.bno}</td>
                  <td style={{textAlign:'center'}}>글쓴이</td>
                  <td>{board.bwriter}</td>
                </tr>
                <tr>
                  <td style={{textAlign:'center'}}>제목</td>
                  <td colSpan="3">{board.btitle}</td>
                </tr>
                <tr>
                  <td style={{textAlign:'center'}}>내용</td>
                  <td colSpan="3">{board.bcontent}</td>
                </tr>
              </tbody>
            </table>
      </Modal.Body>
      <Modal.Footer>
        <button onClick={handleClose}>
          Close
        </button>
      </Modal.Footer>
      <style jsx="true" global="true">{`
      .custom-modal {
        font-family: "DoHyeon-Regular"; 
      }
      `}
      </style>
    </Modal>

    <div> 
      {mainBoards.map((board) => {
        return(
        <div className={"list-group"} key={board.bno}>
          <div className={"list-group-item list-group-item-action"}>
            <div className={"d-flex w-100 justify-content-between"}>
              <h5 className={"mb-1"} onClick={(event) => {mainNoticeModal(event, board)}}>{board.btitle}</h5>
              <small>{board.bdate}</small>
            </div>
            <p className={"mb-1"}>{board.bcontent}</p>
          </div>
        </div>
        );
      })}
    </div>
    </>
  );
}

export default MainNotice;