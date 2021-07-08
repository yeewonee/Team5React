import { Redirect, Route, Switch } from "react-router-dom";
import Home from "./views/Home/index";
import Login from "./views/Login";
import Reception from "./views/Reception/index";
import Diagnosis from "views/Diagnosis";
import Inspection from "views/Inspection";
import Main from "views/Main/Main";
import { useSelector } from "react-redux";
import CreateReception from "views/createReception";
import RouteIf ,{ROLE} from "RouteIf";


function AppRoute() {

  const uid = useSelector((state) => {
    return state.authReducer.uid;
  });

  const role = useSelector((state) => {
    return state.authReducer.role;
  });
  
  let doctorRole = {
    nursePage: ROLE.NONE,
    doctorPage: ROLE.ACCESS,
    inspectorPage: ROLE.NONE
  }
  let nurseRole = {
    nursePage: ROLE.ACCESS,
    doctorPage: ROLE.NONE,
    inspectorPage: ROLE.NONE
  }

  let inspectorRole = {
    nursePage: ROLE.NONE,
    doctorPage: ROLE.NONE,
    inspectorPage: ROLE.ACCESS
  }

  let masterRole = {
    nursePage: ROLE.ACCESS,
    doctorPage: ROLE.ACCESS,
    inspectorPage: ROLE.ACCESS
  }

  let temp
  if(role==="doctor"){
    console.log("들어옴")
    temp={...doctorRole}
  }
  if(role==="nurse"){
    temp={...nurseRole}
  }
  if(role==="inspector"){
    temp={...inspectorRole}
  }
  if(role==="master"){
    temp={...masterRole}
  }
 
  return (
    <>
      {uid ? (
        <>
          <Switch>
            <Route path="/" exact component={Home} />
            {/* <Route path="/reception" component={Reception} /> */}
            <RouteIf path="/reception"  component={Reception} role={temp?.nursePage} />
            <RouteIf path="/diagnosis" component={Diagnosis} role={temp?.doctorPage}/>
            <RouteIf path="/inspection" component={Inspection}role={temp?.inspectorPage}/>
            <RouteIf path="/createReception" component={CreateReception} role={temp?.nursePage}/>
            <Redirect to="/" />
          </Switch>
        </>
      ) : (
        <>
          <Switch>
            <Route path="/" exact component={Main} />
            <Route path="/login" component={Login} />
            <Redirect to="/" />
          </Switch>
        </>
      )}
    </>
  );
}

export default AppRoute;