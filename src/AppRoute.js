import { Redirect, Route, Switch } from "react-router-dom";
import Home from "./views/Home/index";
import Login from "./views/Login";
import Reception from "./views/Reception/index";
import Diagnosis from "views/Diagnosis";
import Inspection from "views/Inspection";

function AppRoute() {
  return ( 
    <Switch> 
      <Route path="/" exact component={Home}/>
      <Route path="/reception" component={Reception}/>
      <Route path="/login" component={Login}/>
      <Route path="/diagnosis" component={Diagnosis}/>
      <Route path="/inspection" component={Inspection}/> 
      <Redirect to="/"/>
    </Switch>
  );
}

export default AppRoute;