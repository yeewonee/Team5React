import { Col, Container, Row } from "react-bootstrap";
import style from "./login.module.css";

function Login(props){
  return(
    <Container fluid className={style.back}>
    <Row>
      <Col className={style.col1}></Col>
    </Row>
    <Row>
      <Col className={style.col2}>
        <h1>LOGIN</h1>
      </Col>
    </Row>
    <Row>
      <form className={style.box}>
        <div class="form-group mt-3">
          <label for="exampleInputEmail1">병원 코드</label>
          <input type="text" class="form-control"/>
        </div>
        <div class="form-group">
          <label for="exampleInputEmail1">User ID</label>
          <input type="text" class="form-control"/>
        </div>
        <div class="form-group mt-3">
          <label for="exampleInputEmail1">User Password</label>
          <input type="text" class="form-control"/>
        </div>
        <div className={style.button}>
          <button type="submit" class="btn btn-primary">Login</button>
        </div>
      </form>
    </Row>
    </Container>
  )
}

export default Login;