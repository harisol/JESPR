import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from 'react-router-dom';

/* component */
import Navigation from '../components/Navigation';
import { AuthContext } from '../utils/contexts';
import { useContext } from 'react';
import { eraseCookie, getCookie } from '../utils/helpers';
import { cookieKeyAuth, cookieKeyUsername } from '../utils/config';
import User from '../pages/User';
import Outlet from '../pages/Outlet';
import Role from '../pages/Roles';
import NotFound from '../pages/NotFound';

const Routes = () => {
  const { setAuthed } = useContext(AuthContext);
  const userName = getCookie(cookieKeyUsername);

  const signOut = (e) => {
    e.preventDefault();
    if (!window.confirm('Are you sure?')) return;

    eraseCookie(cookieKeyAuth);
    console.log('cookie auth destroyed');
    setAuthed(false);
    window.location = '/';
  }

  return (
    <Router>
      <header className="navbar navbar-dark sticky-top bg-dark flex-md-nowrap p-0 shadow">
        <a className="navbar-brand col-md-3 col-lg-2 me-0 px-3" href="/">
          Goodie
        </a>
        <button
          className="navbar-toggler position-absolute d-md-none collapsed"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#sidebarMenu"
          aria-controls="sidebarMenu"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="navbar-nav">
          <div className="nav-item text-nowrap">
            <span className="px-3" style={{ color: '#fff' }}>
              Hello, {userName}
            </span>
            <a className="nav-link px-3" href="/" onClick={signOut} style={{ display: 'inline' }}>
              Sign out
            </a>
          </div>
        </div>
      </header>
      <div className="container-fluid">
        <div className="row">
          <Navigation />
          <main className="col-md-9 ms-sm-auto col-lg-10 px-md-4">
            <Switch>
              {/**
               * this is default route and must be appended with 'exact' attributes,
               * otherwise all other routes will be considered as default routes
               */}
              <Route exact path="/">
                <Redirect to="/outlet" />
              </Route>
              <Route path="/outlet">
                <Outlet />
              </Route>
              <Route path="/user">
                <User />
              </Route>
              <Route path="/role">
                <Role />
              </Route>
              <Route exact path="*">
                <NotFound />
              </Route>
              {/* <Route exact path={["/list-forum", "/forums"]} component={ForumList} /> */}
              {/* <Route path="/create-forum" render={(props) => <Forum {...props} myprops={'someValue'} />} /> */}
              {/* <Route path="/forum/:id" component={Forum} /> */}
            </Switch>
          </main>
        </div>
      </div>
    </Router>
  );
};

export default Routes;
