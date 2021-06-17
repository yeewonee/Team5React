import { Link } from "react-router-dom";

export const AppMenu = () => {
  return (
    <div>
      <nav className="navbar navbar-expand-lg">
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav">
            <li className="nav-item" style={{margin:'30px'}}>
            <Link to="/diagnosis">예약/접수</Link>
            </li>
            <li className="nav-item" style={{margin:'30px'}}>
            <Link to="/diagnosis" style={{color:"white"}}>진료</Link>
                
            </li>
            <li className="nav-item" style={{margin:'30px'}}>
            <Link to="/diagnosis">검사/치료</Link>
            </li>
          </ul>
        </div>
      </nav>
    </div>
  );
};