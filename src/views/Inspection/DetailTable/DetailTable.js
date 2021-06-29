import React from "react";
import classNames from "classnames/bind";
import style from "./DetailTable.module.css";
import CommonTable from "views/table/CommonTable";
import CommonTableColumn from "views/table/CommonTableColumn";
import { useDispatch, useSelector } from "react-redux";
import { createSetCheckDownAction,createSetCheckUpAction } from "redux/inspection_Reducer";
import { StateButton } from "./StateButton";
import { useState } from "react";
import { CSVLink } from "react-csv";
import { useEffect } from "react";
import Modal from "./Modal";
import Barcode from "react-barcode";
import { transitions, positions, Provider as AlertProvider } from 'react-alert'
import AlertTemplate from 'react-alert-template-basic'





const cx = classNames.bind(style);


function DetailTable(props) {

 
  const inspectList = props.data;
  
  const [checkArray, setCheckArray] = useState([]);
  const checkList = useSelector(state => state.inspectReducer.checked);
  const patient = useSelector(state => state.inspectReducer.patient);
  
  
  

  const changeCheck = (event, index) => {
    let check = checkArray;
    if (event.target.checked) {
      check[index] = true;
    } else {
      check[index] = false;
    }
    setCheckArray(check);
  };

  console.log(checkArray.indexOf(true))

  console.log(checkArray)
  const checkState=()=>{
    checkArray.splice(0,checkArray.length)
  }

  useEffect(() => {
    setCheckArray([])
  }, [patient.pno])
 

  const dispatch = useDispatch();


  const options = {
    // you can also just use 'bottom center'
    position: positions.MIDDLE,
    timeout: 3000,
    offset: '-130px',
    // you can also just use 'scale'
    transition: transitions.SCALE,
    containerStyle: {
      
    }
  }



  const changeHandler = (checked,board) => {
    if (checked) {
      dispatch(createSetCheckDownAction(board));
    } else {
      // 체크 해제
      dispatch(createSetCheckUpAction(board));
    }
  };

  let bundle = "";
  const viewBundleCode = (bno) => {
    if(bundle !== bno){
      bundle = bno;
      return bno;
    }else{
      return "";
    }
  }



  const headers = [
    { label: '환자번호', key: 'pno'},
    { label: '묶음코드', key: 'bno'},
    { label: '검사명', key: 'iname'},
    { label: '검사번호', key: 'ino'},
    { label: '단위', key: 'unit'},
    { label: '검사자', key: 'inspector'},
    { label: '검사상태', key: 'istatus'},
  ];

  const [ modalOpen, setModalOpen ] = useState(false);

  const openModal = () => {
      setModalOpen(true);
  }
  const closeModal = () => {
      setModalOpen(false);
  }

  const checkColor = (ino) =>{
    const arr = checkList.find((value)=>value.ino === ino);
    console.log(arr)
    if(arr){
      return true;
    }
  }
 
  return (
    <div>
      <div className={cx(style.middle_right_bottom)}>
        <div className={cx(style.buttonBox)}>
        
        <AlertProvider template={AlertTemplate} {...options}>
          <StateButton value={'바코드 출력'} change={'접수'} check={checkArray} checkfun={checkState} list={inspectList} openModal={openModal}></StateButton>
          <Modal open={ modalOpen } close={ closeModal } header="Modal heading">
          <Barcode value={"      "+patient.pno+patient.pno+patient.pno+patient.pno+patient.pno+"      "} style={{textAlign:'center'}}/>
          </Modal>
          <StateButton value={'접수 취소'} change={'대기'} check={checkArray} checkfun={checkState} list={inspectList}></StateButton>
          <StateButton value={'채혈 완료'} change={'완료'} check={checkArray} checkfun={checkState} list={inspectList}></StateButton>
          </AlertProvider>
          <button className={cx(style.stateButton)}>
            <CSVLink 
              headers={headers} 
              data={checkList} 
              filename="users.csv" 
              target="_blank"
              style={{color: 'black', textDecoration:'none'}}
            >
              엑셀 저장
            </CSVLink>
        </button>
           
        </div>
        <div className="right-table">
          <CommonTable headersName={["", "묶음코드", "처방코드", "검사명", "단위", "검사자", "상태"]} tstyle={"table table-sm"}>
            {inspectList.map((board, index) =>  (
              <tr key={board.ino} className={checkColor(board?.ino)? cx(style.colorClass):cx(style.ncolorClass)}>
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
                <CommonTableColumn>{viewBundleCode(board.bno)}</CommonTableColumn>
                <CommonTableColumn>{board.ino}</CommonTableColumn>
                <CommonTableColumn>{board.iname}</CommonTableColumn>
                <CommonTableColumn>{board.unit}</CommonTableColumn>
                <CommonTableColumn>{board.inspector}</CommonTableColumn>
                <CommonTableColumn>{board.istatus}</CommonTableColumn>
              </tr>
            ))}
          </CommonTable>
        </div>
      </div>
    </div>
  );
}

export default DetailTable;
