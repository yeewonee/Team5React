import React, { useCallback } from "react";
import style from "./medecinelist.module.css";
import { getMedicineList } from "apis/diagnosis";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createSetAddMlistAction } from "redux/diagnosis-reducer";
import CommonTableColumn from "views/table/CommonTableColumn";
import CommonTable from "views/table/CommonTable";
import { useEffect } from "react";
import { AiFillMedicineBox } from "react-icons/ai";
import { Loading } from "../Loading";
import Swal from 'sweetalert2'

export const MedicineList = React.memo((props) => {

  //추가된 약 목록
  const medicineList = useSelector((state) => {
    return state.diagnosisReducer.mlist;
  });
  
  const [loading, setLoading] = useState(null);
  console.log("약 목록 렌더링")
  //DB에서 받아온 최초 약 목록
  const [mList, setMlist] = useState(medicineList);

  const medicine = async () => {
    setLoading(true);
    try {
      const response = await getMedicineList();
      setMlist(response.data);
      setKeywordList(response.data);
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    medicine();
  }, []);

  //DB에서 약 목록 size 받아오기
  const arr = Array.from({ length: mList.length }, () => false);
  //checked 상태
  const [checkArray, setCheckArray] = useState(arr);
  const changeCheck = (event, index, m) => {
    if (list.mlist.includes(m) && event.target.checked) {
      //이미 추가된 약이 있으면 check 금지
      return;
    }

    let checkarray = checkArray;
    if (event.target.checked) {
      checkarray[index] = true;
    } else {
      checkarray[index] = false;
    }
    setCheckArray(checkarray);
  };

  //검색어 상태
  const [keyword, setKeyword] = useState("");
  const keywordChange = (event) => {
    setKeyword(event.target.value);
  };

  const [keywordList, setKeywordList] = useState([]);
  const keywordButton = (event) => {
    setCheckArray(arr);
    //검색어에 맞는 리스트를 상태에 저장
    if (keyword === "") {
      setKeywordList(mList.filter((mList) => mList.mName !== keyword));
    } else {
      setKeywordList(mList.filter((mList) => mList.mName.includes(keyword)));
    }
  };

  //추가 버튼을 누르기 전 임시상태 저장
  const [list, setList] = useState({
    mlist: [],
  });

  //props가 변경되었을 때 mlist를 업데이트
  useEffect(() => {
    setList({
      mlist: medicineList,
    });
  }, [medicineList]);

  const medicineClick = (event, m) => {
    //리덕스에 이미 추가되어 있으면 상태 변경 전 return
    if (list.mlist.includes(m) && event.target.checked) {
      Swal.fire({
        icon: 'error',
        text: '이미 추가된 항목입니다.',
        confirmButtonColor: '#3085d6'
      })
      return;
    }

    if (event.target.checked) {
      setList((prevList) => {
        return {
          ...prevList,
          mlist: prevList.mlist.concat(m),
        };
      });
    } else {
      setList((prevList) => {
        return {
          ...list,
          mlist: list.mlist.filter((item) => {
            return item.mId !== m.mId;
          }),
        };
      });
    }
  };

  const dispatch = useDispatch();
  const addMedicine = (event) => {
    //추가 버튼
    dispatch(createSetAddMlistAction(list.mlist));
    //check 상태 초기화
    let checkarray = arr;
    setCheckArray(checkarray);
  };


  return (
    <>
      <div className={style.m_list_container}>
        <div className="d-flex justify-content-between">
        <div className="input-group m-1">
          <input type="text" name="keyword" onChange={keywordChange} value={keyword} />
          <div className="input-group-append">
            <button className="btn btn-outline-secondary btn-sm" type="button" onClick={keywordButton}>
              검색
            </button>
          </div>
        </div>
        <div className="mr-1 mt-1">
          <input type="button" className="btn btn-sm" style={{ backgroundColor: "#4dabf7", color: "white" }} value="추가" onClick={addMedicine} />
        </div>
      </div>
      
      {loading ?
      <>
      <div style={{marginTop:'5%', marginLeft:'45%'}}> 
        <Loading height={30} width={30}/>
      </div> 
      <p style={{marginLeft:'43%'}}>Loading..</p>
      </>
      :
      <>
      {keywordList.length !== 0 ? (
        <div className={style.m_list}>
          <CommonTable headersName={["", "코드", "명칭", "구분", "단위"]} tstyle={"table table-sm"}>
            {keywordList.map((medicine, index) => (
              <tr key={medicine.mId} className={checkArray[index] ? style.select_Color : style.basic_Color}>
                <CommonTableColumn>
                  <input
                    type="checkbox"
                    onChange={(event) => {
                      changeCheck(event, index, medicine);
                    }}
                    checked={checkArray[index] || ""}
                    onClick={(event) => medicineClick(event, medicine)}
                    style={{ zoom: "1.2", paddingTop: "2px" }}
                  />
                </CommonTableColumn>
                <CommonTableColumn>{medicine.mId}</CommonTableColumn>
                <CommonTableColumn>{medicine.mName}</CommonTableColumn>
                <CommonTableColumn>{medicine.mCategory}</CommonTableColumn>
                <CommonTableColumn>{medicine.mUnit}</CommonTableColumn>
              </tr>
            ))}
          </CommonTable>
        </div>
      ) : (
        <div className={style.p_list}>
          <div style={{ borderTop: "1px solid #e7f5ff", height: "100%" }}>
            <div style={{ paddingLeft: "45%", paddingTop: "5%" }}>
              <AiFillMedicineBox size={"3em"} />
            </div>
            <p style={{ textAlign: "center", fontSize: "1em" }}>일치하는 약 종류가 없습니다.</p>
          </div>
        </div>
      )}</>}
      </div>
    </>
  );
});
