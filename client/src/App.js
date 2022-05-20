import { useLayoutEffect, useState } from 'react';
import { eraseCookie, getCookie } from './utils/helpers';
import { cookieKeyAuth, apiBaseUrl, cookieKeyUsername } from './utils/config';
import { useFetch } from './utils/custom-hooks/fetch.hook';
import Loader from './components/Loader';
import Routes from './components/Routes';
import { useDispatch } from 'react-redux';
import { login } from './redux/user.slice';

const checkTokenUrl = `${apiBaseUrl}/check-token`;

export default function App() {
  const dispatch = useDispatch();
  const [isTokenChecked, setIsTokenChecked] = useState(false);
  const { data, error, startFetch } = useFetch();
  
  useLayoutEffect(() => {
    startFetch(checkTokenUrl);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useLayoutEffect(() => {
    if (error) {
      console.log('auth error', error);
      eraseCookie(cookieKeyAuth);

      setIsTokenChecked(true);
    }
  }, [error]);
  
  useLayoutEffect(() => {
    if (data?.message === 'token valid') {
      // set username to state managed by redux
      const username = getCookie(cookieKeyUsername);
      dispatch(login({ username }));

      setIsTokenChecked(true);
    }
  }, [data, dispatch]);

  return isTokenChecked
    ? <Routes />
    : <Loader />;
}
