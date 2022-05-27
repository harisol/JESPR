import { eraseCookie } from '../../utils/helpers';
import { cookieKeyAuth, cookieKeyUsername } from '../../utils/config';
import { NavLink } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../../redux/user.slice';

const Layout1 = (props) => {
  return (
    <>
      <Header />
      <div className="container-fluid">
        <div className="row">
          <Navigation />
          <main className="col-md-9 ms-sm-auto col-lg-10 px-md-4">
            {props.children}
          </main>
        </div>
      </div>
    </>
  );
};

const Header = () => {
  const dispatch = useDispatch();
  const userName = useSelector(state => state.user.username);

  const signOut = (e) => {
    e.preventDefault();
    if (!window.confirm('Are you sure?')) return;

    eraseCookie(cookieKeyAuth);
    eraseCookie(cookieKeyUsername);
    console.log('cookie auth destroyed');
    
    dispatch(logout());
  };

  return (
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
          <a
            className="nav-link px-3"
            href="/"
            onClick={signOut}
            style={{ display: 'inline' }}
          >
            Sign out
          </a>
        </div>
      </div>
    </header>
  );
};

const Navigation = () => (
  <nav
    id="sidebarMenu"
    className="col-md-3 col-lg-2 d-md-block bg-light sidebar collapse"
  >
    <div className="position-sticky pt-3">
      <ul className="nav flex-column">
        <li className="nav-item">
          {/* NavLink will add 'active' class when selected. use Link instead for normal link */}
          <NavLink to="/outlet" className={'nav-link'}>
            🍔 Outlets
          </NavLink>
        </li>
        <li className="nav-item">
          <NavLink to="/user" className={'nav-link'}>
            👦 Users
          </NavLink>
        </li>
        <li className="nav-item">
          <NavLink to="/role" className={'nav-link'}>
            💻 Roles
          </NavLink>
        </li>
        <li className="nav-item">
          <NavLink to="/sample-redux" className={'nav-link'}>
            <img src='./images/redux-logo.png' alt="sample-redux" style={{
              width: '19px',
              margin: '0 2px'
            }} /> Sample Redux
          </NavLink>
        </li>
      </ul>
    </div>
  </nav>
);

export default Layout1;
