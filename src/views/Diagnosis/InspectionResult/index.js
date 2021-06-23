import React from "react";
import style from "./inspectionresult.module.css";
import CommonTable from "views/table/CommonTable";
import CommonTableRow from "views/table/CommonTableRow";
import CommonTableColumn from "views/table/CommonTableColumn";
import { useDispatch } from "react-redux";
import { createSetRemoveIlistAction } from "redux/diagnosis-reducer";

export const InspectionResult = (props) => {

  const dispatch = useDispatch();

  const deleteInspection = (event, id) => {
    dispatch(createSetRemoveIlistAction(id));
  };


  return (
    <>
        <div className={style.inspection_container}>
        <CommonTable headersName={["검사코드", "검사이름", "그룹코드", ""]}>
           {props.iList.map((ilist, index) => (
              <CommonTableRow key={ilist.iId}>
                <CommonTableColumn>{ilist.iId}</CommonTableColumn>
                <CommonTableColumn>{ilist.iName}</CommonTableColumn>
                <CommonTableColumn>{ilist.bundleCode}</CommonTableColumn>
                <CommonTableColumn>
                  <button
                    className="btn btn-danger btn-sm"
                    onClick={(event) => {
                      deleteInspection(event, ilist.iId);
                    }}
                  >
                    삭제
                  </button>
                </CommonTableColumn>
              </CommonTableRow>
            ))} 
          </CommonTable>

        </div>
    </>
  );
};
