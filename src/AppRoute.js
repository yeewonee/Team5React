import { Redirect, Route, Switch } from "react-router-dom";
import Home from "views/Home";
import Login from "views/Login";
import Reception from "views/Reception";
import Diagnosis from "views/Diagnosis";
import Inspection from "views/Inspection";

function AppRoute() {
  return ( //컴포넌트 안에 또 서브 컴포넌트가 있는 경우엔 path가 정확한 것이 아니라, 뒤에 또 뭐가 붙기 때문에 exact가 안 붙음!
    <Switch> 
      <Route path="/" exact component={Home}/>
      <Route path="/login" component={Login}/>
      <Route path="/reception" component={Reception}/>
      <Route path="/diagnosis" component={Diagnosis}/>
      <Route path="/inspection" component={Inspection}/>
      <Redirect to="/"/>
    </Switch>
  );
}

export default AppRoute;