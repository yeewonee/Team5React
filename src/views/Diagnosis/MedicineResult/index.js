import React from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import style from "./medicineresult.module.css";
import { createSetMlistAction } from "redux/diagnosis-reducer";
import { useEffect } from "react";

export const MedicineResult = () => {

  const mResult = useSelector((state) => {
    return state.diagnosisReducer.mlist;
  });
 
  console.log("aaaa", mResult);

  const [list, setList] = useState({
    mlist: mResult
  });

  console.log("mm" + JSON.stringify(list));

  const dispatch = useDispatch();

  const deleteMedicine = (event, mid) => {
    console.log("삭제 실행", mid);
      setList((prevList) => {
        return {
          ...list,
          mlist: list.mlist.filter((item) => {
            return item.mId !== mid;
          }),
        };
      });
    
  };

  useEffect(() => {
    console.log("dispatch 실행");
    dispatch(createSetMlistAction(list.mlist));
  }, [list]);

  return (
    <>
      <div className={`${style.left_list_size} m-1`}>
        <div className={style.title}>
          <p className={`${style.title_p} font-weight-bold ml-1 mb-0 pt-1`}>약 처방</p>
        </div>
        <div className={style.medicine_container}>
          <div className={style.m_list}>
            <table className="table text-center table-sm">
              <thead>
                <tr>
                  <th>코드</th>
                  <th>명칭</th>
                  <th>구분</th>
                  <th>단위</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {mResult.map((medicine, index) => (
                  <tr key={medicine.mId}>
                    <td>{medicine.mId}</td>
                    <td>{medicine.mName}</td>
                    <td>{medicine.mCategory}</td>
                    <td>{medicine.mUnit}</td>
                    <td>
                      <button
                        className="btn btn-danger btn-sm"
                        onClick={(event) => {
                          deleteMedicine(event, medicine.mId);
                        }}
                      >
                        삭제
                      </button>
                    </td>
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
