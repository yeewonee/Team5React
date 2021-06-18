import { Redirect, Route, Switch } from "react-router-dom";
import Reception from "views/Reception";

function AppRoute() {
  return ( //컴포넌트 안에 또 서브 컴포넌트가 있는 경우엔 path가 정확한 것이 아니라, 뒤에 또 뭐가 붙기 때문에 exact가 안 붙음!
    <Switch>
      <Route path="/reception" component={Reception}/>
      <Redirect to="/"/>
    </Switch>
  );
}

export default AppRoute;