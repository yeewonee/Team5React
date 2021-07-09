
import { Link } from "react-router-dom";
import { AiOutlineUser } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { createSetAuthTokenAction, createSetUidAction } from "redux/auth-reducer";
import { removeAuthHeader } from "apis/axiosConfig";

function AppHeader() {
  const globalUid = useSelector((state) => state.authReducer.uid);
  const dispatch = useDispatch();

  const logout = (event) => {
    //Redux 이용
    dispatch(createSetUidAction(""));
    dispatch(createSetAuthTokenAction(""));
    removeAuthHeader();

    //SessionStorage에 인증 내용 제거
    sessionStorage.removeItem("uid")
    sessionStorage.removeItem("authToken");
  };

  return (
    <div>
      <header>
        <div className="header-container" style={{fontFamily: "DoHyeon-Regular"}}>
          <div className="logo ml-3"><Link to="/" style={{textDecoration:"none"}}>wehago-h</Link></div>
          <div className="user">
            <div className="mr-4"><AiOutlineUser /> 김명휘</div>
            <button type="button" className="btn btn-light">
              <Link to="/" style={{textDecoration:"none"}} onClick={logout}>로그아웃</Link>
            </button>
          </div>
        </div>
      </header>
    </div>
  );
}

export default AppHeader;