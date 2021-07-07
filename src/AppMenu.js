import { NavLink, useHistory } from "react-router-dom";
import React from 'react';
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

export const AppMenu = () => {
  const activeStyle = {
    color: 'black'
  }

  const role = useSelector((state) => {
    return state.authReducer.role;
  });
  
  return (
    <div>
      <nav className="navbar navbar-expand-lg" style={{fontFamily: "DoHyeon-Regular"}}>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav" style={{height:"45px"}}>
            <li className="nav-item" style={{margin:'0'}}>
               <NavLink activeStyle={activeStyle} to='/Reception' className="nav-link menu">
                 예약/접수
               </NavLink>
            </li>
            <li className="nav-item" style={{marginLeft:'30px'}}>
              <NavLink activeStyle={activeStyle} to="/diagnosis" className="nav-link menu">
                  진료
              </NavLink>
            </li>
            <li className="nav-item" style={{marginLeft:'30px'}}>
              <NavLink activeStyle={activeStyle} to="/inspection" className="nav-link menu">
                검사/치료
              </NavLink>
            </li>
          </ul>
        </div>
      </nav>
    </div>
  );
};