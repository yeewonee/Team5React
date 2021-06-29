import React from "react";
import style from "./medecinelist.module.css";
import { getMedicineList, getMedicineSearchList } from "../data";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { createSetAddMlistAction } from "redux/diagnosis-reducer";
import CommonTableRow from "views/table/CommonTableRow";
import CommonTableColumn from "views/table/CommonTableColumn";
import CommonTable from "views/table/CommonTable";
import { useEffect } from "react";

import { AiFillMedicineBox } from "react-icons/ai";

export const MedicineList = (props) => {
  const originMList = getMedicineList();
  const [medicineList, setMedicineList] = useState(originMList);

  //DB에서 약 목록 size 받아오기
  const arr = Array.from({ length: medicineList.length }, () => false);
  //checked 상태
  const [checkArray, setCheckArray] = useState(arr);
  const changeCheck = (event, index, m) => {
    if(list.mlist.includes(m) && event.target.checked){ //이미 리덕스에 포함되어 있으면 check 금지
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

  const [keyword, setKeyword] = useState("");
  const keywordChange = (event) => {
    setKeyword(event.target.value);
  };

  const keywordButton = (event) => {
    const keywordMedicine = getMedicineSearchList(keyword);
    setCheckArray(arr);
    if (keyword === "") {
      //검색어가 없으면
      setMedicineList(originMList); //전체 목록 list에 저장
    } else {
      //검색어가 있으면
      setMedicineList(keywordMedicine); //검색어에 맞는 목록 list에 저장
    }
    setList({
      mlist: props.mList,
    });
  };

  const [list, setList] = useState({
    mlist: [],
  });

  //props가 변경되었을 때 mlist를 업데이트
  useEffect(() => {
    setList({
      mlist: props.mList,
    });
  }, [props, keyword]);

  const medicineClick = (event, m) => {
    //리덕스에 이미 추가되어 있으면 상태 변경 전 return
    if(list.mlist.includes(m) && event.target.checked){
      alert('이미 추가된 항목입니다.');
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
  const addMedicine = (event) => {  //추가 버튼
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
            <input type="text" name="keyword" onChange={keywordChange} value={keyword}/>
            <div className="input-group-append">
              <button className="btn btn-outline-secondary btn-sm" type="button" onClick={keywordButton}>
                검색
              </button>
            </div>
          </div>
          <div className="mr-1 mt-1">
            <input type="button" className="btn btn-sm" style={{backgroundColor:'#4dabf7', color:'white'}} value="추가" onClick={addMedicine} />
          </div>
        </div>

        {medicineList.length !== 0 ?
        <div className={style.m_list}>
          <CommonTable headersName={["", "코드", "명칭", "구분", "단위"]} tstyle={"table table-sm"}>
            {medicineList.map((medicine, index) => (
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
        :
        <div className={style.p_list}>
            <div style={{borderTop:'1px solid #e7f5ff', height:'100%'}}>
              <div style={{paddingLeft:'45%', paddingTop:'5%'}}>
                <AiFillMedicineBox size={'3em'}/>
              </div>
              <p style={{textAlign:'center', fontSize:'1em'}}>일치하는 약 종류가 없습니다.</p>
            </div>
          </div>
         }
      </div>
    </>
  );
};
