import { useContext, useEffect, useState } from "react";
import { useFetchPost } from "../utils/custom-hooks/fetch.hook";
import { cookieKeyAuth, cookieKeyUsername } from "../utils/config";
import { AuthContext } from "../utils/contexts";
import { getCookie, setCookie } from "../utils/helpers";
import AlertBox from "../components/AlertBox";
import { useHistory } from "react-router-dom";

const Login = () => {
  const { setAuthed } = useContext(AuthContext);
  const [username, setUsername] = useState('');
  const { data, isLoading, error, startFetch } = useFetchPost(`/login`, { username });
  const history = useHistory();

  const submitForm = (e) => {
    e.preventDefault();
    startFetch();
  }

  // if already login, redirect to root page
  useEffect(() => {
    const cookie = getCookie(cookieKeyAuth);
    if (cookie) {
      history.push('/');
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  
  // login success, redirect to root page
  useEffect(() => {
    if (data.accessToken) {
      setCookie(cookieKeyAuth, data.accessToken, 2);
      setCookie(cookieKeyUsername, username, 2);
      setAuthed(true);
      history.push('/');
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);

  return (
    <>
      {error && <AlertBox type="danger" msg={error} />}
      <main className="form-signin text-center mt-5">
        <form onSubmit={submitForm}>
          <h1 className="h3 mb-3 fw-normal">Goodie</h1>
          <div className="form-floating">
            <input
              type="text"
              className="form-control"
              id="floatingInput"
              autoComplete="off"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <label htmlFor="floatingInput">Username</label>
          </div>
          <button className="w-100 mt-3 btn btn-lg btn-primary" type="submit" disabled={isLoading}>
            {isLoading ? 'Please wait..' : 'Login' }
          </button>
        </form>
      </main>
    </>
  );
};

export default Login;
