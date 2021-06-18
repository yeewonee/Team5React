import { Col, Container, Row } from "react-bootstrap";
import HomeMenu from "./HomeComponent/HomeMenu";
import Notice from "./NoticeComponent";
import style from "./home.module.css";

function Home(props){
  return(
    <Container fluid className={style.back}>
    <Row>
      <Col className={style.col1}></Col>
    </Row>
    <Row>
      <Col className={style.col2}>
        <h1>WEHAGO-H</h1>
      </Col>
    </Row>
    <Row>
      <Col>
        <HomeMenu/>
      </Col>
      <Col>
        <Notice/>
      </Col>
    </Row>
    </Container>
  )
}

export default Home;