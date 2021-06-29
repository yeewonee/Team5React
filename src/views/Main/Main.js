import style from "./main.module.css";
import MainNotice from "./MainNotice/MainNotice";
import photo1 from 'images/1.png';
import photo2 from 'images/2.png';
import photo3 from 'images/3.png';
import { Link } from "react-router-dom"

function Main(props) {
    return (
      <div>
        <div className={style.mbody}>
          <div className={style.titleContainer}>
            <div className={style.title}>WEHAGO-H</div>
          </div>
          <div className={style.contentBox}>
            <div className={style.notice}>
              <div className={style.header}>NOTICE</div>
                <div style={{height:'41.5vh',overflow:'auto'}}><MainNotice/></div>
            </div>
            <div className={style.rightBox}>
            <div className={style.priceheader}>PRICE</div>
              <div className={style.topBox}>
                <div style={{marginTop:'40px', fontSize:'25px'}}> 사용자 당 월 6,000원</div>
                <div style={{fontSize:'13px'}}>월 기본료 30.000원 (부가세별도)</div>
              </div>
              <div className={style.middleBox}>
                <div className={style.innerBox}>
                  <div style={{textAlign:'center', fontSize:'17px'}}>병원에서 예약 및 접수부터 진료, 검사/치료 단계까지 사용할 수 있는 서비스입니다.</div>
                </div>
              </div>
              <div className={style.bottomBox}>
                <div style={{marginRight:'20px'}}><img style={{width:'50px'}} src={photo1} alt="photo1"/><b>예약 / 접수</b></div>
                <div style={{marginRight:'20px'}}><img style={{width:'40px'}} src={photo3} alt="photo3"/><b>진료</b></div>
                <div><img style={{width:'47px'}} src={photo2} alt="photo2"/><b>검사 / 치료</b></div>
              </div>
            </div>
          </div>
          <div className={style.loginBox}>
          <Link to="/login" style={{textDecoration:'none', color:'black'}}><div className={style.loginButton}>LOGIN</div></Link> 
          </div>      
        </div>
      </div>
    )
}

export default Main;
