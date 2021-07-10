import { useEffect, useState } from "react";
import { Modal } from "react-bootstrap";
import { getMainNoticeList } from "../data";
import { Loading } from "views/Diagnosis/Loading";

function MainNotice(props) {
  const [mainlist, setMainList] = useState([]);
  const [show, setShow] = useState(false);
  const [loading, setLoading] = useState(null);
  const [board, setBoard] = useState({
    bno: '',
    btitle: '',
    bcontent: '',
    bdate:'',
    bwriter:''
  });

  const getList = async() => { //메인공지사항 리스트 가져오기
    setLoading(true);
    try{
      const list = await getMainNoticeList();
      setMainList(list.data);
      setLoading(false);
    } catch(error){
      console.log(error);
    }
  } 

  useEffect(() => {
    getList();
  },[]);

  const mainNoticeModal = (event, list) => {
    setBoard({
      bno: list.mainNoticeId,
      btitle: list.mainNoticeTitle,
      bdate: list.mainNoticeRegdate,
      bcontent: list.mainNoticeContent,
      bwriter: list.mainNoticeWriter
    })
    setShow(true);
  };

  const handleClose = () => { 
    setShow(false);
  };



  return(
    <>
    {/* 공지사항 모달로 띄워주는 부분 */}
    <Modal show={show} onHide={handleClose} dialogClassName="custom-modal">
      <Modal.Header closeButton>
        <Modal.Title>공지사항</Modal.Title>
      </Modal.Header>
      <Modal.Body>
      <table className="table table-bordered">
              <tbody>
                <tr>
                  <td style={{textAlign:'center'}}>공지번호</td>
                  <td>{board.bno}</td>
                  <td style={{textAlign:'center'}}>글쓴이</td>
                  <td>{board.bwriter}</td>
                </tr>
                <tr>
                  <td style={{textAlign:'center'}}>제목</td>
                  <td colSpan="3">{board.btitle}</td>
                </tr>
                <tr>
                  <td style={{textAlign:'center'}}>내용</td>
                  <td colSpan="3">{board.bcontent}</td>
                </tr>
              </tbody>
            </table>
      </Modal.Body>
      <Modal.Footer>
        <button onClick={handleClose}>
          Close
        </button>
      </Modal.Footer>
      <style jsx="true" global="true">{`
      .custom-modal {
        font-family: "DoHyeon-Regular"; 
      }
      `}
      </style>
    </Modal>
    {loading?
        <>
        <div style={{marginTop:'30%', marginLeft:'43%'}}> 
          <Loading height={60} width={60}/>
        </div> 
        <p style={{marginLeft:'43%'}}>Loading..</p>
        </>
    :
    <div> 
      {mainlist.map((list) => {
        return(
        <div className={"list-group"} key={list.mainNoticeId}>
          <div className={"list-group-item list-group-item-action"}>
            <div className={"d-flex w-100 justify-content-between"}>
              <h5 className={"mb-1"} onClick={(event) => {mainNoticeModal(event, list)}}>{list.mainNoticeTitle}</h5>
              <small>{list.mainNoticeRegdate}</small>
            </div>
            <p className={"mb-1"}>{list.mainNoticeContent}</p>
          </div>
        </div>
        );
      })}
    </div>
    }
    </>
  );
}

export default MainNotice;