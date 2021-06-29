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
    <div className={style.menuBox}>

      <div className={style.box} onClick={buttonModal}>
        <div>
          <img src={photo1} alt="photo1" style={{width:'50px', marginRight:'15px'}}/><b style={{fontSize:'23px'}}>예약 / 접수</b>
        </div> 
      </div>

      <div className={style.box} onClick={buttonModal}>
        <div>
          <img src={photo2} alt="photo2" style={{width:'50px', marginRight:'15px'}}/><b style={{fontSize:'23px'}}>검사 / 치료</b>
        </div> 
      </div>

      <div className={style.box2} onClick={buttonModal}>
        <div>
          <img src={photo3} alt="photo3" style={{width:'48px', marginRight:'15px'}}/><b style={{fontSize:'23px'}}>진료</b>
        </div> 
      </div>

    </div>
    </>
      
  );
}

export default HomeMenu;