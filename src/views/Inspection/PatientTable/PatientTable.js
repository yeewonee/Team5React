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
  const [categoryArray, setCategoryArray] = useState(patientList);

  const dispatch = useDispatch();
  const patient = useSelector((state) => state.inspectReducer.patient);
  const [check, setCheck] = useState({
    pno: "",
    tstatus: "",
  });
  let arr = [];

  const [keyword,setKeyword] = useState("")

  const getCheck = (event) => {
    const value = patientList.find((value) => event.target.value === value.pno);
    if (event.target.checked) {
      setCheck((prevCheck) => {
        return {
          ...prevCheck,
          pno: event.target.value,
          tstatus: value.tstatus,
        };
      });
    }
  };

  useEffect(() => {
    dispatch(createSetPatientAction(check));
    console.log("리렌더링");
  }, [check.pno]);

  const changeCategory = (value) => {
    if (value === "전체") {
      setCategoryArray(patientList);
    }
    if (value === "대기") {
      arr = patientList.filter((list) => list.tstatus === value);
      setCategoryArray(arr);
    }
    if (value === "진행중") {
      arr = patientList.filter((list) => list.tstatus === value);
      console.log(arr);
      setCategoryArray(arr);
    }
    if (value === "완료") {
      arr = patientList.filter((list) => list.tstatus === value);
      setCategoryArray(arr);
    }
  };

  const inputChange = (event) =>{
    setKeyword(event.target.value)
  }

  const searchChange = () =>{
    if(keyword ===""){
      alert("검색어를 입력해주세요")
      return
    }
    else{
      arr = patientList.filter((list)=>list.pname.includes(keyword))
      setCategoryArray(arr)
    }
  }

  return (
    <div>
      <div className={cx(style.left_menu_bar)}>
        <div className={cx(style.categoryBar)}>
          <ul>
            <li>
              <button className="ml-2" onClick={() => changeCategory("전체")}>
                전체
              </button>
            </li>
            <li>
              <button className="ml-2" onClick={() => changeCategory("대기")}>
                대기
              </button>
            </li>
            <li>
              <button className="ml-2" onClick={() => changeCategory("진행중")}>
                진행 중
              </button>
            </li>
            <li>
              <button className="ml-2" onClick={() => changeCategory("완료")}>
                완료
              </button>
            </li>
          </ul>
        </div>
        <div className={cx(style.searchBar)}>
          <input type="text" placeholder="검색어" onChange={inputChange} value={keyword} />
          <button onClick={searchChange}>검색</button>
        </div>
      </div>
      <div className={cx(style.left_table)}>
        <CommonTable headersName={["", "순서", "환자번호", "성명", "성별/나이", "예약시간", "상태"]} tstyle={"table table-sm"}>
          {categoryArray.map((board, index) => (
            // <CommonTableRow key={board.sequence} value={row.activeIndex}>
            <tr key={board.sequence} className={board.pno === check.pno ? cx(style.colorClass) : cx(style.ncolorClass)}>
              <CommonTableColumn>
                <input type="checkbox" name="patient" value={board.pno} checked={board.pno === check.pno} onChange={getCheck} />
              </CommonTableColumn>
              <CommonTableColumn>{board.sequence}</CommonTableColumn>
              <CommonTableColumn>{board.pno}</CommonTableColumn>
              <CommonTableColumn>{board.pname}</CommonTableColumn>
              <CommonTableColumn>
                {board.sex}/{board.age}
              </CommonTableColumn>
              <CommonTableColumn>{board.rtime}</CommonTableColumn>
              <CommonTableColumn>{board.tstatus}</CommonTableColumn>
            </tr>
            // </CommonTableRow>
          ))}
        </CommonTable>
      </div>
    </div>
  );
}

export default PatientTable;
