import style from "./login.module.css";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { createSetAuthTokenAction, createSetNameAction, createSetRoleAction, createSetUidAction } from "redux/auth-reducer";
import { useState } from "react";
import { addAuthHeader } from "apis/axiosConfig";
import { login } from "apis/auth";
import Swal from 'sweetalert2'


function Login(props){
  const dispatch = useDispatch();

  const handleChange = (event) => {
    setUser({
      ...user,
      [event.target.name] : event.target.value
    });
  }

  const handleLogin = async (event) => {
    try {
      //로그인 요청
       await login(user)
      .then((response) => {
        if(response.data.userid){
          addAuthHeader(response.data.authToken);
          //Redux에 인증 내용 저장
          dispatch(createSetUidAction(response.data.userid));
          dispatch(createSetAuthTokenAction(response.data.authToken));
          dispatch(createSetRoleAction(response.data.role));
          dispatch(createSetNameAction(response.data.name));
          //SessionStorage에 인증 내용 저장(브라우저 갱신시 사용)
          sessionStorage.setItem("uid", response.data.userid);
          sessionStorage.setItem("authToken", response.data.authToken);
          sessionStorage.setItem("role", response.data.role);
          sessionStorage.setItem("name", response.data.name);
        }else{
          Swal.fire({
            icon: 'error',
            text: '로그인 정보가 올바르지 않습니다.',
            confirmButtonColor: '#3085d6'
          })
        }
      })
    } catch (error) {
      console.log(error);
    }
  };

  const [user, setUser] = useState({
    hid:"",
    uid: "",
    upassword: ""
  })

  return(
    <div className={style.bg}>
      <div className={style.titleBox}><div className={style.titleContent}>Login</div></div>
      <div style={{display:'flex', justifyContent:'center', alignItems:'center'}}>
        <div className={style.box}>
          <div className="form-group mt-3">
            <div>병원 코드</div>
            <input type="text" className="form-control" name="hid" value={user.hid} onChange={handleChange}/>
          </div>
          <div className="form-group">
            <div >User ID</div>
            <input type="text" className="form-control" name="uid" value={user.uid} onChange={handleChange}/>
          </div>
          <div className="form-group mt-3">
            <div >Password</div>
            <input type="password" className="form-control" name="upassword" value={user.upassword} onChange={handleChange}/>
          </div>
          <div className={style.button}>
            <button className="btn btn-primary" style={{backgroundColor:'#4dabf7', border:'none'}} onClick={handleLogin}>로그인</button>&nbsp;
            <button className="btn btn-danger" style={{backgroundColor:'#f74d4d', border:'none'}}><Link to="/" style={{textDecoration:'none', color:'white'}}>취소</Link></button>
          </div>
        </div>
      </div>
    </div>

  )
}

export default Login;