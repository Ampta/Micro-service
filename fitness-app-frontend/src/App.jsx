import { Button } from '@mui/material'
import { useContext, useEffect, useState } from 'react'
import { AuthContext } from 'react-oauth2-code-pkce'
import { useDispatch } from 'react-redux'
import { BrowserRouter, Navigate, Routes, Route, useLocation} from 'react-router'
import { setCreadentials } from './store/authSlice'


const App = () => {

  const {token, tokenData, logIn, logOut, isAuthenticated} = useContext(AuthContext);
  const dispatch = useDispatch();
  const [authReady, setAuthReady] = useState(false);

  useEffect(() => {
    if(token){
      dispatch(setCreadentials({token, user: tokenData}));
      setAuthReady(true);
    }


  }, [token, tokenData, dispatch]);

  return (
    <BrowserRouter>
      {!token ? (<Button variant='contained' color='#dc004e'
              onClick={() => {
                logIn()
              }}>Login</Button>) : (
                <div>
                  <pre>{JSON.stringify(tokenData, null, 2)}</pre>
                  <pre>{JSON.stringify(token, null, 2)}</pre>
                </div>
              )}
      

    </BrowserRouter>
  )
}

export default App