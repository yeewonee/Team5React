import { Redirect, Route, Switch } from "react-router-dom";
// import Home from "views/Home";
// import Login from "views/Login";
// import Reception from "views/Reception";
// import Inspection from "views/Inspection";
import Diagnosis from "views/Diagnosis";
// import Diagnosis from "views/Diagnosis";
import Inspection from "views/Inspection";

function AppRoute() {
  return ( 
    <Switch> 
      {/* <Route path="/" exact component={Home}/>
      <Route path="/login" component={Login}/>
      <Route path="/reception" component={Reception}/> */}
      <Route path="/diagnosis" component={Diagnosis}/>
      <Route path="/inspection" component={Inspection}/>
      <Redirect to="/"/>
    </Switch>
  );
}

export default AppRoute;