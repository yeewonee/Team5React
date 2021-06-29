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
            <div>병원 코드</div>
            <input type="text" className="form-control"/>
          </div>
          <div className="form-group">
            <div >User ID</div>
            <input type="text" className="form-control"/>
          </div>
          <div className="form-group mt-3">
            <div >Password</div>
            <input type="text" className="form-control"/>
          </div>
          <div className={style.button}>
            <button type="submit" className="btn btn-danger mr-2"><Link to="/" style={{textDecoration:'none', color:'white'}}>Back</Link></button>
            <button type="submit" className="btn btn-primary" onClick={handleLogin}>Login</button>
          </div>
        </form>
      </div>
    </div>

  )
}

export default Login;