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

export const MedicineList = (props) => {

  const originMList = getMedicineList();
  const [medicineList, setMedicineList] = useState(originMList)


  //DB에서 약 목록 size 받아오기
  const arr = Array.from({ length: medicineList.length }, () => false);
  const [checkArray, setCheckArray] = useState(arr);
  const changeCheck = (event, index) => {
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
    if(keyword===''){ //검색어가 없으면
      setMedicineList(originMList); //list에 전체 목록 넣어주고
    }else{ //검색어가 있으면
      setMedicineList(keywordMedicine); //list에 검색어에 맞는 목록 넣음
    }
    setList({
      mlist: props.mList
    });
  };

  const [list, setList] = useState({
    mlist: []
  });

  //props가 변경되었을 때 mlist를 업데이트
  useEffect(() => {
    setList({
      mlist: props.mList
    });
  }, [props, keyword]);
  
  const medicineClick = (event, m) => {
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
    dispatch(createSetAddMlistAction(list.mlist));
    //DB에서 size 가져오기
    let checkarray = arr;
    setCheckArray(checkarray);
  };

  const onKeyPress = (event) => {
    if(event.key = 'Enter'){
      keywordButton();
    }
  }

  return (
    <>
      <div className={style.m_list_container}>
        <div className="d-flex justify-content-between">
          <div className="input-group m-1">
            <input type="text" name="keyword" onChange={keywordChange} value={keyword} onKeyPress={onKeyPress}/>
            <div className="input-group-append">
              <button className="btn btn-outline-secondary btn-sm" type="button" onClick={keywordButton}>
                검색
              </button>
            </div>
          </div>
          <div className="mr-1 mt-1">
            <input type="button" className="btn btn-primary btn-sm" value="추가" onClick={addMedicine} />
          </div>
        </div>

        <div className={style.m_list}>
          <CommonTable headersName={["", "코드", "명칭", "구분", "단위"]} tstyle={"table table-sm"}>
            {medicineList.map((medicine, index) => (
              <CommonTableRow key={medicine.mId}>
                <CommonTableColumn>
                  <input
                    type="checkbox"
                    onChange={(event) => {
                      changeCheck(event, index);
                    }}
                    checked={checkArray[index] || ''}
                    onClick={(event) => medicineClick(event, medicine)}
                    style={{zoom:'1.2', paddingTop:'2px'}}
                  />
                </CommonTableColumn>
                <CommonTableColumn>{medicine.mId}</CommonTableColumn>
                <CommonTableColumn>{medicine.mName}</CommonTableColumn>
                <CommonTableColumn>{medicine.mCategory}</CommonTableColumn>
                <CommonTableColumn>{medicine.mUnit}</CommonTableColumn>
              </CommonTableRow>
            ))}
          </CommonTable>
        </div>
      </div>
    </>
  );
};
