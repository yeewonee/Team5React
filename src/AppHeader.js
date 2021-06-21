
import { Link } from "react-router-dom";

function AppHeader() {
  return (
    <div>
      <header>
        <div className="header-container">
          <div className="logo ml-3"><Link to="/">wehago-h</Link></div>
          <div className="user">
            <div className="mr-3">사용자: 김명휘</div>
            <button type="button" className="btn btn-light">
              <Link to="/login">로그아웃</Link>
            </button>
          </div>
        </div>
      </header>
    </div>
  );
}

export default AppHeader;