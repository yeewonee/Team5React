import * as React from "react";
import { Route, useHistory } from "react-router-dom";


export const ROLE = {
  NONE: "NONE",
  ACCESS:"ACCESS"
};

const RouteIf = ({ role, component: Component, ...rest }) => {
    const history = useHistory();
  return (
    <Route
      {...rest}
      render={props => {
        if (role === ROLE.NONE) {
            alert("접근 권한이 없습니다")
            history.push("/")
            return
        }

        if (Component) {
          return <Component {...props} role={role} />;
        }

        return null;
      }}
    />
  );
};

export default RouteIf;