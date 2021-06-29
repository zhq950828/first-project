import React from 'react';
import Index from "@src/index/routes";
import { Route, IndexRedirect } from "react-router";

const container = (props) => {
    return (
        <div className="container">
            {props.children}
        </div>
    )
}

export default (function (...routes) {
  return (
    <Route path='/' key="root" component={container}>
        <IndexRedirect to='/index' />
        {routes}
        {Index}
    </Route>
  );
})();
