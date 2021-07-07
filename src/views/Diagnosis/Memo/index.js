import React from "react";
import { useDispatch } from "react-redux";
import { createSetMemoAction } from "redux/diagnosis-reducer";
import style from "./memo.module.css";

export const Memo = () => {
  const dispatch = useDispatch();
  const handleChange = (event) => {
    dispatch(createSetMemoAction(event.target.value));
  };

  return (
    <>
      <div className={style.memo_write}>
        <textarea onChange={handleChange} className={style.textarea_style} placeholder="입력하세요"></textarea>
      </div>
    </>
  );
};
