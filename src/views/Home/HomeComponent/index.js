import { Col, Button, Modal } from "react-bootstrap";
import style from "./homemenu.module.css";
import photo1 from 'images/1.png';
import photo2 from 'images/2.png';
import photo3 from 'images/3.png';
import {Link} from "react-router-dom";
import { useState } from "react";
import { useSelector } from "react-redux";

function HomeMenu(props) {

  return (
    <>
    <div className={style.menuBox}>

      <b style={{fontSize:'23px'}}>
        <Link to="/reception" style={{textDecoration:"none", color:"black"}}>
          <div className={style.box}>
            <div>
              <img src={photo1} alt="photo1" style={{width:'50px', marginRight:'15px'}}/>예약 / 접수
            </div> 
          </div>
        </Link>
      </b>
      <b style={{fontSize:'23px'}}>
        <Link to="/inspection" style={{textDecoration:"none", color:"black"}}>
          <div className={style.box}>
            <div>
              <img src={photo2} alt="photo2" style={{width:'50px', marginRight:'15px'}}/>검사 / 치료
            </div> 
          </div>
        </Link>
      </b>

      <b style={{fontSize:'23px'}}>
        <Link to="/diagnosis" style={{textDecoration:"none", color:"black"}}>
          <div className={style.box2}>
            <div>
              <img src={photo3} alt="photo3" style={{width:'48px', marginRight:'15px'}}/>진료
            </div> 
          </div>
        </Link>
      </b>
    </div>
    </>
      
  );
}

export default HomeMenu;