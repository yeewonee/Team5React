import React, { useEffect } from "react";
import classNames from "classnames/bind";
import style from "./StateButton.module.css";
import { useDispatch, useSelector } from "react-redux";
import { UpdateStatusAction } from "redux/inspection_Reducer";

const cx = classNames.bind(style);


export const StateButton = (props) => {
    
    const buttonName = props.value;
    const dispatch = useDispatch();
    const state = useSelector(state => state.inspectReducer.checked)
    const changeValue = props.change;

    const changeState =(props)=>{
      dispatch(UpdateStatusAction(changeValue));
    }

    useEffect(()=>{
      console.log('일로')
    },[changeState])

   


  return (
    <div>
        <input type="button" className={cx(style.stateButton)} value={buttonName} onClick={changeState}/> 
    </div>
  );
};
