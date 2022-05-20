import { useSelector } from 'react-redux';
import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom';
import Login from '../pages/Login';
import NotFound from '../pages/NotFound';
import Outlet from '../pages/Outlet';
import Role from '../pages/Roles';
import SampleRedux from '../pages/SampleRedux';
import User from '../pages/User';

const defaultPath = '/outlet';
const paths = [
  {
    path: '/login',
    component: Login,
    exact: true
  },
  {
    path: '/outlet',
    component: Outlet,
    needAuth: true,
  },
  {
    path: '/user',
    component: User,
    needAuth: true,
  },
  {
    path: '/role',
    component: Role,
    needAuth: true,
  },
  {
    path: '/sample-redux',
    component: SampleRedux,
    needAuth: true,
    exact: true
  },
];

const ProtectedRoute = ({ component: Comp, path, exact, needAuth }) => {
  const { authed } = useSelector(state => state.user);
  const node = (props) => {
    if (needAuth && !authed) {
      return <Redirect to="/login" />;
    }
    
    return <Comp />;
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
