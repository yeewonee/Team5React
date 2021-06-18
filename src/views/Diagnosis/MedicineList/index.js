import React from "react";
import style from "./medecinelist.module.css";
import { getMedicineList } from "../data";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createSetMlistAction } from "redux/diagnosis-reducer";


export const MedicineList = () => {

  const medicineList = getMedicineList();

  //DB에서 약 목록 size 받아오기
  const arr = Array.from({length: medicineList.length}, () => false);
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

  const keywordButton = (event) => {};

  //추가된 약 목록
  const resultMlist = useSelector((state) => {
    return state.diagnosisReducer.mlist;
  });

  const [list, setList] = useState({
    mlist: resultMlist,
  });

  const medicineClick = (event, m) => {
    if (event.target.checked) {
      setList((prevList) => {
        return {
          ...prevList,
          mlist: prevList.mlist.concat(m),
        };
      });
    } else {
      setList((prevList) => {
        return {
          ...list,
          mlist: list.mlist.filter((item) => {
            return item.mId !== m.mId;
          }),
        };
      });
    }
  };

  const dispatch = useDispatch();
  const addMedicine = (event) => {
    dispatch(createSetMlistAction(list.mlist));
    //DB에서 size 가져오기
    let checkarray = arr;
    setCheckArray(checkarray)
  };

  return (
    <>
      <div className={`${style.left_list_size} m-1`}>
       
        <div className={style.title}>
          <p className="ml-2 mt-1 mb-1 font-weight-bold">약 목록 </p>
        </div>
        <div className={style.m_list_container}>
          <div className="d-flex justify-content-between">
            <div className="input-group m-1">
              <input type="text" name="keyword" onChange={keywordChange} value={keyword} />
              <div className="input-group-append">
                <button className="btn btn-outline-secondary btn-sm" type="button" onClick={keywordButton}>
                  검색
                </button>
                <p>{keyword}</p>
              </div>
            </div>
            <div className="mr-1 mt-1">
              <input type="button" className="btn btn-primary btn-sm" value="추가" onClick={addMedicine} />
            </div>
          </div>

          <div className={style.m_list}>
            <table className="table text-center table-sm">
              <thead>
                <tr>
                  <th></th>
                  <th>코드</th>
                  <th>명칭</th>
                  <th>구분</th>
                  <th>단위</th>
                </tr>
              </thead>
              <tbody>
                {medicineList.map((medicine,index) => (
                  <tr key={medicine.mId}>
                    <td>
                      <input type="checkbox" onChange={(event)=>{changeCheck(event,index)}} checked={checkArray[index]} onClick={(event) => medicineClick(event, medicine)} />
                    </td>
                    <td>{medicine.mId}</td>
                    <td>{medicine.mName}</td>
                    <td>{medicine.mCategory}</td>
                    <td>{medicine.mUnit}</td>
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
