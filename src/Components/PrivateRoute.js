import React from 'react'
import { Navigate , Outlet} from 'react-router-dom'

function PrivateRoute({ children }) {
  const auth = localStorage.getItem("Login");
  return auth ? children : <Navigate to="/login" />;
}

export default PrivateRoute