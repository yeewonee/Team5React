import React from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getInspectionList } from "../data";
import style from "./inspectionlist.module.css";
import { createSetIlistAction } from "redux/diagnosis-reducer";


export const InspectionList = () => {
  const inspectionList = getInspectionList();

   //DB에서 약 목록 size 받아오기
   const arr = Array.from({length: inspectionList.length}, () => false);
   const [checkArray,setCheckArray] = useState(arr);
   const changeCheck = (event,index) =>{
     let checkarray = checkArray
     if(event.target.checked){
       checkarray[index] = true;
     }
     else{
       checkarray[index] = false;
     }
     setCheckArray(checkarray)
   }

  const [keyword, setKeyword] = useState("");

  const keywordChange = (event) => {
    setKeyword(event.target.value);
  };

  const keywordButton = (event) => {
    //검색 버튼을 눌렀을 때 back-end로 전달
  };

  //추가된 약 목록
  const resultIlist = useSelector((state) => {
    return state.diagnosisReducer.ilist;
  });

  const [list, setList] = useState({
    ilist: resultIlist,
  });

  const inspectionClick = (event, i) => {
    if (event.target.checked) {
      setList((prevList) => {
        return {
          ...prevList,
          ilist: prevList.ilist.concat(i),
        };
      });
    } else {
      setList((prevList) => {
        return {
          ...list,
          ilist: list.ilist.filter((item) => {
            return item.bundleCode !== i.bundleCode;
          }),
        };
      });
    }
  };

  const dispatch = useDispatch();
  const addInspection = (event) => {
    dispatch(createSetIlistAction(list.ilist));
    //DB에서 size 가져오기
    let checkarray = arr;
    setCheckArray(checkarray)
  };

  return (
    <>
      <div className={`${style.left_list_size} m-1`}>
        <div className={style.title}>
        <p className={`${style.title_p} font-weight-bold ml-1 mb-0 pt-1`}>검사 목록</p>
        </div>
        <div className={style.i_list_container}>
          <div className="d-flex justify-content-between">
            <div className="input-group m-1">
              <input type="text" name="keyword" onChange={keywordChange} value={keyword}/>
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
          <table className="table text-center table-sm">
            <thead>
              <tr>
                <th></th>
                <th>그룹코드</th>
                <th>그룹명</th>
              </tr>
            </thead>
            <tbody>
              {inspectionList.map((inspection, index) => (
                <tr key={inspection.bundleCode}>
                  <td><input type="checkbox" onChange={(event)=>{changeCheck(event,index)}} checked={checkArray[index]} onClick={(event) => inspectionClick(event, inspection)} /></td>
                  <td>{inspection.bundleCode}</td>
                  <td>{inspection.bundleName}</td>
                </tr>
              ))}
            </tbody>
          </table>
          </div>
        </div>
      </div>
    </>
  );
};
