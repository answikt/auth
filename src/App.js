import React, { useState } from 'react'
import { BrowserRouter, Route } from 'react-router-dom'
import SignUp from './components/SignUp'
import SignIn from './components/SignIn'
import Users from './components/Users'
import { AuthContext } from './context/auth'
import PrivateRoute from './components/PrivateRoute'

const App = () => {
  const [authTokens, setAuthTokens] = useState();

  const setTokens = (data) => {
      localStorage.setItem('token', JSON.stringify(data))
      setAuthTokens(data);  
  }
  
  return (
    <AuthContext.Provider value={{ authTokens, setAuthTokens: setTokens }}>
      <BrowserRouter>
        <PrivateRoute path="/" component={Users} exact/>
        <Route path="/register" component={SignUp}/>
        <Route path="/login" component={SignIn}/>
      </BrowserRouter>
    </AuthContext.Provider>
  );
}

export default App
