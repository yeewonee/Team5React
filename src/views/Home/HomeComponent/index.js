import { Col, Button, Modal } from "react-bootstrap";
import style from "./homemenu.module.css";
import photo1 from 'images/1.png';
import photo2 from 'images/2.png';
import photo3 from 'images/3.png';
import { useState } from "react";
import HomeModal from './HomeModal';

function HomeMenu(props) {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const buttonModal = () => setShow(true);

  return (
    <>
    <HomeModal show={show}
    handleClose={handleClose}
    buttonModal={buttonModal}
    />
    <Col className={style.col1}>
      <div onClick={buttonModal} className={style.bLocation1}>
        <div className={style.button1}>
          <div className={style.bContent1}><img src={photo1} alt="photo1"/><b>예약 / 접수</b></div>
        </div> 
      </div>
      <div onClick={buttonModal} className={style.bLocation2}>
        <div className={style.button1}>
          <div className={style.bContent2}><img src={photo2} alt="photo2"/><b>검사 / 치료</b></div>
        </div> 
      </div>
      <div onClick={buttonModal} className={style.bLocation2}>
        <div className={style.button1}>
          <div className={style.bContent3}><img src={photo3} alt="photo3"/><b>진료</b></div>
        </div> 
      </div>
    </Col>
    </>
      
  );
}

export default HomeMenu;