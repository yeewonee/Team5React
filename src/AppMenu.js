import { Link } from "react-router-dom";

export const AppMenu = () => {
  return (
    <div>
      <nav className="navbar navbar-expand-lg">
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav">
            <li className="nav-item" style={{margin:'30px'}}>
              <a className="nav-link menu" href="#">
                예약/접수
              </a>
            </li>
            <li className="nav-item" style={{margin:'30px'}}>
              <a className="nav-link menu " href="#">
                진료
              </a>
            </li>
            <li className="nav-item" style={{margin:'30px'}}>
              <a className="nav-link menu" href="#">
                검사/치료
              </a>
            </li>
          </ul>
        </div>
      </nav>
    </div>
  );
};