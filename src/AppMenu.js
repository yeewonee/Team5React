import { NavLink } from "react-router-dom";

export const AppMenu = () => {
  const activeStyle = {
    color: 'white'
  };
  return (
    <div>
      <nav className="navbar navbar-expand-lg">
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav">
            <li className="nav-item" style={{margin:'30px'}}>
              <NavLink to="/reception" activeStyle={activeStyle} className="nav-link">예약/접수</NavLink>   
            </li>
            <li className="nav-item" style={{margin:'30px'}}>
              <NavLink to="/" className="nav-link">진료</NavLink>
            </li>
            <li className="nav-item" style={{margin:'30px'}}>
              <NavLink to="/" className="nav-link">검사/치료</NavLink>
            </li>
          </ul>
        </div>
      </nav>
    </div>
  );
};