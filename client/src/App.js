import { useLayoutEffect, useState } from 'react';
import { AuthContext } from './utils/contexts';
import Routes from './components/Routes';
import Login from './pages/Login';
import { getCookie } from './utils/helpers';
import { cookieKeyAuth } from './utils/config';

export default function App() {
  const [authed, setAuthed] = useState(false);
  useLayoutEffect(() => {
    const cookie = getCookie(cookieKeyAuth);
    if (cookie) {
      setAuthed(true)
    };
  }, [])

  return (
    <AuthContext.Provider value={{ authed, setAuthed }}>
      {authed ? <Routes /> : <Login /> };
    </AuthContext.Provider>
  )
}
