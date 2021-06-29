import { Col, Container, Row } from "react-bootstrap";
import HomeMenu from "./HomeComponent";
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
        <Col xs={5} className="ml-4">
          <HomeMenu/>
        </Col>
        <Col className="mr-3">
          <Notice props={props}/>
        </Col>
      </Row>
    </Container>
  )
}

export default Home;