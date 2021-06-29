import React from "react";
import style from "./PatientTable.module.css";
import classNames from "classnames/bind";
import { useState } from "react";
import CommonTable from "views/table/CommonTable";
import CommonTableColumn from "views/table/CommonTableColumn";
import { useDispatch, useSelector } from "react-redux";
import { createSetPatientAction } from "redux/inspection_Reducer";
import { useEffect } from "react";
import { FaUserCheck } from 'react-icons/fa';

const cx = classNames.bind(style);

function PatientTable(props) {
  const patientList = props.data;
  const [categoryArray, setCategoryArray] = useState(patientList);

  const dispatch = useDispatch();
  useSelector((state) => state.inspectReducer.patient);
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

  const viewStatus = (tstatus)=>{
    if(tstatus === '완료'){
      return(<div style={{color:'rgb(255, 205, 86)'}}>완료</div>)
    }
    if(tstatus === '대기'){
      return(<div style={{color:'rgb(255, 99, 132)'}}>대기</div>)
    }
    if(tstatus === '진행중'){
      return(<div style={{color:'rgb(54, 162, 235)'}}>진행중</div>)
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
      {categoryArray.length!==0?
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
              <CommonTableColumn>{viewStatus(board.tstatus)}</CommonTableColumn>
            </tr>
            // </CommonTableRow>
          ))}
        </CommonTable>
      </div>:
      <div>
      <div style={{display:'flex', justifyContent:'center', alignItems:'center',flexDirection:'column',height:'45vh'}}>
        <div><FaUserCheck size={'10em'}/></div>
        <div style={{marginTop:'15px',fontSize:'30px'}}>일치하는 환자가 없습니다.</div>
     </div>
     </div>}
    </div>
  );
}

export default PatientTable;
