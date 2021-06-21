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
import { getInspectList } from "../data";


const cx = classNames.bind(style);

function DetailTable(props) {
  const state = props.data;
  const inspectList = getInspectList(state?.pno);
  console.log(inspectList.length)
  
  const arr = Array.from({ length: inspectList.length }, () => false);
  const [checkArray, setCheckArray] = useState(arr);
  console.log(checkArray)
  const checkList = useSelector(state => state.inspectReducer.checked);
  

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
  // const arr =[]

  const dispatch = useDispatch();




  const changeHandler = (checked,board) => {
    if (checked) {
      dispatch(createSetCheckDownAction(board));
    } else {
      // 체크 해제
      dispatch(createSetCheckUpAction(board));
    }
  };

  // for(let i=0; i<inspectList?.length; i++){
  //   if(inspectList[i].istatus === '완료'){
  //     arr.push(inspectList[i])
  //   }
  // }
  // // if(arr.length === inspectList.length){
  //   // dispatch(UpdatePstatusAction({pno:patient?.pno,tstatus:'완료'}))
  //   dispatch(UpdatePstatusAction('완료')) 
  // }

  return (
    <div>
      <div className={cx(style.middle_right_bottom)}>
        <div className={cx(style.buttonBox)}>
          <StateButton value={'바코드 출력'} change={'접수'} check={checkArray} checkfun={checkState}></StateButton>
          <StateButton value={'접수 취소'} change={'대기'} check={checkArray} checkfun={checkState}></StateButton>
          <StateButton value={'채혈 완료'} change={'완료'} check={checkArray} checkfun={checkState}></StateButton>
           
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
                    checked={checkArray[index]}
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
