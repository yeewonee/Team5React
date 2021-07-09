import { Col, Button, Modal } from "react-bootstrap";
import style from "./homemenu.module.css";
import photo1 from 'images/1.png';
import photo2 from 'images/2.png';
import photo3 from 'images/3.png';
import {Link} from "react-router-dom";
import { useState } from "react";
import HomeModal from './HomeModal';
import { useSelector } from "react-redux";

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

      <div className={style.box}>
        <div>
          <img src={photo1} alt="photo1" style={{width:'50px', marginRight:'15px'}}/><b style={{fontSize:'23px'}}><Link to="/reception" style={{textDecoration:"none", color:"black"}}>예약 / 접수</Link></b>
        </div> 
      </div>

      <div className={style.box}>
        <div>
          <img src={photo2} alt="photo2" style={{width:'50px', marginRight:'15px'}}/><b style={{fontSize:'23px'}}><Link to="/inspection" style={{textDecoration:"none", color:"black"}}>검사 / 치료</Link></b>
        </div> 
      </div>

      <div className={style.box2}>
        <div>
          <img src={photo3} alt="photo3" style={{width:'48px', marginRight:'15px'}}/><b style={{fontSize:'23px'}}><Link to="/diagnosis" style={{textDecoration:"none", color:"black"}}>진료</Link></b>
        </div> 
      </div>

    </div>
    </>
      
  );
}

export default HomeMenu;