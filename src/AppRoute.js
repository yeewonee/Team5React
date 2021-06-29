import { Redirect, Route, Switch } from "react-router-dom";
import Home from "./views/Home/index";
import Login from "./views/Login";
import Reception from "./views/Reception/index";
import Diagnosis from "views/Diagnosis";
import Inspection from "views/Inspection";
import createReception from "views/createReception";
import Main from "views/Main/Main";
import { useSelector } from "react-redux";

function AppRoute() {
  const test = useSelector((state) => {
    return state.authReducer.test;
  });

  return ( 
    <>
    {test === 1?
      <>
        <Switch> 
          <Route path="/" component={Home}/>
          <Route path="/reception" component={Reception}/>
          <Route path="/diagnosis" component={Diagnosis}/>
          <Route path="/inspection" component={Inspection}/> 
          <Route path="/createReception" component={createReception}/> 
          <Redirect to="/"/>
        </Switch>
      </>
    :
      <>
        <Switch> 
          <Route path="/" exact component={Main}/>
          <Route path="/login" component={Login}/>
          <Redirect to="/"/>
        </Switch>
      </>
      }
      </>
  );
}

export default AppRoute;