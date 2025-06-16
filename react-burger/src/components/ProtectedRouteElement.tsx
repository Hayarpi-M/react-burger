import { Navigate, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { ReactNode } from 'react';
import { RootState } from '../services/reducers';

interface ProtectedRouteElementProps {
  onlyUnAuth?: boolean;
  children: ReactNode;
}

const ProtectedRouteElement: React.FC<ProtectedRouteElementProps> = ({ onlyUnAuth = false, children }) => {
  const isAuth = useSelector((state: RootState) => state.auth.isAuthenticated);
  const location = useLocation();
  const isAuthChecked = useSelector((state: RootState) => state.auth.isAuthChecked);

  if (!isAuthChecked) {
    return null; // or loader if you want
  }
  if (onlyUnAuth && isAuth) {
    return <Navigate to="/" replace />;
  }

  if (!onlyUnAuth && !isAuth) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children as React.ReactElement;
};

export default ProtectedRouteElement;