import React from "react";
import { useDispatch, useSelector } from "react-redux";
import style from "./medicineresult.module.css";
import { createSetRemoveMlistAction } from "redux/diagnosis-reducer";
import CommonTable from "views/table/CommonTable";
import CommonTableRow from "views/table/CommonTableRow";
import CommonTableColumn from "views/table/CommonTableColumn";

export const MedicineResult = React.memo((props) => {
  const medicineList = useSelector((state) => {
    return state.diagnosisReducer.mlist;
  });

  console.log("약 결과 렌더링")
  const dispatch = useDispatch();
  const deleteMedicine = (event, mid) => {
    dispatch(createSetRemoveMlistAction(mid));
  };

  return (
    <>
      <div className={style.medicine_container}>
        <div className={style.m_list}>
          <CommonTable headersName={["코드", "명칭", "구분", "단위", ""]} tstyle={"table table-sm"}>
            {medicineList.map((medicine, index) => (
              <CommonTableRow key={medicine.mId}>
                <CommonTableColumn>{medicine.mId}</CommonTableColumn>
                <CommonTableColumn>{medicine.mName}</CommonTableColumn>
                <CommonTableColumn>{medicine.mCategory}</CommonTableColumn>
                <CommonTableColumn>{medicine.mUnit}</CommonTableColumn>
                <CommonTableColumn>
                  <button
                    style={{backgroundColor:'#f74d4d', color:'white'}}
                    className="btn btn-sm"
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
});
