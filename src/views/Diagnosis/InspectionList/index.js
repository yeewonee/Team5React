import React, { useEffect } from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { getInspectionList, getInspection, getInspectionSearchList } from "../data";
import style from "./inspectionlist.module.css";
import { createSetAddIlistAction } from "redux/diagnosis-reducer";
import CommonTable from "views/table/CommonTable";
import CommonTableRow from "views/table/CommonTableRow";
import CommonTableColumn from "views/table/CommonTableColumn";

import { BsCardChecklist } from "react-icons/bs";


export const InspectionList = (props) => {
  const originIList = getInspectionList();
  const [inspectionList, setInspectionList] = useState(originIList);

  //DB에서 약 목록 size 받아오기
  const arr = Array.from({ length: inspectionList.length }, () => false);
  const [checkArray, setCheckArray] = useState(arr);
  const changeCheck = (event, index, bundleCode) => {
    let inspectionArray = list.iList;
    for(let i=0; i<inspectionArray.length; i++){
      if(inspectionArray[i].bundleCode === bundleCode && event.target.checked){
        return;
      }
    }
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
    const keywordInspection = getInspectionSearchList(keyword);
    setCheckArray(arr);
    if(keyword===''){ //검색어가 없으면
      setInspectionList(originIList); //list에 전체 목록 넣어주고
    }else{ //검색어가 있으면
      setInspectionList(keywordInspection); //list에 검색어에 맞는 목록 넣음
    }
    setList({
      iList: props.iList,
    });
  };

  const [list, setList] = useState({
    iList: []
  });

  useEffect(() => {
    setList({
      iList: props.iList,
    });
  }, [props, keyword]);

  const inspectionClick = (event, bundleCode) => {
    let inspectionArray = list.iList;
    for(let i=0; i<inspectionArray.length; i++){
      if(inspectionArray[i].bundleCode === bundleCode && event.target.checked){
        alert('이미 추가된 항목입니다.');
        return;
      }
    }
  
    if (event.target.checked) {
      let addIList = getInspection(bundleCode);
      setList((prevList) => {
        return {
          ...prevList,
          iList: prevList.iList.concat(addIList)
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
            <input type="text" name="keyword" onChange={keywordChange} value={keyword}/>
            <div className="input-group-append">
              <button className="btn btn-outline-secondary btn-sm" type="button" onClick={keywordButton}>
                검색
              </button>
            </div>
          </div>
          <div className="mr-1 mt-1">
            <input type="button" className="btn btn-sm" style={{backgroundColor:'#4dabf7', color:'white'}} value="추가" onClick={addInspection} />
          </div>
        </div>

        {inspectionList.length !== 0 ? 
        <div className={style.i_list}>
          <CommonTable headersName={["", "그룹코드", "그룹명"]} tstyle={"table table-sm"}>
            {inspectionList.map((inspection, index) => (
              <tr key={inspection.bundleCode} className={checkArray[index] ? style.select_Color : style.basic_Color}>
                <CommonTableColumn>
                  <input
                    type="checkbox"
                    onChange={(event) => {
                      changeCheck(event, index, inspection.bundleCode);
                    }}
                    checked={checkArray[index]||''}
                    onClick={(event) => inspectionClick(event, inspection.bundleCode)}
                    style={{zoom:'1.2', paddingTop:'2px'}}
                  />
                </CommonTableColumn>
                <CommonTableColumn>{inspection.bundleCode}</CommonTableColumn>
                <CommonTableColumn>{inspection.bundleName}</CommonTableColumn>
              </tr>
            ))}
          </CommonTable>
        </div>
        :
        <div className={style.p_list}>
        <div style={{borderTop:'1px solid #e7f5ff', height:'100%'}}>
          <div style={{paddingLeft:'46%', paddingTop:'5%'}}>
            <BsCardChecklist size={'3em'}/>
          </div>
          <p style={{textAlign:'center', fontSize:'1em'}}>일치하는 검사가 없습니다.</p>
        </div>
      </div>
        }
      </div>
    </>
  );
};
