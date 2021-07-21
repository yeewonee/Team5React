import React from "react";
import classNames from "classnames/bind";
import style from "./DetailTable.module.css";
import CommonTable from "views/table/CommonTable";
import CommonTableColumn from "views/table/CommonTableColumn";
import { useDispatch, useSelector } from "react-redux";
import { createSetCheckDownAction,createSetCheckUpAction, UpdatePstatusAction, UpdateResult } from "redux/inspection_Reducer";
import { StateButton } from "./StateButton";
import { useState } from "react";
import { CSVLink } from "react-csv";
import { useEffect } from "react";
import Modal from "./Modal";
import Barcode from "react-barcode";
import { transitions, positions, Provider as AlertProvider } from 'react-alert'
import AlertTemplate from 'react-alert-template-basic'
import { FaUserCheck } from 'react-icons/fa';
import Swal from 'sweetalert2';
import { UpdateInspectResult } from "apis/inspection";





const cx = classNames.bind(style);


function DetailTable(props) {

  const inspectList = props.data;
  const dispatch = useDispatch();
  //체크한 항목을 담는 리스트 상태(체크박스 활성화 비활성화 여부)
  const [checkArray, setCheckArray] = useState([]);
  //체크한 항목의 객체들을 담고 있는 리스트 상태
  const checkList = useSelector(state => state.inspectReducer.checked);
  //체크한 환자의 상태
  const patient = useSelector(state => state.inspectReducer.patient);
    //alert
    const options = {
      position: positions.MIDDLE,
      timeout: 3000,
      offset: '-130px',
      transition: transitions.SCALE,
      containerStyle: {
        
      }
    }
  
  //체크박스 활성화 비활성화 여부를 위한 함수
  const changeCheck = (event, index) => {
    let check = checkArray;
    if (event.target.checked) {
      check[index] = true;
    } else {
      check[index] = false;
    }
    setCheckArray(check);
  };

  //다른 환자 클릭시 체크상태 비워주기
  useEffect(() => {
    setCheckArray([])
  }, [patient.pno])

  //체크 리스트 비워주기(stateButton 컴포넌트에서 사용)
  const checkState=()=>{
    checkArray.splice(0,checkArray.length);
  }

  //체크된 객체 리덕스에 담는 함수
  const changeHandler = (checked,board) => {
    if (checked) {
      dispatch(createSetCheckDownAction(board));
    } else {
      // 체크 해제
      dispatch(createSetCheckUpAction(board));
    }
  };

  //중복되는 묶음코드를 하나만 보여주기 위한 함수
  let bundle = "";
  const viewBundleCode = (bno) => {
    if(bundle !== bno){
      bundle = bno;
      return bno;
    }else{
      return "";
    }
  }

  //엑셀저장 헤더
  const headers = [
    { label: '환자번호', key: 'patientId'},
    { label: '묶음코드', key: 'bundleCode'},
    { label: '검사명', key: 'iName'},
    { label: '검사번호', key: 'iId'},
    { label: '단위', key: 'iUnit'},
    { label: '검사자', key: 'inspector'},
    { label: '검사상태', key: 'iStatus'},
  ];

  //바코드 모달창 열고 닫기에 대한 상태
  const [ modalOpen, setModalOpen ] = useState(false);
  const [ modalOpen2, setModalOpen2 ] = useState(false);

  const openModal = () => {
      setModalOpen(true);
  }
  const closeModal = () => {
      setModalOpen(false);
  }

  const openModal2 = () => {
    setModalOpen2(true);
}
const closeModal2 = () => {
    setModalOpen2(false);
}



  //istatus에대한 글씨 색상
  const viewStatus = (istatus)=>{
    if(istatus === '완료'){
      return(<div style={{color:'rgb(255, 205, 86)'}}>완료</div>)
    }
    if(istatus === '대기'){
      return(<div style={{color:'rgb(255, 99, 132)'}}>대기</div>)
    }
    if(istatus === '접수'){
      return(<div style={{color:'rgb(54, 162, 235)'}}>접수</div>)
    }
  }

  const excelNone = ()=>{
    Swal.fire({
      icon: 'error',
      text: '항목을 선택해주세요',
      confirmButtonColor: '#3085d6'
    })
  }

  const [result, setResult] = useState('');

  const handleChange = (event) =>{
    setResult(event.target.value)
  }

  const sendResult = async() =>{
    const DiagnosisInspection ={
      patientId:checkList[0].patientId,
      iId:checkList[0].iId,
      bundleCode:checkList[0].bundleCode,
      iResult:result
    }
    const response= await UpdateInspectResult(DiagnosisInspection);
    if(response.data.result ==='success'){
      findInspect();
      dispatch(UpdateResult(DiagnosisInspection))
      dispatch(UpdatePstatusAction("진행중"))
      Swal.fire({
        position: 'middle',
        icon: 'success',
        title: '저장되었습니다.',
        showConfirmButton: false,
        timer: 1500
      })
    }else{
      Swal.fire({
        icon: 'error',
        text: '결과값을 입력해주세요.',
        confirmButtonColor: '#3085d6'
      })
    }
    setResult('');
  }



  const findInspect = () => {
    const select =inspectList.findIndex((value)=>value.iId===checkList[0]?.iId&&value.bundleCode===checkList[0]?.bundleCode&&value.patientId===checkList[0]?.patientId);
    inspectList[select].iResult=result;
  }
   

  return (
    <div>
      <div className={cx(style.middle_right_bottom)}>
        <div className={cx(style.buttonBox)}>
        
        <AlertProvider template={AlertTemplate} {...options}>
          <StateButton value={'바코드 출력'} change={'접수'}  checkfun={checkState} list={inspectList} openModal={openModal}></StateButton>
          <Modal open={ modalOpen } close={ closeModal } header="접수 바코드">
          <Barcode value={"      "+patient.pno+patient.pno+patient.pno+patient.pno+patient.pno+"      "} style={{textAlign:'center'}}/>
          </Modal>
          <StateButton value={'접수 취소'} change={'대기'} checkfun={checkState} list={inspectList}></StateButton>
          <StateButton  value={'결과 등록'} change={'등록'} openModal2={openModal2}></StateButton>
          <Modal open={ modalOpen2 } close={ closeModal2 } header="결과등록">
            <div style={{display:'flex',flexDirection:'column' ,justifyContent:'center',alignItems:'center'}}>
              <div style={{fontSize:'20px'}}>결과값을 입력해주세요.</div>
              <div style={{display:'flex'}}>
                <div style={{marginRight:'10px',marginTop:'7px'}}><input type="text" value={result} onChange={handleChange}></input></div>
                <div><button className={cx(style.stateButton)} style={{border:'1px solid black'}} type='button' onClick={sendResult}>저장</button></div>
              </div>
              {checkList[0]?.iResult===null?
                <div style={{marginTop:'7px'}}>저장된 결과값이 없습니다.</div>        
              :
                <div style={{marginTop:'7px'}}>저장된 결과값:{checkList[0]?.iResult} </div>
               }
            </div>
          </Modal>
          <StateButton value={'검사 완료'} change={'완료'}  checkfun={checkState} list={inspectList}></StateButton>
          </AlertProvider>
          <button className={cx(style.stateButton)}>
            {checkList.length!==0?
            <React.Fragment>
            <CSVLink 
              headers={headers} 
              data={checkList} 
              filename="users.csv" 
              target="_blank"
              style={{color: 'black', textDecoration:'none'}}
            >
              엑셀 저장
            </CSVLink>
            </React.Fragment>:
            <>
            <div onClick={excelNone}>
              엑셀 저장
            </div>
            </>
            }
          </button>    
        </div>
    
        {patient.pno!==""?
        <div className="right-table">
          <CommonTable headersName={["", "묶음코드", "처방코드", "검사명", "단위", "검사자", "상태"]} tstyle={"table table-sm"}>
            {inspectList.map((board, index) =>  (
              <tr key={index} className={checkArray[index]? cx(style.colorClass):cx(style.ncolorClass)}>
                <CommonTableColumn>
                  <input
                    id={board.ino}
                    type="checkbox"
                    onChange={(event) => {
                      changeHandler(event.currentTarget.checked,board);
                      changeCheck(event,index)
                    }}
                    checked={checkArray[index]||''}
                  />
                </CommonTableColumn>
                <CommonTableColumn>{viewBundleCode(board.bundleCode)}</CommonTableColumn>
                <CommonTableColumn>{board.iId}</CommonTableColumn>
                <CommonTableColumn>{board.iName}</CommonTableColumn>
                <CommonTableColumn>{board.iUnit}</CommonTableColumn>
                <CommonTableColumn>{board.inspector}</CommonTableColumn>
                <CommonTableColumn>{viewStatus(board.iStatus)}</CommonTableColumn>
              </tr>
            ))}
          </CommonTable>
        </div>
        :<div>
          <div style={{display:'flex', justifyContent:'center', alignItems:'center',flexDirection:'column',height:'45vh'}}>
            <div><FaUserCheck size={'10em'}/></div>
            <div style={{marginTop:'15px',fontSize:'30px'}}>환자를 선택해주세요.</div>
         </div>
         </div>}
      </div>
    </div>
  );
}

export default DetailTable;
