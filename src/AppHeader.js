
function AppHeader() {
  return (
    <div>
      <header>
        <div className="header-container">
          <div className="logo ml-3">wehago-h</div>
          <div className="user">
            <div className="mr-3">사용자: 김명휘</div>
            <button type="button" className="btn btn-light">
              로그아웃
            </button>
          </div>
        </div>
      </header>
    </div>
  );
}

export default AppHeader;