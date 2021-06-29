
import { Link } from "react-router-dom";
import { AiOutlineUser } from "react-icons/ai";

function AppHeader() {
  return (
    <div>
      <header>
        <div className="header-container" style={{fontFamily: "DoHyeon-Regular"}}>
          <div className="logo ml-3"><Link to="/" style={{textDecoration:"none"}}>wehago-h</Link></div>
          <div className="user">
            <div className="mr-4"><AiOutlineUser /> 김명휘</div>
            <button type="button" className="btn btn-light">
              <Link to="/login" style={{textDecoration:"none"}}>로그아웃</Link>
            </button>
          </div>
        </div>
      </header>
    </div>
  );
}

export default AppHeader;