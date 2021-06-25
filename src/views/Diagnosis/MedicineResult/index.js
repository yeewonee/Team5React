import React from "react";
import { useDispatch } from "react-redux";
import style from "./medicineresult.module.css";
import { createSetRemoveMlistAction } from "redux/diagnosis-reducer";
import CommonTable from "views/table/CommonTable";
import CommonTableRow from "views/table/CommonTableRow";
import CommonTableColumn from "views/table/CommonTableColumn";

export const MedicineResult = (props) => {

  const dispatch = useDispatch();

  const deleteMedicine = (event, mid) => {
    dispatch(createSetRemoveMlistAction(mid));
  };

  return (
    <>
      <div className={style.medicine_container}>
        <div className={style.m_list}>
          <CommonTable headersName={["코드", "명칭", "구분", "단위", ""]} tstyle={"table table-sm"}>
            {props.mList.map((medicine, index) => (
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
