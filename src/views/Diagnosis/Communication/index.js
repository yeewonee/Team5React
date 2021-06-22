import React from "react";
import { useDispatch } from "react-redux";

import style from "./communication.module.css";

export const Communication = () => {
  const dispatch = useDispatch();
  const handleChange = (event) => {
    // dispatch(createSetMemoAction(event.target.value));
  };

  return (
    <>
      <div className={style.communication_write}>
        <textarea onChange={handleChange} className={style.textarea_style} placeholder="입력하세요"></textarea>
      </div>
    </>
  );
};
