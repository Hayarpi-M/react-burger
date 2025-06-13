import { Navigate, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';

const ProtectedRouteElement = ({ onlyUnAuth = false, children }) => {
  const isAuth = useSelector((state) => state.auth.isAuthenticated);
  const location = useLocation();
  const isAuthChecked = useSelector((state) => state.auth.isAuthChecked);

  if (!isAuthChecked) {
    return null; // or loader if you want
  }
  // Если пользователь авторизован и попадает на /login, /register, /forgot-password или /reset-password
  if (onlyUnAuth && isAuth) {
    return <Navigate to="/" replace />;
  }

  // Если пользователь не авторизован и пытается попасть на защищённый маршрут
  if (!onlyUnAuth && !isAuth) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
};

ProtectedRouteElement.propTypes = {
  onlyUnAuth: PropTypes.bool,
  children: PropTypes.node.isRequired,
};

export default ProtectedRouteElement;
