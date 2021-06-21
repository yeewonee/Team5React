import React, { useEffect } from "react";
import classNames from "classnames/bind";
import style from "./StateButton.module.css";
import { useDispatch, useSelector } from "react-redux";
import { UpdateStatusAction } from "redux/inspection_Reducer";
import { updateaInspect, updateInspect } from "../data";

const cx = classNames.bind(style);


export const StateButton = (props) => {
    
    const buttonName = props.value;
    const checkList = useSelector(state => state.inspectReducer.checked)
    const dispatch = useDispatch();
    const changeValue = props.change;
    const dcheck= props.checkfun
    
   
    const changeState =(props)=>{
      updateInspect(checkList,changeValue);
       dispatch(UpdateStatusAction())
       dcheck()
    }


  return (
    <div>
        <input type="button" className={cx(style.stateButton)} value={buttonName} onClick={changeState}/> 
    </div>
  );
};
