import React from "react";
import style from "./inspectionresult.module.css";
import CommonTable from "views/table/CommonTable";
import CommonTableRow from "views/table/CommonTableRow";
import CommonTableColumn from "views/table/CommonTableColumn";
import { useDispatch } from "react-redux";
import { createSetRemoveIlistAction } from "redux/diagnosis-reducer";

export const InspectionResult = (props) => {

  const dispatch = useDispatch();

  const deleteInspection = (event, id, bundleCode) => {
    dispatch(createSetRemoveIlistAction(id, bundleCode));
  };


  return (
    <>
        <div className={style.inspection_container}>
        <CommonTable headersName={["검사코드", "검사이름", "그룹코드", ""]} tstyle={"table table-sm"}>
           {props.iList.map((ilist, index) => (
              <CommonTableRow key={index}>
                <CommonTableColumn>{ilist.iId}</CommonTableColumn>
                <CommonTableColumn>{ilist.iName}</CommonTableColumn>
                <CommonTableColumn>{ilist.bundleCode}</CommonTableColumn>
                <CommonTableColumn>
                  <button
                    style={{backgroundColor:'#f74d4d', color:'white'}}
                    className="btn btn-sm"
                    onClick={(event) => {
                      deleteInspection(event, ilist.iId, ilist.bundleCode);
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
