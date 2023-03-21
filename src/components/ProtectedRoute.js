import { Navigate } from "react-router-dom";

const ProtectedRouteElement = ({ element: Component, ...props}) => {
  return (
    props.loggedIn ? <Component {...props} /> : <Navigate to="/signup" replace />
  )
}

export default ProtectedRouteElement