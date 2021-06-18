import React from "react";
import classNames from "classnames/bind";
import style from "./DetailTable.module.css";
import CommonTable from "views/table/CommonTable";
import CommonTableRow from "views/table/CommonTableRow";
import CommonTableColumn from "views/table/CommonTableColumn";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createSetCheckDownAction,createSetCheckUpAction } from "redux/inspection_Reducer";
import { useEffect } from "react";

const cx = classNames.bind(style);

function DetailTable(props) {
  const inspectList = props.data;
  const dispatch = useDispatch();
  // const [checkedInputs, setCheckedInputs] = useState([]);
 

    // const changeHandler = (checked, id) => {
    //   if (checked) {
    //    setCheckedInputs([...checkedInputs, id]);
    //   } else {
    //     // 체크 해제
    //     setCheckedInputs(checkedInputs.filter((el) => el !== id));
    //   }
    // };

  //   console.log(checkedInputs);

  const checkedInputs = useSelector((state) => state.inspectReducer.checked);
  console.log(checkedInputs)
 
  const changeHandler = (checked, id) => {
      console.log(id)
    if (checked) {
      dispatch(createSetCheckDownAction(id));
    } else {
      // 체크 해제
      dispatch(createSetCheckUpAction(id));
    }
  };

  return (
    <div>
      <div className={cx(style.middle_right_bottom)}>
        <div className={cx(style.buttonBox)}>
          <button>바코드 출력</button>
          <button>접수 취소</button>
          <button>엑셀 저장</button>
          <button>채혈 완료</button>
        </div>
        <div className="right-table">
          <CommonTable headersName={["", "묶음코드", "처방코드", "검사명", "단위", "검사자", "상태"]}>
            {inspectList.map((board, index) => (
              <CommonTableRow key={index}>
                <CommonTableColumn>
                  <input
                    id={board.ino}
                    type="checkbox"
                    onChange={(e) => {
                      changeHandler(e.currentTarget.checked, board.ino);
                    }}
                     checked={checkedInputs?.includes(board.ino) ? true : false}
                   
                  />
                </CommonTableColumn>
                <CommonTableColumn>{board.bno}</CommonTableColumn>
                <CommonTableColumn>{board.ino}</CommonTableColumn>
                <CommonTableColumn>{board.iname}</CommonTableColumn>
                <CommonTableColumn>{board.unit}</CommonTableColumn>
                <CommonTableColumn>{board.inspector}</CommonTableColumn>
                <CommonTableColumn>{board.istatus}</CommonTableColumn>
              </CommonTableRow>
            ))}
          </CommonTable>
        </div>
      </div>
    </div>
  );
}

export default DetailTable;
