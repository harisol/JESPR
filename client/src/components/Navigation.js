import { NavLink } from 'react-router-dom';

const Navigation = () => {
  return (
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
        </ul>
      </div>
    </nav>
  );
};

export default Navigation;
