import { Col, Table, Button, Modal } from "react-bootstrap";
import style from "./notice.module.css";

function NoticeModal(props){
  return(
    <Modal show={props.show} onHide={props.handleClose} dialogClassName="custom-modal">
    <Modal.Header closeButton>
      <Modal.Title style={{color:'gray'}}>공지사항</Modal.Title>
    </Modal.Header>
    <Modal.Body>
      <table className="table">
        <thead>
          <tr>
            <th scope="col" className={style.table2}>
              공지번호
            </th>
            <th scope="col" className={style.table2}>
              {props.board.noticeId}
            </th>
            <th scope="col" className={style.table2}>
              글쓴이
            </th>
            <th scope="col" className={style.table2}>
              {props.board.userId}
            </th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className={style.table2}>제목</td>
            <td colSpan="3" className={style.table2}>
              {props.board.noticeTitle}
            </td>
          </tr>
          <tr>
            <td className={style.table2}>내용</td>
            <td colSpan="3" className={style.table2}>
              {props.board.noticeContent}
            </td>
          </tr>
        </tbody>
      </table>
    </Modal.Body>
    <Modal.Footer>
      <Button style={{backgroundColor:'#f74d4d'}} onClick={props.handleClose}>
        닫기
      </Button>
    </Modal.Footer>
    <style jsx="true" global="true">
      {`
        .custom-modal {
          font-family: "DoHyeon-Regular";
        }
      `}
    </style>
  </Modal>
  )
}

export default NoticeModal;