import React from "react";
import style from "./inspectionresult.module.css";

import CommonTable from "views/table/CommonTable";
import CommonTableRow from "views/table/CommonTableRow";
import CommonTableColumn from "views/table/CommonTableColumn";

export const InspectionResult = () => {
  return (
    <>
        <div className={style.inspection_container}>

        <CommonTable headersName={["처방코드", "처방명", "단위", ""]}>
            {/* {inspectionList.map((iResult, index) => (
              <CommonTableRow key={iResult.}></CommonTableRow>
                <CommonTableColumn>{iResult.}</CommonTableColumn>
                <CommonTableColumn>{iResult.}</CommonTableColumn>
                <CommonTableColumn>{iResult.}</CommonTableColumn>
                <CommonTableColumn> 
                  <button className="btn btn-danger btn-sm">삭제</button>
                </CommonTableColumn>
              </CommonTableRow>
            ))} */}
          </CommonTable>

        </div>
    </>
  );
};
