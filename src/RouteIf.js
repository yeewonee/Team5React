import * as React from "react";
import { Route, useHistory } from "react-router-dom";
import Swal from 'sweetalert2'


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
          Swal.fire({
            icon: 'error',
            text: '접근 권한이 없습니다.',
            confirmButtonColor: '#3085d6'
          })
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