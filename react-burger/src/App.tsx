import { useEffect } from 'react';
import { Routes, Route, Navigate, useLocation, Location, useNavigate } from 'react-router-dom';
import './App.css';
import { getUser, refreshToken } from './services/actions/auth';
import { getCookie } from './utils/cookies';
import AppHeader from './components/AppHeader/AppHeader';
import ProtectedRouteElement from './components/ProtectedRouteElement';
import ConstructorPage from './pages/ConstructorPage'; 
import LoginPage from './pages/LoginPage';            
import RegisterPage from './pages/RegisterPage'; 
import ForgotPasswordPage from './pages/ForgotPasswordPage';
import ResetPasswordPage from './pages/ResetPasswordPage';
import ProfilePage from './pages/ProfilePage';
import IngredientPage from './pages/IngredientPage'; 
import IngredientDetailsFromRoute from './components/IngredientDetailsFromRoute'
import Modal from './components/Modal/Modal';
//import { useSelector, useDispatch } from 'react-redux';
import { useAppDispatch, useAppSelector } from './hooks/redux-hooks';
import ProfileForm from './components/ProfileForm/ProfileForm';
import OrderDetails from './components/OrderDetails/OrderDetails';
import type { RootState, AppDispatch } from './types/store';
import FeedPage from './pages/FeedPage';
import OrderPageFromFeed from './pages/OrderPageFromFeed';
import OrdersHistoryPage from './pages/OrdersHistoryPage';
import OrderPageFromHistory from './pages/OrderPageFromHistory';


type LocationState = {
  background?: Location;
};
function App() {
  const canReset = useAppSelector((state) => state.auth.canResetPassword);
  const location = useLocation() as Location & { state: LocationState };
  const navigate = useNavigate();
  const background = location.state && location.state.background;
  const dispatch = useAppDispatch();
  const isAuthChecked = useAppSelector((state) => state.auth.isAuthChecked);
 

  useEffect(() => {
    const accessToken = getCookie('accessToken');
    console.log('🍪 accessToken:', accessToken);
    const refreshTokenValue = localStorage.getItem('refreshToken');

    if (accessToken) {
      dispatch(getUser()); 
    } else if (refreshTokenValue) {
      dispatch(refreshToken()); 
    } else {
      dispatch({ type: 'AUTH_FAILED' });
    };
  }, [dispatch]);

  
  if (!isAuthChecked) {
    return <div>Loading...</div>;
  }

  const handleCloseModal = ():void => {
    navigate(-1); 
  };
  return (
    <div className="App">
      <AppHeader />
      <Routes location={background || location}>
        <Route path="/" element={<ConstructorPage />} />
        <Route path="/ingredients/:id" element={<IngredientPage />} />
        <Route path="/login" element={
          <ProtectedRouteElement onlyUnAuth>
            <LoginPage />
          </ProtectedRouteElement>
        } />
        <Route path="/register" element={
          <ProtectedRouteElement onlyUnAuth>
            <RegisterPage />
          </ProtectedRouteElement>
        } />
        <Route path="/forgot-password" element={
          <ProtectedRouteElement onlyUnAuth>
            <ForgotPasswordPage />
          </ProtectedRouteElement>
        } />
        <Route path="/reset-password" element={
          <ProtectedRouteElement onlyUnAuth>
            {canReset ? <ResetPasswordPage /> : <Navigate to="/forgot-password" replace />}
          </ProtectedRouteElement>
        } />
        <Route path="/profile/" element={
          <ProtectedRouteElement>
            <ProfilePage />
          </ProtectedRouteElement>
        } >
          <Route index element={<ProfileForm />} />
        </Route>
        <Route path="/feed" element={<FeedPage />} />
        <Route path="/feed/:number" element={<OrderPageFromFeed />} />
        <Route path="/profile/orders" element={
          <ProtectedRouteElement>
            <OrdersHistoryPage />
          </ProtectedRouteElement>
        } />
        <Route path="/profile/orders/:number" element={
          <ProtectedRouteElement>
            <OrderPageFromHistory />
          </ProtectedRouteElement>
        } />
      </Routes>

      {background && (
        <Routes>
          <Route
            path="/ingredients/:id"
            element={
              <Modal title="Детали ингредиента" onClose={handleCloseModal}>
                <IngredientDetailsFromRoute />
              </Modal>
            }
          />
          <Route
            path="/feed/:number"
            element={
              <Modal title="Детали заказа" onClose={handleCloseModal}>
                <OrderPageFromFeed />
              </Modal>
            }
          />
          <Route
            path="/profile/orders/:number"
            element={
              <Modal title="Детали заказа" onClose={handleCloseModal}>
                <OrderPageFromHistory />
              </Modal>
            }
          />
        </Routes>
      )}
    </div>
  );
}

export default App;