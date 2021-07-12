import React from "react";
import style from "./inspectionresult.module.css";
import CommonTable from "views/table/CommonTable";
import CommonTableRow from "views/table/CommonTableRow";
import CommonTableColumn from "views/table/CommonTableColumn";
import { useDispatch, useSelector } from "react-redux";
import { createSetRemoveIlistAction } from "redux/diagnosis-reducer";

export const InspectionResult = React.memo((props) => {
    
  //추가된 검사 목록
  const inspectionList = useSelector((state) => {
    return state.diagnosisReducer.ilist;
  });
  
  console.log("검사 결과 렌더링")

  const dispatch = useDispatch();
  //묶음코드에 중복되는 검사가 존재하는 것이 가능하기 때문에 2개 매개변수로 remove
  const deleteInspection = (event, id, bundleCode) => {
    dispatch(createSetRemoveIlistAction(id, bundleCode));
  };


  return (
    <>
        <div className={style.inspection_container}>
        <CommonTable headersName={["검사코드", "검사이름", "그룹코드", ""]} tstyle={"table table-sm"}>
           {inspectionList.map((ilist, index) => (
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
});
