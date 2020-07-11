import React from 'react'
import { Route, Redirect } from 'react-router-dom'
import { useAuth } from '../context/auth'

const PrivateRoute = ({ component: Component, ...rest }) => {
  const { authTokens } = useAuth()
  let token = localStorage.getItem('token')

  return (
    <Route
      {...rest}
      render={props =>
        authTokens || token ? (
          <Component {...props} />
        ) : (
            <Redirect
                to={{ pathname: '/login', state: { referer: props.location } }}
            />        
        )
      }
    />
  );
}

export default PrivateRoute