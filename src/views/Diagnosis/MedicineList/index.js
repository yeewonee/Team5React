import React from "react";
import style from "./medecinelist.module.css";
import { getMedicineList } from "../data";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createSetMlistAction } from "redux/diagnosis-reducer";
import CommonTableRow from "views/table/CommonTableRow";
import CommonTableColumn from "views/table/CommonTableColumn";
import CommonTable from "views/table/CommonTable";

export const MedicineList = () => {
  const medicineList = getMedicineList();

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

  const keywordButton = (event) => {};

  //추가된 약 목록
  const resultMlist = useSelector((state) => {
    return state.diagnosisReducer.mlist;
  });

  const [list, setList] = useState({
    mlist: resultMlist,
  });

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
    dispatch(createSetMlistAction(list.mlist));
    //DB에서 size 가져오기
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
              <p>{keyword}</p>
            </div>
          </div>
          <div className="mr-1 mt-1">
            <input type="button" className="btn btn-primary btn-sm" value="추가" onClick={addMedicine} />
          </div>
        </div>

        <div className={style.m_list}>
          <CommonTable headersName={["", "코드", "명칭", "구분", "단위"]}>
            {medicineList.map((medicine, index) => (
              <CommonTableRow key={medicine.mId}>
                <CommonTableColumn>
                  <input
                    type="checkbox"
                    onChange={(event) => {
                      changeCheck(event, index);
                    }}
                    checked={checkArray[index]}
                    onClick={(event) => medicineClick(event, medicine)}
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
