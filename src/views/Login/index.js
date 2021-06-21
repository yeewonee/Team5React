import { Col, Container, Row } from "react-bootstrap";
import style from "./login.module.css";

function Login(props){
  return(
    <div className={style.test}>
    <Container fluid>
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
        <div className="form-group mt-3">
          <label >병원 코드</label>
          <input type="text" className="form-control"/>
        </div>
        <div className="form-group">
          <label >User ID</label>
          <input type="text" className="form-control"/>
        </div>
        <div className="form-group mt-3">
          <label >Password</label>
          <input type="text" className="form-control"/>
        </div>
        <div className={style.button}>
          <button type="submit" className="btn btn-primary">Login</button>
        </div>
      </form>
    </Row>
    </Container>
    </div>
  )
}

export default Login;