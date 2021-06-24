import React from "react";
import classNames from "classnames/bind";
import style from "./DetailTable.module.css";
import CommonTable from "views/table/CommonTable";
import CommonTableRow from "views/table/CommonTableRow";
import CommonTableColumn from "views/table/CommonTableColumn";
import { useDispatch, useSelector } from "react-redux";
import { createSetCheckDownAction,createSetCheckUpAction, UpdatePstatusAction } from "redux/inspection_Reducer";
import { StateButton } from "./StateButton";
import { useState } from "react";
import { CSVLink } from "react-csv";
import { useEffect } from "react";
import Modal from "./Modal";
import Barcode from "react-barcode";





const cx = classNames.bind(style);


function DetailTable(props) {

 
  const inspectList = props.data;
  
  const [checkArray, setCheckArray] = useState([]);
  const checkList = useSelector(state => state.inspectReducer.checked);
  console.log(checkList)
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


  const checkState=()=>{
    checkArray.splice(0,checkArray.length)
  }

  useEffect(() => {
    setCheckArray([])
  }, [patient.pno])
 

  const dispatch = useDispatch();






  const changeHandler = (checked,board) => {
    if (checked) {
      dispatch(createSetCheckDownAction(board));
    } else {
      // 체크 해제
      dispatch(createSetCheckUpAction(board));
    }
  };



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
  console.log(modalOpen)
  const closeModal = () => {
      setModalOpen(false);
  }

  

  return (
    <div>
      <div className={cx(style.middle_right_bottom)}>
        <div className={cx(style.buttonBox)}>
        

          <StateButton value={'바코드 출력'} change={'접수'} check={checkArray} checkfun={checkState} list={inspectList} openModal={openModal}></StateButton>
          <Modal open={ modalOpen } close={ closeModal } header="Modal heading">
          <Barcode value="http://github.com/kciter" />
          </Modal>
          <StateButton value={'접수 취소'} change={'대기'} check={checkArray} checkfun={checkState} list={inspectList}></StateButton>
          <StateButton value={'채혈 완료'} change={'완료'} check={checkArray} checkfun={checkState} list={inspectList}></StateButton>
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
          <CommonTable headersName={["", "묶음코드", "처방코드", "검사명", "단위", "검사자", "상태"]}>
            {inspectList.map((board, index) =>  (
              <CommonTableRow key={board.ino}>
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
                <CommonTableColumn>{board.bno}</CommonTableColumn>
                <CommonTableColumn>{board.ino}</CommonTableColumn>
                <CommonTableColumn>{board.iname}</CommonTableColumn>
                <CommonTableColumn>{board.unit}</CommonTableColumn>
                <CommonTableColumn>{board.inspector}</CommonTableColumn>
                <CommonTableColumn>{board.istatus}</CommonTableColumn>
              </CommonTableRow>
            ))}
          </CommonTable>
        </div>
      </div>
    </div>
  );
}

export default DetailTable;
