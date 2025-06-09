import { useEffect } from 'react';
import { NavLink, Routes, Route, useNavigate, Outlet } from 'react-router-dom';
import ProfileForm from '../components/ProfileForm/ProfileForm';
import OrderDetails from '../components/OrderDetails/OrderDetails';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../services/actions/auth';
import styles from './ProfilePage.module.css';
import { getUser } from '../services/actions/auth';
import PropTypes from 'prop-types';

const ProfilePage = () => {
  const user = useSelector((state) => state.auth.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await dispatch(logout());
    navigate('/login', { replace: true });
  };
  

  useEffect(() => {
    dispatch(getUser());
  }, [dispatch]);

  /*if (!user) {
    return <p>Loading...</p>;
  }*/
  
  return (
    <div className={styles.container}>
      <div className={styles.sidebar}>
        <NavLink
          to=""
          end
          className={({ isActive }) => isActive ? styles.activeLink : styles.link}
        >
          Профиль
        </NavLink>
        <NavLink
          to="orders"
          className={({ isActive }) => isActive ? styles.activeLink : styles.link}
        >
          История заказов
        </NavLink>
        <button onClick={handleLogout} className={styles.link}>Выход</button>
        <p className={`${styles.caption} text text_type_main-small text_color_inactive`}>
          В этом разделе вы можете изменить свои персональные данные
        </p>
      </div>
      <div className={styles.content}>
        <Outlet />
        
      </div>
    </div>
  );
};

ProfilePage.propTypes = {};

export default ProfilePage;