import React from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import style from "./medicineresult.module.css";
import { createSetMlistAction } from "redux/diagnosis-reducer";
import { useEffect } from "react";
import CommonTable from "views/table/CommonTable";
import CommonTableRow from "views/table/CommonTableRow";
import CommonTableColumn from "views/table/CommonTableColumn";

export const MedicineResult = () => {
  const mResult = useSelector((state) => {
    return state.diagnosisReducer.mlist;
  });

  // const [list, setList] = useState({
  //   mlist: mResult,
  // });

  // const dispatch = useDispatch();

  const deleteMedicine = (event, mid) => {
    // console.log("삭제 실행", mid);
    // setList((prevList) => {
    //   return {
    //     ...list,
    //     mlist: list.mlist.filter((item) => {
    //       return item.mId !== mid;
    //     }),
    //   };
    // });
  };

  // useEffect(() => {
  //   console.log("dispatch 실행");
  //   dispatch(createSetMlistAction(list.mlist));
  // }, [list]);

  return (
    <>
      <div className={style.medicine_container}>
        <div className={style.m_list}>
          <CommonTable headersName={["코드", "명칭", "구분", "단위", ""]}>
            {mResult.map((medicine, index) => (
              <CommonTableRow key={medicine.mId}>
                <CommonTableColumn>{medicine.mId}</CommonTableColumn>
                <CommonTableColumn>{medicine.mName}</CommonTableColumn>
                <CommonTableColumn>{medicine.mCategory}</CommonTableColumn>
                <CommonTableColumn>{medicine.mUnit}</CommonTableColumn>
                <CommonTableColumn>
                  <button
                    className="btn btn-danger btn-sm"
                    onClick={(event) => {
                      deleteMedicine(event, medicine.mId);
                    }}
                  >
                    삭제
                  </button>
                </CommonTableColumn>
              </CommonTableRow>
            ))}
          </CommonTable>
        </div>
      </div>
    </>
  );
};
