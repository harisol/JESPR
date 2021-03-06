import { useContext } from 'react';
import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom';
import Login from '../pages/Login';
import NotFound from '../pages/NotFound';
import Outlet from '../pages/Outlet';
import Role from '../pages/Roles';
import User from '../pages/User';
import { AuthContext } from '../utils/contexts';

const defaultPath = '/outlet';
const paths = [
  {
    path: '/login',
    page: Login,
    exact: true
  },
  {
    path: '/outlet',
    page: Outlet,
    needAuth: true,
  },
  {
    path: '/user',
    page: User,
    needAuth: true,
  },
  {
    path: '/role',
    page: Role,
    needAuth: true,
  },
];

const ProtectedRoute = ({ page: Component, path, exact, needAuth }) => {
  const { authed } = useContext(AuthContext);
  const node = (props) => {
    if (needAuth && !authed) {
      return <Redirect to="/login" />;
    }
    
    return <Component />;
  }

  return (
    <Route
      path={path}
      exact={!!exact}
      render={node}
    />
  );
};

const Routes = () => {
  return (
    <BrowserRouter>
      <Switch>
        {/**
         * this is default route and must be appended with 'exact' attributes,
         * otherwise all other routes will be considered as default routes
         */}
        <Route exact path="/">
          <Redirect to={defaultPath} />
        </Route>
        {paths.map((p,i) => (
          <ProtectedRoute key={`my-route-${i}`} {...p} />
          // <Route key={`my-route-${i}`} {...p} />
        ))}
        <Route exact path="*">
          <NotFound />
        </Route>
        
        {/* another way to routing */}
        {/* <Route exact path={["/list-forum", "/forums"]} component={ForumList} /> */}
        {/* <Route path="/forum/:id" component={Forum} /> */}
      </Switch>
    </BrowserRouter>
  );
};

export default Routes;
