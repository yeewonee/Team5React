import { Col, Button, Modal } from "react-bootstrap";
import style from "./homemenu.module.css";
import photo1 from 'images/1.png';
import photo2 from 'images/2.png';
import photo3 from 'images/3.png';
import { useState } from "react";

function HomeMenu(props) {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const buttonModal = () => setShow(true);

  return (
    <>
    <Modal show={show} onHide={handleClose} dialogClassName="custom-modal">
      <Modal.Header closeButton>
        <Modal.Title>알림</Modal.Title>
      </Modal.Header>
      <Modal.Body>접근 권한이 없습니다.</Modal.Body>
      <Modal.Footer>
        <Button variant="primary" onClick={handleClose}>
          Close
        </Button>
      </Modal.Footer>
      <style jsx global>{`
      .custom-modal {
        font-family: "DoHyeon-Regular"; 
      }
      `}
      </style>
    </Modal>
    <Col className={style.col1}>
      <div onClick={buttonModal} className={style.bLocation}>
        <div className={style.button1}>
          <div className={style.bContent1}><img src={photo1} alt="photo1"/><b>예약 / 접수</b></div>
        </div> 
      </div>
      <div onClick={buttonModal} className={style.bLocation}>
        <div className={style.button1}>
          <div className={style.bContent1}><img src={photo2} alt="photo2"/><b>검사 / 치료</b></div>
        </div> 
      </div>
      <div onClick={buttonModal} className={style.bLocation}>
        <div className={style.button1}>
          <div className={style.bContent2}><img src={photo3} alt="photo3"/><b>진료</b></div>
        </div> 
      </div>
    </Col>
    </>
      
  );
}

export default HomeMenu;