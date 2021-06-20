import React from "react";
import classNames from "classnames/bind";
import style from "./DetailTable.module.css";
import CommonTable from "views/table/CommonTable";
import CommonTableRow from "views/table/CommonTableRow";
import CommonTableColumn from "views/table/CommonTableColumn";
import { useDispatch, useSelector } from "react-redux";
import { createSetCheckDownAction,createSetCheckUpAction } from "redux/inspection_Reducer";
import { StateButton } from "./StateButton";


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
 
  const changeHandler = (checked, id,board) => {
      console.log(checked)
    if (checked) {
      dispatch(createSetCheckDownAction(board));
    } else {
      // 체크 해제
      dispatch(createSetCheckUpAction(board));
    }
  };

  return (
    <div>
      <div className={cx(style.middle_right_bottom)}>
        <div className={cx(style.buttonBox)}>
          <StateButton value={'바코드 출력'} change={'접수'}></StateButton>
          <StateButton value={'접수 취소'} change={'대기'}></StateButton>
          <StateButton value={'채혈 완료'} change={'완료'}></StateButton>
           
        </div>
        <div className="right-table">
          <CommonTable headersName={["", "묶음코드", "처방코드", "검사명", "단위", "검사자", "상태"]}>
            {inspectList.map((board, index) =>  (
              <CommonTableRow key={board.ino}>
                <CommonTableColumn>
                  <input
                    id={board.ino}
                    type="checkbox"
                    onChange={(e) => {
                      changeHandler(e.currentTarget.checked, board.ino,board);
                    }}
                    
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
