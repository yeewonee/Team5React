import React, { useEffect } from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getInspectionList, getInspection } from "../data";
import style from "./inspectionlist.module.css";
import { createSetAddIlistAction } from "redux/diagnosis-reducer";
import CommonTable from "views/table/CommonTable";
import CommonTableRow from "views/table/CommonTableRow";
import CommonTableColumn from "views/table/CommonTableColumn";

export const InspectionList = (props) => {
  const inspectionList = getInspectionList();

  //DB에서 약 목록 size 받아오기
  const arr = Array.from({ length: inspectionList.length }, () => false);
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

  const keywordButton = (event) => {
    //검색 버튼을 눌렀을 때`   back-end로 전달
  };

  const [list, setList] = useState({
    iList: []
  });

  useEffect(() => {
    setList({
      iList: props.iList,
    });
  }, [props]);

  const inspectionClick = (event, bundleCode) => {
    if (event.target.checked) {
      let temp = getInspection(bundleCode);
      console.log("ilist", list.iList);
      console.log("temp", temp)
      setList((prevList) => {
        return {
          ...prevList,
          iList: prevList.iList.concat(temp)
        };
      });
    } else {
      setList((prevList) => {
        return {
          ...list,
          iList: list.iList.filter((item) => {
            return item.bundleCode !== bundleCode;
          }),
        };
      });
    }
  };

  const dispatch = useDispatch();
  const addInspection = (event) => {
    console.log("체크된 리스트", list.iList);
    dispatch(createSetAddIlistAction(list.iList));
    //DB에서 size 가져오기
    let checkarray = arr;
    setCheckArray(checkarray);
  };

  return (
    <>
      <div className={style.i_list_container}>
        <div className="d-flex justify-content-between">
          <div className="input-group m-1">
            <input type="text" name="keyword" onChange={keywordChange} value={keyword} />
            <div className="input-group-append">
              <button className="btn btn-outline-secondary btn-sm" type="button">
                검색
              </button>
              <p>{keyword}</p>
            </div>
          </div>
          <div className="mr-1 mt-1">
            <input type="button" className="btn btn-primary btn-sm" value="추가" onClick={addInspection} />
          </div>
        </div>

        <div className={style.i_list}>
          <CommonTable headersName={["", "그룹코드", "그룹명"]}>
            {inspectionList.map((inspection, index) => (
              <CommonTableRow key={inspection.bundleCode}>
                <CommonTableColumn>
                  <input
                    type="checkbox"
                    onChange={(event) => {
                      changeCheck(event, index);
                    }}
                    checked={checkArray[index]}
                    onClick={(event) => inspectionClick(event, inspection.bundleCode)}
                  />
                </CommonTableColumn>
                <CommonTableColumn>{inspection.bundleCode}</CommonTableColumn>
                <CommonTableColumn>{inspection.bundleName}</CommonTableColumn>
              </CommonTableRow>
            ))}
          </CommonTable>
        </div>
      </div>
    </>
  );
};
