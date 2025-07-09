import { Navigate, useLocation } from 'react-router-dom';
//import { useSelector } from 'react-redux';
import { useAppSelector } from '../hooks/redux-hooks';
import { ReactNode } from 'react';
import { RootState } from '../types/store';

interface ProtectedRouteElementProps {
  onlyUnAuth?: boolean;
  children: ReactNode;
}

const ProtectedRouteElement: React.FC<ProtectedRouteElementProps> = ({ onlyUnAuth = false, children }) => {
  const isAuth = useAppSelector((state) => state.auth.isAuthenticated);
  const location = useLocation();
  const isAuthChecked = useAppSelector((state) => state.auth.isAuthChecked);

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