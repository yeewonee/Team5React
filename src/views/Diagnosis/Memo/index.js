import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { createSetMemoAction } from "redux/diagnosis-reducer";
import style from "./memo.module.css";


export const Memo = () => {

  const dispatch = useDispatch();
  const handleChange = (event) => {
    dispatch(createSetMemoAction(event.target.value));
  };

  return (
    <>
        <div className={`${style.memo} m-1`}>
          <div className={style.title}>
            <p className={`${style.title_p} font-weight-bold ml-1 mb-0 pt-1`}>환자 메모</p>
          </div>
          <div className={style.memo_write}>
            <textarea onChange={handleChange} className={style.textarea_style} placeholder="입력하세요"></textarea>
          </div>
        </div>
    </>
  );
};
