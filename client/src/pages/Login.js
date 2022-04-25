import { useContext, useEffect, useState } from "react";
import { useFetchPost } from "../utils/fetch-hook";
import { cookieKeyAuth } from "../utils/config";
import { AuthContext } from "../utils/contexts";
import { setCookie } from "../utils/helpers";
import AlertBox from "../components/AlertBox";

const Login = () => {
  const { setAuthed } = useContext(AuthContext);
  const [username, setUsername] = useState('');
  const { data, isLoading, error, startFetch } = useFetchPost(`/login`, { username });

  const submitForm = (e) => {
    e.preventDefault();
    startFetch();
  }
  
  useEffect(() => {
    if (data.accessToken) {
      setCookie(cookieKeyAuth, data.accessToken, 2);
      setCookie(AuthContext, username, 2);
      setAuthed(true);
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
