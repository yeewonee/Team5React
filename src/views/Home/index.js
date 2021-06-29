import { Col, Container, Row } from "react-bootstrap";
import HomeMenu from "./HomeComponent";
import Notice from "./NoticeComponent";
import style from "./home.module.css";

function Home(props){
  return(
    <div className={style.back}>
      <div className={style.title}>
        <div style={{fontSize:'60px'}}>WEHAGO-H</div>
       </div>
      <div className={style.mainBody}>
        <div className={style.menu}>
          <HomeMenu/>
        </div>
        <div className={style.noticeBody}>
          <Notice props={props}/>
        </div>
      </div>

    </div>
  )
}

export default Home;