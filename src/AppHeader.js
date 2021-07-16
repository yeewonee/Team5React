
import { Link } from "react-router-dom";
import { AiOutlineUser } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { createSetAuthTokenAction, createSetUidAction } from "redux/auth-reducer";
import { removeAuthHeader } from "apis/axiosConfig";
import { useState } from "react";
import { ModalChat } from "views/Chatting/ModalChat";
import { BsFillChatSquareDotsFill } from "react-icons/bs";

function AppHeader() {
  const username = useSelector((state) => state.authReducer.name);
  const dispatch = useDispatch();

  const logout = (event) => {
    //Redux 이용
    dispatch(createSetUidAction(""));
    dispatch(createSetAuthTokenAction(""));
    removeAuthHeader();

    //SessionStorage에 인증 내용 제거
    sessionStorage.removeItem("uid")
    sessionStorage.removeItem("authToken");
    sessionStorage.removeItem("role");
    sessionStorage.removeItem("name");


  };

  const [modalOpen, setModalOpen] = useState(false);
  const openModal = (event, day) => {
    setModalOpen(true);
  };
  const closeModal = () => {
    setModalOpen(false);
  };

  return (
    <div>
      <header>
        <div className="header-container" style={{fontFamily: "DoHyeon-Regular"}}>
          <div className="logo ml-3"><Link to="/" style={{textDecoration:"none"}}>wehago-h</Link></div>
          <div className="user">
            <BsFillChatSquareDotsFill style={{marginRight: '20px'}} onClick={(event, day)=>{openModal(event)}}/>
          <div className="mr-4"><AiOutlineUser /> {username}</div>
          <button type="button" className="btn btn-light">
            <Link to="/" style={{textDecoration:"none"}} onClick={logout}>로그아웃</Link>
          </button>
          </div>
        </div>
      </header>
      <ModalChat 
        closeModal={closeModal}
        modalOpen={modalOpen}
      />   
    </div>
  );
}

export default AppHeader;