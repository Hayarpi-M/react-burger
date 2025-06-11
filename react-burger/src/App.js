import { useEffect } from 'react';
import { Routes, Route, Navigate, useLocation, useNavigate } from 'react-router-dom';
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
import { useSelector, useDispatch } from 'react-redux';
import ProfileForm from './components/ProfileForm/ProfileForm';
import OrderDetails from './components/OrderDetails/OrderDetails';

function App() {
  const canReset = useSelector((state) => state.auth.canResetPassword);
  const location = useLocation();
  const navigate = useNavigate();
  const background = location.state && location.state.background;
  const dispatch = useDispatch();
  const isAuthChecked = useSelector((state) => state.auth.isAuthChecked);
 

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

  const handleCloseModal = () => {
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
          <Route path="orders" element={<OrderDetails />} />
        </Route>
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
        </Routes>
      )}
    </div>
  );
}

export default App;