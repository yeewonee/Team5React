import { Col, Container, Row } from "react-bootstrap";
import style from "./login.module.css";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { createSetUser } from "redux/auth-reducer";

function Login(props){
  const dispatch = useDispatch();

  const handleLogin = (event) => {
    dispatch(createSetUser());
  };

  return(
    <div className={style.bg}>
      <div className={style.titleBox}><div className={style.titleContent}>Login</div></div>
      <div style={{display:'flex', justifyContent:'center', alignItems:'center'}}>
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
            <button type="submit" className="btn btn-primary" style={{backgroundColor:'#4dabf7', border:'none'}} onClick={handleLogin}>로그인</button>&nbsp;
            <button type="submit" className="btn btn-danger" style={{backgroundColor:'#f74d4d', border:'none'}}><Link to="/" style={{textDecoration:'none', color:'white'}}>취소</Link></button>
          </div>
        </form>
      </div>
    </div>

  )
}

export default Login;