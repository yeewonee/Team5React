import React, { useCallback } from "react";
import style from "./PatientTable.module.css";
import classNames from "classnames/bind";
import { useState } from "react";
import CommonTable from "views/table/CommonTable";
import CommonTableColumn from "views/table/CommonTableColumn";
import { useDispatch, useSelector } from "react-redux";
import { createSetPatientAction } from "redux/inspection_Reducer";
import { useEffect } from "react";
import { FaUserCheck } from 'react-icons/fa';
import { Loading } from "views/Diagnosis/Loading";

const cx = classNames.bind(style);

function PatientTable(props) {
  const patientList = props.data;
  const categoryArray = props.categoryArray;
  const changeCategory =props.fun;
  const changeSearch = props.keywordArr;
  const loading = props.loading


  //카테고리 리스트 배열상태
  // const [categoryArray, setCategoryArray] = useState(patientList);
  //검색어 상태
  const [keyword,setKeyword] = useState("")
  //체크한 환자의 pno와 tstatus를 객체의 속성으로 가지고 있는 상태
  const [check, setCheck] = useState({
    pno: "",
    did:"",
    tstatus: "",
  });


  

  const dispatch = useDispatch();
  const state = useSelector((state) => state.inspectReducer.patient);
  let arr = [];



for(let i =0; i<categoryArray.length; i++){
  if(categoryArray[i].patientId===state.pno){
    categoryArray[i].totalIstatus = state.tstatus;
    console.log(categoryArray[i].totalIstatus)
  }
 }
  console.log("카테고리어레이"+ categoryArray)
  //체크한 환자의 pno와 tstatus를 check상태값으로 상태 변화   
  const getCheck = (event) => {
    const value = patientList.find((value) => event.target.value === value.patientId);
    if (event.target.checked) {
      setCheck((prevCheck) => {
        return {
          ...prevCheck,
          pno: event.target.value,
          did:value.dId,
          tstatus: value.totalIstatus,
        };
      });
    }
  };


  //check.pno가 변경될때만 리덕스로 dispatch(선택한 환자 pno,tstatus 리덕스에서 관리)
  useEffect(() => {
    dispatch(createSetPatientAction(check));
  }, [check.pno]);

  //카테고리 리스트 보여주기 위한 함수
  // const changeCategory = (value) => {
  //   // if (value === "전체") {
  //   //   setCategoryArray(patientList);
  //   // }
  //   // if (value === "대기") {
  //   //   arr = patientList.filter((list) => list.totalIstatus === value);
  //   //   setCategoryArray(arr);
  //   // }
  //   // if (value === "진행중") {
  //   //   arr = patientList.filter((list) => list.totalIstatus === value);
  //   //   console.log(arr);
  //   //   setCategoryArray(arr);
  //   // }
  //   // if (value === "완료") {
  //   //   arr = patientList.filter((list) => list.totalIstatus === value);
  //   //   setCategoryArray(arr);
  //   // }
  // };

  changeCategory();

  //검색어 상태변화
  const inputChange = (event) =>{
    setKeyword(event.target.value)
  }

  //검색어와 일치하는 리스트 불러오는 함수
  const searchChange = () =>{
    if(keyword ===""){
      alert("검색어를 입력해주세요")
      return
    }
    else{
      arr = patientList.filter((list)=>list.patientName.includes(keyword))
      changeSearch(arr)
      // setCategoryArray(arr)
    }
  }

  const viewDate = (str) =>{
   const strArr=str.split(" ")
   const hour =strArr[1].substr(0,5)
   return hour 
  }

  

  //tstatus마다 color 설정
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
      {loading?
      <>
      <div style={{marginTop:'25%', marginLeft:'40%'}}> 
      <Loading height={80} width={80}/>
      </div> 
      <p style={{marginLeft:'42%'}}>Loading..</p>
      </>
      :
      <React.Fragment>
      {categoryArray.length!==0?
      <div className={cx(style.left_table)}>
        <CommonTable headersName={["", "순서", "환자번호", "성명", "성별/나이", "예약시간", "상태"]} tstyle={"table table-sm"}>
          {categoryArray.map((board, index) => (
            //삼항연산자 사용해서 체크한 row만 color
            <tr key={index} className={board.patientId === check.pno ? cx(style.colorClass) : cx(style.ncolorClass)}>
              <CommonTableColumn>
                <input type="checkbox" name="patient" value={board.patientId} checked={board.patientId === check.pno} onChange={getCheck} />
              </CommonTableColumn>
              <CommonTableColumn>{index+1}</CommonTableColumn>
              <CommonTableColumn>{board.patientId}</CommonTableColumn>
              <CommonTableColumn>{board.patientName}</CommonTableColumn>
              <CommonTableColumn>
                {board.patientSex}/{board.patientAge}
              </CommonTableColumn>
              <CommonTableColumn>{viewDate(board.iDate)}</CommonTableColumn>
              <CommonTableColumn>{viewStatus(board.totalIstatus)}</CommonTableColumn>
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
     </div>
     }</React.Fragment>}
    </div>
  );
}

export default React.memo(PatientTable);
