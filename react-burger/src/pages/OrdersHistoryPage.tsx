// src/pages/OrdersHistoryPage.tsx

import { useEffect } from 'react';
import styles from './OrdersHistoryPage.module.css';
//import { useDispatch, useSelector } from 'react-redux';
import { useAppDispatch, useAppSelector } from '../hooks/redux-hooks'; 
import { useNavigate, NavLink } from 'react-router-dom';
import { wsProfileConnect, wsProfileDisconnect } from '../services/actions/wsAction';
import OrderCard from '../components/OrderCard/OrderCard';
import { RootState } from '../types/store';
import { TOrder } from '../types/order';
import { getCookie } from '../utils/cookies';

const OrdersHistoryPage = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
//  const accessToken = getCookie('accessToken') || localStorage.getItem('accessToken');
  const accessToken = localStorage.getItem('accessToken') ?? getCookie('accessToken');
  //const accessToken = localStorage.getItem('refreshToken'); // token stored during login

  const {orders} = useAppSelector((state) => state.wsProfile.profile);

  useEffect(() => {
    if (!accessToken) {
      navigate('/login');
      return;
    }

    const timeout = setTimeout(() => {
      dispatch(wsProfileConnect(`wss://norma.nomoreparties.space/orders`));
    }, 200); // small delay to ensure token is ready

    return () => {
      clearTimeout(timeout);
      dispatch(wsProfileDisconnect());
    };
  }, [dispatch, accessToken, navigate]);


  return (
    <div className={styles.wrapper}>
      <div className={styles.sidebar}>
        <NavLink
          to="/profile"
          end
          className={({ isActive }) =>
            `${styles.link} text text_type_main-medium ${isActive ? styles.active : ''}`
          }
        >
          Профиль
        </NavLink>
        <NavLink
          to="/profile/orders"
          className={({ isActive }) =>
            `${styles.link} text text_type_main-medium ${isActive ? styles.active : ''}`
          }
        >
          История заказов
        </NavLink>
        <NavLink
          to="/logout"
          className={`${styles.link} text text_type_main-medium`}
        >
          Выход
        </NavLink>

        <p className="text text_type_main-default text_color_inactive mt-20">
          В этом разделе вы можете просмотреть свою историю заказов
        </p>
      </div>
      <div className={styles.orderList}>
        {orders?.map((order: TOrder) => (
          <div key={order._id} className={styles.orderWrapper}>
            <OrderCard key={order._id} order={order} profileMode={true} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default OrdersHistoryPage;