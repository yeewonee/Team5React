import React from "react";
import style from "./PatientTable.module.css";
import classNames from "classnames/bind";
import { useState } from "react";
import CommonTable from "views/table/CommonTable";
import CommonTableRow from "views/table/CommonTableRow";
import CommonTableColumn from "views/table/CommonTableColumn";
import { useDispatch, useSelector } from "react-redux";
import { createSetPatientAction, UpdatePstatusAction } from "redux/inspection_Reducer";
import { useEffect } from "react";

const cx = classNames.bind(style);

function PatientTable(props) {
  const patientList = props.data;

  const dispatch = useDispatch();
  const patient = useSelector(state => state.inspectReducer.patient)
  const [check, setCheck] = useState({
    pno:'',
    tstatus:''
  });


  const getCheck = (event) => {
    const value = patientList.find(value => event.target.value===value.pno);
    if (event.target.checked) {
       setCheck(prevCheck=>{
            return{
                ...prevCheck,
                pno: event.target.value,
                tstatus:value.tstatus
            }
      });
    }
  };
  


  useEffect(()=>{
    dispatch(createSetPatientAction(check));
    console.log("리렌더링")
  },[check.pno])

  return (
    <div>
      <div className={cx(style.left_menu_bar)}>
        <div className={cx(style.categoryBar)}>
          <ul>
            <li>
              <button className="ml-2">전체</button>
            </li>
            <li>
              <button className="ml-2">대기</button>
            </li>
            <li>
              <button className="ml-2">진행 중</button>
            </li>
            <li>
              <button className="ml-2">완료</button>
            </li>
          </ul>
        </div>
        <div className={cx(style.searchBar)}>
          <input type="text" placeholder="검색어" />
          <button>검색</button>
        </div>
      </div>
      <div className={cx(style.left_table)}>
        <CommonTable headersName={["", "순서", "환자번호", "성명", "성별/나이", "예약시간", "상태"]}>
          {patientList.map((board) => (
            <CommonTableRow key={board.sequence}>
              <CommonTableColumn>
                <input type="checkbox" name="patient" value={board.pno} checked={board.pno ===check.pno} onChange={getCheck} />
              </CommonTableColumn>
              <CommonTableColumn>{board.sequence}</CommonTableColumn>
              <CommonTableColumn>{board.pno}</CommonTableColumn>
              <CommonTableColumn>{board.pname}</CommonTableColumn>
              <CommonTableColumn>
                {board.sex}/{board.age}
              </CommonTableColumn>
              <CommonTableColumn>{board.rtime}</CommonTableColumn>
              <CommonTableColumn>{board.tstatus}</CommonTableColumn>
            </CommonTableRow>
          ))}
        </CommonTable>
      </div>
    </div>
  );
}

export default PatientTable;
